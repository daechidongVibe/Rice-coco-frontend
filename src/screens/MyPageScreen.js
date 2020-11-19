import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

const MyPageScreen = ({ navigation }) => {

  return (
    <Container>
      <Header>내 정보</Header>

      <Button
        onPress={() => navigation.navigate('EditUserInfo')}
      >
        <ButtonText>내 정보 수정하기</ButtonText>
      </Button>

      <Button
        onPress={() => navigation.navigate('PreferredPartner')}
      >
        <ButtonText>선호하는 친구</ButtonText>
      </Button>

      <Button
        onPress={() => navigation.navigate('Payment')}
      >
        <ButtonText>결제</ButtonText>
      </Button>
    </Container>
  );
};

const Container = styled.View`
  height: 100%;
  padding: 20px;
`;

const Header = styled.Text`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 20px auto;
`;

const Button = styled.TouchableOpacity`
  background-color: orange;
  width: 100%;
  margin: 10px auto;
  padding: 15px;
  border-radius: 10px;
`;

const ButtonText = styled.Text`
  color: white;
  text-align: center;
  font-size: 20px;
`;

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(
  null,
  null
)(MyPageScreen);
