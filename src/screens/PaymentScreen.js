import React, { useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';
import asyncStorage from '@react-native-async-storage/async-storage';

import MY_INFO_OPTIONS from '../constants/myInfoOptions';

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
      setPaymentInfo(MY_INFO_OPTIONS.paymentInfo[0]);
    })()
  }, []);

  // 웹뷰에서 사용될 script
  const jsCode = `
    const handleClickPaymentButton = (e) => {
      e.target.disabled = true;
      e.target.style.backgroundColor = 'gray';

      // 먼저 Rice Coco 서버의 DB에 주문정보를 생성한다
      fetch('http://192.168.0.54:3000/payment?authToken=${token}', {
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
        IMP.init('imp61446519');

        IMP.request_pay({
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid,
          name: "${paymentInfo.name} ${paymentInfo.amount}개",
          amount: ${paymentInfo.price},
          buyer_email: "nninnnin7@gmail.com",
          buyer_name: "이동규",
          buyer_tel: "010-4280-5023",
          m_redirect_url: "http://192.168.0.54:3000/payment?authToken=${token}"
        });
      })
      .catch(err => alert(err));

    };

    const paymentButton = document.getElementById('paymentButton');

    paymentButton.addEventListener('click', handleClickPaymentButton);
  `;
  console.log(paymentInfo)
  return (
    <Container>
      {
        !isPaymentSelected ?
        ( // 결제 선택 컴포넌트
          <PaymentSelectView>
            <Header>결제 선택</Header>
            <SubHeader>약속의 상징 프로미스를 할인된 가격에 구매하세요!</SubHeader>
            {
              MY_INFO_OPTIONS.paymentInfo.map((item, index) => {
                return (
                  <PaymentItem onPress={() => setPaymentInfo(item)} key={index} disabled={item === paymentInfo ? true : false}>
                    <Text>{`${item.name} ${item.amount}개  -  ₩${item.price}`}</Text>
                  </PaymentItem>
                );
              })
            }
            <Wrapper>
              <SelectButton onPress={() => setIsPaymentSelected(true)}>
                <ButtonText>다음</ButtonText>
              </SelectButton>
            </Wrapper>
          </PaymentSelectView>
        ) :
        ( // 결제 요청 컴포넌트
          <WebView
            originWhitelist={['*']}
            source={{ html: paymentView }} // 웹뷰에 html 주입
            style={{ marginHorizontal: 10, marginVertical: 10 }}
            injectedJavaScript={jsCode} // 웹뷰에 script 주입
            onMessage={(event) => {
              console.log(event.nativeEvent.data);
            }}
            autoFocus={true}
          />
        )
      }
    </Container>
  );
};

// 웹뷰에 주입될 html
const paymentView = '<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><style> h1 { color: #ff914d; font-size: 32px; font-weight: bold; margin: 32px auto; text-align: center } br { content: ""; display: block; margin: 20px } button { padding: 10px; color: white; background-color: blue; border-radius: 10px; position: absolute; left: 50%; bottom: 10%; transform: translate(-50%) }</style><script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script><script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script></head><h1>결제</h1> <h2>결제플로우</h2> <p> <br> 1. 결제정보를 서버에 생성한다 <br> 2. 아임포트에 실제 결제 요청을 보낸다 <br> 3. 두개의 아이디를 서버에 보내어 서버사이드에서 토큰을 생성한다 <br> 4. 해당 토큰으로 결제를 조회한 후 실제 결제 정보와 DB에 저장된 "결제되어야 하는 금액" 을 비교하여 정확하다면 정보를 저장. </p><button id ="paymentButton">결제하기</button>';

const Container = styled.View`
  height: 100%;
`;

const Header = styled.Text`
  color: #ff914d;
  font-size: 40px;
  font-weight: bold;
  margin: 32px auto;
`;

const SubHeader = styled.Text`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
`;

const PaymentSelectView = styled.View`
  height: 100%;
`;

const PaymentItem = styled.TouchableOpacity`
  background-color: ${props => props.disabled ? 'gray' : '#ff914d'};
  padding: 20px;
  margin: 5px;
  border-radius: 5px;
`;

const Wrapper = styled.View`
  width: 100%;
  display: flex;
  margin-top: 80px;
`;

const SelectButton = styled.TouchableOpacity`
  align-self: center;
  padding: 10px 15px;
  background-color: #ff914d;
  border-radius: 5px;
`;

const Text = styled.Text`
  color: white;
  text-align: center;
  font-weight: bold;
  font-size: 18px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
`;

export default PaymentScreen;
