import React from 'react';
import styled from 'styled-components/native';
import { WebView } from 'react-native-webview';

const paymentView = '<head><meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0"><style> h1 { color: #ff914d; font-size: 32px; font-weight: bold; margin: 32px auto; text-align: center } br { content: ""; display: block; margin: 20px } button { padding: 10px; color: white; background-color: blue; border-radius: 10px; position: absolute; left: 50%; bottom: 10%; transform: translate(-50%) }</style><script type="text/javascript" src="https://code.jquery.com/jquery-1.12.4.min.js" ></script><script type="text/javascript" src="https://cdn.iamport.kr/js/iamport.payment-1.1.5.js"></script></head><h1>결제</h1> <h2>결제플로우</h2> <p> <br> 1. 결제정보를 서버에 생성한다 <br> 2. 아임포트에 실제 결제 요청을 보낸다 <br> 3. 두개의 아이디를 서버에 보내어 서버사이드에서 토큰을 생성한다 <br> 4. 해당 토큰으로 결제를 조회한 후 실제 결제 정보와 DB에 저장된 "결제되어야 하는 금액" 을 비교하여 정확하다면 정보를 저장. </p><button id ="paymentButton">결제하기</button>';

const jsCode = `
  const handleClickPaymentButton = () => {
    IMP.init('imp61446519');

    IMP.request_pay({
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: "ORD20180131-0000011",
      name: "프로미스 500개",
      amount: 50,
      buyer_email: "nninnnin7@gmail.com",
      buyer_name: "이동규",
      buyer_tel: "010-4280-5023",
      m_redirect_url: "exp://192.168.0.45:19000"
    });
  };

  const paymentButton = document.getElementById('paymentButton');

  paymentButton.addEventListener('click', handleClickPaymentButton);
`;

const PaymentScreen = () => {
  return (
    <Container>
      <WebView
        originWhitelist={['*']}
        source={{ html: paymentView }}
        style={{ marginHorizontal: 10, marginVertical: 10 }}
        injectedJavaScript={jsCode}
      />
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
`;

const Header = styled.Text`
  color: #ff914d;
  font-size: 32px;
  font-weight: bold;
  margin: 32px auto;
`;

export default PaymentScreen;
