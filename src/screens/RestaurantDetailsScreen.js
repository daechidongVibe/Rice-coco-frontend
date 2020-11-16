import React, { useEffect, useState }  from 'react';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

import configuredAxios from '../config/axiosConfig';
import getEnvVars from '../../environment';
import { TouchableOpacity } from 'react-native';

const {
    REACT_NATIVE_GOOGLE_PLACES_API_KEY
  } = getEnvVars();

const RestaurantDetails = ({ navigation, userNickname, meetingId, route: { params: { restaurantId, restaurantName, searchWord } } }) => {
  if (userNickname) {
    // 메인 맵에서 마커를 눌러 들어온 경우에는 유저 닉네임이 함께 전달되어 그대로 렌더링 시 사용하면 되지만,

    // 음식점을 검색하여 들어온 경우에는 유저 닉네임이 전달되지 않기 때문에 서버에 restaurantId로 요청을 보내어 원하는 유저 닉네임을 찾아온다
  }

  const [photoUrls, setPhotoUrls] = useState([]);
  const [restaurantInfo, setRestaurantInfo] = useState({});

  // 마운트 시 restaurantId로 구글에 place details 요청
  const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}&place_id=${restaurantId}&language=ko&fields=name,rating,adr_address,photo`;

  useEffect(() => {
    (async () => {
      const { data: { result } } = await configuredAxios(reqUrl);

      setRestaurantInfo(result);

      const { photos } = result;

      const photoUrls = [];

      for (let photo of photos.slice(0, 3)) {
        const { photo_reference } = photo;

        const photoData = await configuredAxios(`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photo_reference}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`);

        photoUrls.push(photoData.config.url);
      }

      setPhotoUrls(photoUrls);
    })();
  }, []);

  const renderItem = ({ item }) => <Image source={{ uri: item }} />;

  return(
    <Container>
      <Header>
      <HeaderText>{restaurantInfo.name}</HeaderText>
      </Header>
      {
        (photoUrls.length > 0) &&
        <FlatList
          data={photoUrls}
          renderItem={renderItem}
          keyExtractor={item => item}
          horizontal={true}
        />
      }

      {
        userNickname ?
        <>
          <DescriptionHeader>{`${searchWord} 로 유명한 "${restaurantName}"`}</DescriptionHeader>
          <Description>
            {`${restaurantName}에서 함께 식사하고 싶어하는  ${userNickname}님이 계십니다! 함께 드시겠어요?`}
          </Description>
        </>
        :
        <>
          <DescriptionHeader>{`${searchWord} 로 유명한 "${restaurantName}"`}</DescriptionHeader>
          <Description>
            {`${restaurantName}에서 함께 밥먹을 친구를 만나보시겠어요?`}
          </Description>
        </>
      }

      {
        userNickname ?
        <MeetingButton>
          <ButtonText>참여하기!</ButtonText>
        </MeetingButton>:
        <MeetingButton>
          <ButtonText>생성하기!</ButtonText>
        </MeetingButton>
      }
    </Container>
  );
};

const Container = styled.View`
  margin: 30px 20px;
`;

const Header = styled.View`
  background-color: #ff914d;
  padding: 15px;
  margin-bottom: 10px;
`;

const HeaderText = styled.Text`
  color: white;
  font-size: 35px;
  font-weight: bold;
  text-align: center;
`;

const Image = styled.Image`
  min-width: 200px;
  min-height: 200px;
  margin-right: 10px;
`;

const DescriptionHeader = styled.Text`
  margin-top: 20px;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

const Description = styled.Text`
  margin: 20px auto;
  text-align: center;
  font-size: 18px;
`;

const MeetingButton = styled.TouchableOpacity`
  background-color: #f5610d;
  margin: 0 20px;
  padding: 10px;
  border-radius: 18px;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

export default RestaurantDetails;
