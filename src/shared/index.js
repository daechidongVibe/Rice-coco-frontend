import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  width: 100%;
  height: 100%;
  padding: 0 8px;
  justify-content: center;
  align-items: center;
  background-color: ${prop => prop.color ? prop.color : '#ffffff'};
`;

export const MapWrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

export const StyledView = styled.View`
  padding: 24px;
  justify-content: center;
  align-items: center;
`;

export const ListContainer = styled.View`
  width:100%;
  flex: 0.9;
  align-items: center;
`;

export const ImageContainer = styled.View`
  width: 100%;
  height: 180px;
  margin-bottom: 8px;
  align-self: center;
`;

export const Title = styled.Text`
  flex: 0.2;
  margin: 0 auto;
  font-size: ${prop => prop.size || '16px'};
  font-weight: bold;
  text-align: center;
  color: #ff914d;
`;

export const Container = styled.View`
  width: 95%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const ItemContainer = styled.TouchableNativeFeedback`
  width: ${prop => prop.width ? prop.width : '80%'};
  height: ${prop => prop.height ? prop.height : '90px'};
  margin-bottom: 8px;
  align-self: center;
`;

export const Label = styled.Text`
  width: 30%;
  margin: 24px 0px;
  font-size: 16px;
  text-align: center;
`;

export const P = styled.Text`
  margin: ${prop => prop.margin || '0 auto;'};
  font-size: ${prop => prop.size || '16px'};
  color: ${prop => prop.color || 'black'};
  text-align: center;
`;

export const StyledText = styled.Text`
  font-size: 20px;
  color: white;
  text-align: center;
  font-weight: bold;
`;

export const ReloadButtonContainer = styled.View`
  position: absolute;
  top: 45px;
  right: 10px;
`;

export const MeesageBoxContainer = styled.View`
  display: flex;
  flex-direction: ${props => props.direction};
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 9px;
`;

export const MessageContainer = styled.View`
  width: 180px;
  height: 40px;
  padding: 8px;
  align-items: flex-end;
  background-color: ${props => props.color};
  justify-content: center;
  align-items: center;
  border-radius: 18px;
`;

export const UserProfile = styled.View`
  width: 24px;
  height: 24px;
  background-color: #d6d2c4;
  border-radius: 100px;
  margin: 0 3px;
  padding-left: 6px;
  padding-top: 2px;
`;

export const InputContainer = styled.TouchableOpacity`
  width: 100%;
  margin: 8px auto;
  text-align: center;
`;

export const PickerContainer = styled.TouchableOpacity`
  width: 7%
  margin: 0 -10px 0 0;
`;

export const StyledInput = styled.TextInput`
  width: 80%;
  text-align: center;
  padding-bottom: 10px;
  border-bottom-width: 1px;
  margin: 8px auto;
  color: ${prop => prop.color || '#ff914d'};
`;

export const NameCreationButton = styled.TouchableOpacity`
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #ff914d;
`;

export const StyledButton = styled.TouchableOpacity`
  width: 300px;
  height: 40px;
  padding-top: 10px;
  margin: 0 auto;
  margin-top: 36px;
  align-self: flex-end;
  border-radius: 18px;
  background-color: ${prop => prop.color || '#ff914d'};
`;

export const StyledImage = styled.Image`
  width: 250px;
  height: 100%;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 300px;
  height: 40px;
  padding: 8px;
  margin-top: 70%;
  border-radius: 18px;
  background-color: white;
`;

export const RestaurantSearchButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 50px;
  background-color: #ffffff;
`;

export const OverlayHeader = styled.View`
  display: flex;
  position: absolute;
  width: 100%;
  padding: 50px 30px 30px 30px;
  top: 0px;
`;

export const OverlayFooter = styled.View`
  display: flex;
  position: absolute;
  flex-direction: row;
  align-items: center;
  bottom: 50px;
  right: 20px;
`;

export const OverlayTitle = styled.Text`
  width: 100%;
  color: #ff914d;
  text-align: center;
  font-size: ${prop => prop.size ? prop.size : '13px'};
  font-family: ${prop => prop.font ? prop.font : 'Glacial'};
`;

export const StyledFlatList = styled.FlatList`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`;

export const SearchInput = styled.TextInput`
  width:90%;
  padding: 8px;
  margin: 40px 0;
  border-bottom-width: 1px;
  border-bottom-color: #ff914d;
`;
