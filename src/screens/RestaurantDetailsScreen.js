import React, { useEffect, useState }  from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { CommonActions, useNavigationState } from '@react-navigation/native';

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

      if (!photos) return;

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

  const handlePressCreateButton = async (e) => {
    e.target.disabled = true;

    setPromiseAmount(userPromise - 1);

    const { data } = await configuredAxios.post(
      '/meetings',
      {
        selectedMeeting,
        userId
      }
    );

    if (data.result === 'ok') {
      const { createdMeeting } = data;

      const { _id: meetingId, expiredTime } = createdMeeting;

      setSelectedMeeting({
        meetingId,
        expiredTime
      });

      configuredAxios.put(
        `/users/${userId}/promise`,
        {
          amount: -1
        }
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'MatchWaiting',
            },
          ],
        })
      );
    }
  };

  const handlePressJoinButton = async (e) => {
    e.target.disabled = true;

    setPromiseAmount(userPromise - 1);

    const { data } = await configuredAxios.put(
      `/meetings/${meetingId}/join`,
      { userId }
    );

    if (data.result === 'ok') {
      const { updatedMeeting } = data;

      const { _id: meetingId, expiredTime } = updatedMeeting;

      setSelectedMeeting({
        meetingId,
        expiredTime
      });

      await configuredAxios.put(
        `/users/${userId}/promise`,
        {
          amount: -1
        }
      );

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: 'MatchSuccess',
            },
          ],
        })
      );
    }
  };

  return(
    <Container>
      <Header>
        <HeaderText>{restaurantName}</HeaderText>
      </Header>

      <PromiseContainer>
        <PromiseIcon source={require('../../assets/images/promise.png')} />
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
          <ButtonPromiseContainer>
            <PromiseIcon
              source={require('../../assets/images/promise.png')}
            />
            <PromiseAmount>-1개</PromiseAmount>
          </ButtonPromiseContainer>
        </MeetingButton>:
        <MeetingButton onPress={handlePressCreateButton}>
          <ButtonText>생성하기!</ButtonText>
          <ButtonPromiseContainer>
            <PromiseIcon
              source={require('../../assets/images/promise.png')}
            />
            <PromiseAmount>-1개</PromiseAmount>
          </ButtonPromiseContainer>
        </MeetingButton>
      }
    </Container>
  );
};

const Container = styled.View`
  margin: auto 20px;
  height: 80%;
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

const PromiseIcon = styled.Image`
  width: 25px;
  height: 25px;
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
  position: relative;
`;

const ButtonText = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 20px;
  text-align: center;
`;

const PromiseContainer = styled.View`
  position: absolute;
  top: -2%;
  right: -2%;
  background-color: white;
  display: flex;
  align-items: center;
  padding: 5px;
  border-radius: 5px;
`;

const ButtonPromiseContainer = styled.View`
  position: absolute;
  top: 8px;
  right: 10px;
  display: flex;
  flex-direction: row;
`;

const PromiseAmount = styled.Text`
  font-weight: bold;
  font-size: 13px;
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
