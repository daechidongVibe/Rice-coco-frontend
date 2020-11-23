import styled from 'styled-components';

export const Wrapper = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

export const Title = styled.Text`
  flex:0.3;
  color: #ff914d;
  font-size: 16px;
  font-weight: bold;
  margin: 0 auto;
  text-align: center;
`;

export const Label = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
`;

export const InputContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
`;

export const NameInput = styled.TextInput`
  text-align: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: white;
`;

export const NameCreationButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 10px;
  background-color: #ff914d;
`;

export const StyledSubmitButton = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  background-color: #ff914d;
  padding-top: 10px;
  padding-bottom: 10px;
`;

export const CircularForm = styled.TouchableOpacity`
  align-self: center;
  width: 300px;
  height: 300px;
  border-radius: 300px;
  background-color: #ff914d;
`;