import React from 'react';
import styled from 'styled-components';

const NavigationBar = () => {
  return(
    <NavContainer behavior={Platform.OS == "ios" ? "padding" : "height"}>
      <NavItem>
        <Image source={require('../../assets/images/nav-item-home.png')} />
        <Text>메인</Text>
      </NavItem>
      <NavItem>
        <Image source={require('../../assets/images/nav-item-friends.png')} />
        <Text>친구목록</Text>
      </NavItem>
      <NavItem>
        <Image source={require('../../assets/images/nav-item-history.png')} />
        <Text>히스토리</Text>
      </NavItem>
      <NavItem>
        <Image source={require('../../assets/images/nav-item-myPage.png')} />
        <Text>내 정보</Text>
      </NavItem>
    </NavContainer>
  );
};

const NavContainer = styled.KeyboardAvoidingView`
  flex: 1;
  width: 100%;
  padding: 20px;
  background-color: #ff914d;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  position: absolute;
  bottom: 0px;
`;

const NavItem = styled.TouchableOpacity`
  flex: 1;
  color: white;
`;

const Text = styled.Text`
  text-align: center;
  margin-top: 5px;
`;

const Image = styled.Image`
  width: 40px;
  height: 40px;
  position: relative;
  left: 50%;
  transform: translate(-19px);
`;

export default NavigationBar;
