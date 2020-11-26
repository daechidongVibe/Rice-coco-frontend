import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { FlatList } from 'react-native';
import configuredAxios from '../config/axiosConfig';
import { setSelectedMeeting, setPromiseAmount } from '../actions/index';
import RenderImage from '../components/RenderImage';
import LoadingSpinner from '../components/LoadingSpinner';
import { Wrapper, Title, StyledView, P, ImageContainer, StyledButton } from '../shared/index';
import resetAction from '../utils/navigation';
import ROUTE from '../constants/route';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';
import API_URL from '../constants/apiUrl';

const RestaurantDetails = ({
  navigation,
  selectedMeeting,
  setSelectedMeeting,
  userId,
  userPromise,
  setPromiseAmount,
  route,
}) => {
  const partnerNickname = route.params.partnerNickname;
  const { meetingId, restaurantId, restaurantName } = selectedMeeting;
  const [photoUrls, setPhotoUrls] = useState('');
  const [review, setReview] = useState('');

  useEffect(() => {
    (async () => {
      const { data: { result } } = await configuredAxios(API_URL.restaurantDetails(restaurantId));
      const { lat: latitude, lng: longitude } = result.geometry.location;

      setSelectedMeeting({ restaurantLocation: { latitude, longitude } });

      const { photos, reviews } = result;

      for (let photo of photos.slice(0, 5)) {
        const { photo_reference } = photo;
        const photoData = await configuredAxios(API_URL.restaurantPhoto(photo_reference));

        setPhotoUrls(prev => [...prev, photoData.config.url]);
      }

      for (let review of reviews.slice(0, 2)) {
        setReview(review.text);
      }
    })();
  }, []);

  const handlePress = event => {
    event.target.disabled = true;

    if (partnerNickname) {
      handlePressJoinButton();
    } else {
      handlePressCreateButton();
    }
  };

  const handlePressCreateButton = async () => {
    try {
      const { data } = await configuredAxios.post(ROUTE.MEETINGS, {
          selectedMeeting,
          userId,
        });
      const { createdMeeting } = data;
      const { _id: meetingId, expiredTime } = createdMeeting;

      setSelectedMeeting({ meetingId, expiredTime });

      await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
        amount: -1,
      });

      setPromiseAmount(userPromise - 1);
    } catch (error) {
      alert(error.message);
    }

    navigation.dispatch(resetAction(0, SCREEN.MATCH_WAITING));
  };

  const handlePressJoinButton = async () => {
    try {
      const { data } = await configuredAxios.put(
        `${ROUTE.MEETINGS}/${meetingId}${ROUTE.JOIN}`,
        { userId }
      );
      const { updatedMeeting } = data;
      const { _id, expiredTime } = updatedMeeting;

      setSelectedMeeting({ meetingId: _id, expiredTime });

      await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
        amount: -1,
      });

      setPromiseAmount(userPromise - 1);
    } catch (error) {
      console.warn(error);
    }
    navigation.dispatch(resetAction(0, SCREEN.MATCH_SUCCESS));
  };

  return (
    <Wrapper>
      <Title size='24px'>{restaurantName}</Title>
      <ImageContainer>
        {
          !photoUrls ?
            <LoadingSpinner />
            :
            <FlatList
              data={photoUrls}
              renderItem={RenderImage}
              keyExtractor={item => item}
              horizontal={true}
            />
        }
      </ImageContainer>
      <StyledView>
        <P
          numberOfLines={2}
          ellipsizeMode='tail'
          color={COLOR.LIGHT_GRAY}>{review}
        </P>
      </StyledView>
      {
        partnerNickname ?
          <P>{`${restaurantName}에서 함께 식사하고 싶어하는  ${partnerNickname}님이 계십니다! 함께 드시겠어요?`}</P>
          :
          <P>{`${restaurantName}에서 라이스 코코와 즐거운 한끼 어떠세요?`}</P>
      }
      <StyledButton
        onPress={handlePress}>
        <P 
          color={COLOR.WHITE}>라이스코코 만나러가기</P>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(state => ({
    selectedMeeting: state.meetings.selectedMeeting,
    userId: state.user._id,
    userPromise: state.user.promise,
  }),{
    setSelectedMeeting,
    setPromiseAmount,
  })(RestaurantDetails);
