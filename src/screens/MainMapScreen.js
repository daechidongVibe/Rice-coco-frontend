import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Dimensions, Image } from 'react-native';
import { StackActions } from '@react-navigation/native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import * as Location from 'expo-location';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { MapWrapper } from '../shared/index';
import isLocationNear from '../utils/isLocationNear';
import ReloadImage from '../components/ReloadImage';
import axiosInstance from '../config/axiosConfig';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  setUserLocation,
  setWaitingMeetings,
  setSelectedMeeting,
} from '../actions';
import { RestaurantSearchButton, P, OverlayHeader, OverlayTitle, ReloadButtonContainer, OverlayFooter } from '../shared/index';
import SCREEN from '../constants/screen';
import ROUTE from '../constants/route';
import ALERT from '../constants/alert';

const MainMapScreen = ({
  userId,
  userLocation,
  waitingMeetings,
  setWaitingMeetings,
  setUserLocation,
  setSelectedMeeting,
  navigation,
}) => {
  const [fontLoaded] = useFonts({
    Glacial: require( '../../assets/fonts/GlacialIndifference-Bold.otf'),
  });
  const [errorMsg, setErrorMsg] = useState(null);
  const isMeetingExisted = !!waitingMeetings.length;

  const handleSearchButtonClick = () => {
    navigation.navigate(SCREEN.SEARCH);
  };

  const handleRestaurantClick = restaurantInfo => {
    const partnerNickname = restaurantInfo.partnerNickname;

    setSelectedMeeting(restaurantInfo);
    navigation.navigate(SCREEN.RESTAURANT_DETAILS, { partnerNickname });
  };

  const handleReloadClick = async () => {
    const { data } = await axiosInstance.get(ROUTE.MEETINGS);
    const { filteredMeetings } = data;

    setWaitingMeetings(filteredMeetings);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestPermissionsAsync();

      if (status !== ALERT.STATUS_GRANTED) {
        setErrorMsg(ALERT.ERROR_LOCATION_WAS_DENIED);
      }

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({});
      setUserLocation({ latitude, longitude });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const {
          data: { activeMeeting },
        } = await axiosInstance.get(`${ROUTE.MEETINGS}${ROUTE.USERS}/${userId}`);

        if (activeMeeting) {
          const { _id: meetingId } = activeMeeting;
          setSelectedMeeting({ meetingId });

          activeMeeting.isMatched
            ? navigation.dispatch(StackActions.replace(SCREEN.MATCH_SUCCESS))
            : navigation.dispatch(StackActions.replace(SCREEN.MATCH_WAITING));
          return;
        }

        const { data } = await axiosInstance.get(ROUTE.MEETINGS);
        const { filteredMeetings } = data;

        setWaitingMeetings(filteredMeetings);
      } catch (error) {
        console.warn(error);
      }
    })();
  }, []);

  return fontLoaded ? (
    <>
      <MapWrapper>
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
          {/* <Marker coordinate={userLocation} /> */}

          {isMeetingExisted &&
            waitingMeetings.map(meeting => {
              const {
                meetingId,
                restaurant: { restaurantId, name: restaurantName, location },
                partnerNickname,
                expiredTime,
              } = meeting;

              const isMarkerInRange = isLocationNear(
                location,
                userLocation,
                5000
              );

              return (
                <Marker
                  key={meetingId}
                  title={restaurantName}
                  description={`${partnerNickname} 대기중`}
                  coordinate={location}
                  onCalloutPress={() => {
                    if (!isMarkerInRange) return;

                    const restaurantInfo = {
                      meetingId,
                      restaurantId,
                      restaurantName,
                      partnerNickname,
                    };

                    handleRestaurantClick(restaurantInfo);
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
            })}
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
          <OverlayTitle font='Glacial' size='30px'>R I C E C O C O</OverlayTitle>
          <OverlayTitle>코코들이 당신을 기다리고 있어요!</OverlayTitle>
          <ReloadButtonContainer>
            <ReloadImage onClick={handleReloadClick} />
          </ReloadButtonContainer>
        </OverlayHeader>
        <OverlayFooter>
          <P color='#ff914d'>함께 가고 싶은 맛집을 찾아보아요 ➪ </P>
          <RestaurantSearchButton>
            <Icon
              name='rice'
              size={56}
              color='black'
              onPress={handleSearchButtonClick}
            />
          </RestaurantSearchButton>
        </OverlayFooter>
      </MapWrapper>
    </>
  ) : null;
};

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

export default connect(
  state => ({
    userId: state.user._id,
    userLocation: state.location,
    waitingMeetings: state.meetings.waitingMeetings,
  }),
  {
    setUserLocation,
    setWaitingMeetings,
    setSelectedMeeting,
  }
)(MainMapScreen);
