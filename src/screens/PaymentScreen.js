import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import asyncStorage from '@react-native-async-storage/async-storage';
import getEnvVars from '../../environment';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import {
  Wrapper,
  P,
  Title,
  StyledButton,
  StyledView,
  PaymentItem,
} from '../shared/index';

const { REACT_NATIVE_ANDROID_SERVER_URL } = getEnvVars();

const PaymentScreen = () => {
  const [token, setToken] = useState(''); // 웹뷰에서 configuredAxios를 사용할 수 없기 때문에 따로 토큰을 실어주어야 한다
  const [paymentInfo, setPaymentInfo] = useState({}); // RN 뷰에서 사용자가 선택하고 결제요청 시 실어 보내줄 결제정보
  const [isPaymentSelected, setIsPaymentSelected] = useState(false); // 컴포넌트 분기처리 (RN 결제선택 => 웹뷰)

  useEffect(() => {
    (async () => {
      // 마운트 시 토큰 정보 가져와 리덕스에 세팅
      const token = await asyncStorage.getItem('token');

      setToken(token);

      // paymentInfo 초깃값 세팅
      setPaymentInfo(MY_INFO_OPTIONS.PAYMENT_INFO[0]);
    })();
  }, []);

  // 웹뷰에서 사용될 script
  const jsCode = `
    const handleClickPaymentButton = (e) => {
      e.target.disabled = true;
      e.target.style.backgroundColor = 'gray';

      // 먼저 Rice Coco 서버의 DB에 주문정보를 생성한다
      fetch('${REACT_NATIVE_ANDROID_SERVER_URL}/payment?authToken=${token}', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productInfo: {
            name: '${paymentInfo.name}',
            amount: ${paymentInfo.amount}
          },
          amount: ${paymentInfo.price}
        })
      })
      .then(res => res.json())
      .then(data => {
        const { _id: merchant_uid, buyer, amount, productInfo } = data;

        // merchant_uid는 미리 생성한 주문정보의 id이다.

        // 아임포트에 결제 요청
        IMP.init('imp42855025');

        IMP.request_pay({
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid,
          name: "${paymentInfo.name} ${paymentInfo.amount}개",
          amount: ${paymentInfo.price},
          buyer_email: "coin46@naver.com",
          buyer_name: "김찬중",
          buyer_tel: "010-5056-6756",
          m_redirect_url: "${REACT_NATIVE_ANDROID_SERVER_URL}/payment?authToken=${token}"
        });
      })
      .catch(err => alert(err));

    };

    const paymentButton = document.getElementById('paymentButton');

    paymentButton.addEventListener('click', handleClickPaymentButton);
  `;

  return (
    <>
      {!isPaymentSelected ? (
        <>
          <Wrapper>
            <Title>결제 선택</Title>
            {MY_INFO_OPTIONS.PAYMENT_INFO.map((item, index) => {
              return (
                <PaymentItem
                  onPress={() => setPaymentInfo(item)}
                  key={index}
                  disabled={item === paymentInfo ? true : false}
                >
                  <P>{`${item.name} ${item.amount}개  -  ₩${item.price}`}</P>
                </PaymentItem>
              );
            })}

            <StyledButton onPress={() => setIsPaymentSelected(true)}>
              <P>다음</P>
            </StyledButton>
          </Wrapper>
        </>
      ) : (
        // 결제 요청 컴포넌트
        <WebView
          originWhitelist={['*']}
          source={{ html: paymentView }} // 웹뷰에 html 주입
          style={{ marginHorizontal: 10, marginVertical: 10 }}
          injectedJavaScript={jsCode} // 웹뷰에 script 주입
          onMessage={event => {
            console.log(event.nativeEvent.data);
          }}
          autoFocus={true}
        />
      )}
    </>
  );
};

// 웹뷰에 주입될 html
const paymentView =
  '<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0" /><style> div { display: flex; justify-content: center; align-items: center; height: 100%; } button { padding: 20px; color: white; background-color: blue; border-radius: 10px; }</style><script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js"></script><script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script></head><div><button id="paymentButton">결제하기</button></div>';

export default PaymentScreen;
