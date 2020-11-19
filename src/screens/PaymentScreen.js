import React from 'react';
import styled from 'styled-components/native';

const PaymentScreen = () => {
  return (
    <Container>
      <Header>궁극의 페이먼트..</Header>
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
