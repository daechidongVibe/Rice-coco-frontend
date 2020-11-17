import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { View, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';

import configuredAxios from '../config/axiosConfig';
import getEnvVars from '../../environment';
import { setSelectedMeeting, setPromiseAmount } from '../actions/index';

const {
    REACT_NATIVE_GOOGLE_PLACES_API_KEY
  } = getEnvVars();

const RestaurantDetails = ({
    navigation,
    selectedMeeting,
    setSelectedMeeting,
    userId,
    userPromise,
    setPromiseAmount,
    route
  }) => {
  const {
    meetingId,
    restaurantId,
    restaurantName,
    partnerNickname
  } = selectedMeeting;

  const searchWord = route.params?.searchWord;

  const hasCreatedMeeting = partnerNickname;

  const [photoUrls, setPhotoUrls] = useState([]);
  console.log(restaurantId);
  // 마운트 시 restaurantId로 구글에 place details 요청
  const reqUrl = `https://maps.googleapis.com/maps/api/place/details/json?key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}&place_id=${restaurantId}&language=ko&fields=name,rating,adr_address,photo,geometry`;

  useEffect(() => {
    (async () => {
      const { data: { result } } = await configuredAxios(reqUrl);

      const {
        lat: latitude,
        lng: longitude
      } = result.geometry.location;

      setSelectedMeeting({
        restaurantLocation: {
          latitude,
          longitude
        }
      });

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

  const handlePressCreateButton = async () => {
    // 먼저 미팅 생성이 성공적으로 이루어 질 것으로 가정하고 리덕스 스토어의 유저 프로미스 값(UI)을 업데이트 (optimitstic update)
    setPromiseAmount(promise - 1);

    // 미팅을 생성하고,
    const createdMeeting = await configuredAxios.post(
      '/meetings',
      {
        selectedMeeting,
        userId
      }
    );

    // 성공적으로 생성되었다면 프로미스 감소 및 네비게이팅
    if (createdMeeting) {
      // 프로미스 감소
      configuredAxios.put(
        `/users/${userId}/promise`,
        {
          amount: -1
        }
      );

      navigation.navigate('MatchWaiting');
    }

    // 생성되지 않았다면 do nothing..
  };

  const handlePressJoinButton = async () => {
    const updateResult = await configuredAxios.put(
      `/meetings/${meetingId}/join`,
      { userId }
    );

    console.log(updateResult);

    // navigation.navigate('MatchSuccess');
  };

  return(
    <Container>
      <Header>
        <HeaderText>{restaurantName}</HeaderText>
      </Header>

      <PromiseContainer>
        <PromiseAmount>{userPromise}개</PromiseAmount>
      </PromiseContainer>

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
        hasCreatedMeeting ?
        <>
          <DescriptionHeader>{`"${restaurantName}" 에서 같이 밥먹을 사람!`}</DescriptionHeader>
          <Description>
            {`${restaurantName}에서 함께 식사하고 싶어하는  ${partnerNickname}님이 계십니다! 함께 드시겠어요?`}
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
        hasCreatedMeeting ?
        <MeetingButton onPress={handlePressJoinButton}
        >
          <ButtonText>참여하기!</ButtonText>
        </MeetingButton>:
        <MeetingButton onPress={handlePressCreateButton}>
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

const PromiseContainer = styled.View`
  position: absolute;
  top: 10px;
  right: 10px;
`;

const PromiseAmount = styled.Text`
  font-weight: bold;
  font-size: 20px;
`;

const mapStateToProps = (
  {
    meetings: { selectedMeeting },
    user: { _id, promise }
  }) => {
  return {
    selectedMeeting,
    userId: _id,
    userPromise: promise
  }
};

export default connect(
  mapStateToProps,
  {
    setSelectedMeeting,
    setPromiseAmount
  }
)(RestaurantDetails);
