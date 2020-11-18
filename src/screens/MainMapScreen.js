import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import * as Location from 'expo-location';
import { connect } from 'react-redux';
import { useFonts } from 'expo-font';

import RemainingTime from '../components/RemainingTime';
import isLocationNear from '../utils/isLocationNear';
import axiosInstance from '../config/axiosConfig';
import { updateLocation, setMeetings, setSelectedMeeting } from '../actions';

const MainMapScreen = ({
  meetings,
  userId,
  userLocation,
  navigation,
  setMeetings,
  setUserLocation,
  setSelectedMeeting,
}) => {
  const [ fontLoaded ] = useFonts({
    Glacial: require('../../assets/fonts/GlacialIndifference-Bold.otf'),
  });
  const [ errorMsg, setErrorMsg ] = useState(null);
  const isMeetingExisted = !!meetings.length;

  const handleRestaurantSearchButton = () => {
    navigation.navigate('Search');
  };

  const handleRestaurantClick = (
    meetingId,
    restaurantId,
    restaurantName,
    partnerNickname
  ) => {
    setSelectedMeeting({ meetingId, restaurantId, restaurantName, partnerNickname });
    navigation.navigate('RestaurantDetails');
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude, longitude });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      // 필터링 된 미팅들을 가져오려는 요청을 시도하기 전에,
      // '내가 만들거나 참여한 미팅' 이 있는지 먼저 확인하고,
      const { data: { userMeeting } } = await axiosInstance.get(`/meetings/user/${userId}`);

      console.log('내가 만들거나 참여한 미팅이 존재하나요?', userMeeting);

      // 만약 그런 미팅이 존재한다면 MatchWaiting / MatchSuccess 로 바로 라우팅.
      if (userMeeting) {
        const { _id: meetingId } = userMeeting;

        setSelectedMeeting({ meetingId });

        if (userMeeting.isMatched) {
          // isMatched 속성을 확인하여 매치된 미팅이라면 MatchSuccess로 가고,
          navigation.navigate('MatchSuccess');
        } else {
          // 아니라면 MatchWaiting으로 간다
          navigation.navigate('MatchWaiting')
        }

        return;
      }

      console.log('내가 만들거나 참여한 미팅이 없다면 내가 좋아하는 사람들의 미팅 정보를 가져와서 지도에 그려줍니다....')

      const { data } = await axiosInstance.get('/meetings');
      const { filteredMeetings } = data;
      setMeetings(filteredMeetings);
    })();
  }, []);

  return fontLoaded ? (
    <>
      <Wrapper>
        <MapView
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          enableZoomControl={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
          <Marker coordinate={userLocation} />

          {
            isMeetingExisted &&
            meetings.map(meeting => {
              const {
                _id: meetingId,
                restaurant: { restaurantId, name, location },
                participant: partnerNickname,
                expiredTime,
              } = meeting;

              const isMarkerInRange = isLocationNear(
                location,
                userLocation,
                5000
              );

              return (
                <Marker
                  key={meeting['_id']}
                  title={name}
                  description={`${partnerNickname} 대기중`}
                  coordinate={location}
                  onCalloutPress={() => {
                    if (!isMarkerInRange) return;
                    handleRestaurantClick(
                      meetingId,
                      restaurantId,
                      name,
                      partnerNickname
                    );
                  }}
                >
                  {/* {isMarkerInRange && (
                    <RemainingTime expiredTime={expiredTime} />
                  )} */}

                  <Image
                    source={require('../../assets/images/rice.png')}
                    style={{
                      width: 24,
                      height: 26,
                    }}
                    resizeMode="cover"
                  />
                </Marker>
              );
            })
          }
          <Circle
            center={userLocation}
            radius={5000}
            strokeColor="rgba(0, 0, 255, 0.1)"
            fillColor="rgba(0, 0, 255, 0.1)"
          />
        </MapView>
        <LinearGradient
          colors={['rgba(255, 255, 255, 1)', 'transparent']}
          style={styles.linearGradient}
        />
        <OverlayHeader>
          <OverlayTitle>R I C E C O C O</OverlayTitle>
          <OverlaySubDesc>코코들이 당신을 기다리고 있어요!</OverlaySubDesc>
        </OverlayHeader>
        <OverlayFooter>
          <GuidanceText>함께 가고 싶은 맛집을 찾아보아요 ➪ </GuidanceText>
          <RestaurantSearchButton onPress={handleRestaurantSearchButton}>
            <MaterialCommunityIcons name="rice" size={40} color="black" />
          </RestaurantSearchButton>
        </OverlayFooter>
      </Wrapper>
    </>
  ) : null;
};
const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
`;

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 200,
  },
});

const OverlayHeader = styled.View`
  display: flex;
  width: 100%;
  padding: 50px 30px 30px 30px;
  position: absolute;
  top: 0px;
`;

const OverlayTitle = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 30px;
  color: #ff914d;
  font-family: Glacial;
`;

const OverlaySubDesc = styled.Text`
  width: 100%;
  text-align: center;
  font-size: 13px;
  color: #ff914d;
`;

const OverlayFooter = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 50px;
  right: 20px;
`;

const GuidanceText = styled.Text`
  border-radius: 10px;
  padding: 5px 10px 5px 10px;
`;

const RestaurantSearchButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 50px;
  background-color: white;
`;

const mapStateToProps = ({ location, meetings: { filteredMeetings }, user: { _id } }) => {
  return {
    userId: _id,
    userLocation: location,
    meetings: filteredMeetings,
  };
};

const mapDispatchToProps = dispatch => ({
  setUserLocation(location) {
    dispatch(updateLocation(location));
  },
  setMeetings(meetings) {
    dispatch(setMeetings(meetings));
  },
  setSelectedMeeting(meeting) {
    dispatch(setSelectedMeeting(meeting));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMapScreen);
