import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { connect } from 'react-redux';

import RemainingTime from '../components/RemainingTime';
import isLocationNear from '../utils/isLocationNear';
import configuredAxios from '../config/axiosConfig';
import { updateLocation, setSelectedMeeting, setUserInfo } from '../actions';

const MatchSuccessScreen = ({
  userNickname,
  userLocation,
  partnerNickname,
  restaurantName,
  restaurantLocation,
  meetingId,
  expiredTime,
  setUserLocation,
  setSelectedMeeting,
  updateUserPromise,
  navigation,
}) => {
  const [isArrived, setIsArrived] = useState(false);
  const [isArrivalConfirmed, setIsArrivalConfirmed] = useState(false);
  const [partnerLocation, setPartnerLocation] = useState({
    latitude: 37.5011548,
    longitude: 127.0808086,
  });

  useEffect(() => {
    isLocationNear(userLocation, restaurantLocation, 100)
      ? setIsArrived(true)
      : setIsArrived(false);
  }, [userLocation]);

  // useEffect(() => {
  //   let subscribeLocationMoved;

  //   (async () => {
  //     subscribeLocationMoved = await Location.startLocationUpdatesAsync(
  //       'trackLocation',
  //       {
  //         accuracy: Location.Accuracy.Highest,
  //         timeInterval: 1000,
  //         distanceInterval: 1,
  //         howsBackgroundLocationIndicator: true,
  //         foregroundService: {
  //           notificationTitle: '342342',
  //           notificationBody: 'asdasdashjksdasd',
  //           notificationColor: '#EEE',
  //         },
  //       }
  //     );
  //     TaskManager.defineTask(
  //       'trackLocation',
  //       ({ data: { locations }, error }) => {
  //         if (error) return;
  //         const {
  //           coords: { latitude, longitude },
  //         } = locations[0];
  //         setUserLocation({ latitude, longitude });
  //       }
  //     );
  //   })();
  //   return () => subscribeLocationMoved.remove();
  // }, []);

  useEffect(() => {
    (async () => {
      const { data } = await configuredAxios.get(`/meetings/${meetingId}`);

      console.log('새롭게 받아온 미팅 디테일 데이터! => ', data);

      if (data.result === 'ok') {
        const { meetingDetails } = data;

        setSelectedMeeting(meetingDetails);
      }

      if (data.result === 'failure') {
        console.log(data.errMessage);
      }
    })();
  }, []);

  const handleTimeEnd = () => {
    // navigation.navigate('endView');
  };

  const handleArrivalButtonClick = async () => {
    setIsArrivalConfirmed(true);
    updateUserPromise(1);
    // const response = await configuredAxios.put('users/:userId/promise', {
    //   amount: 1,
    // });

    // console.log(response);
  };

  const handleChatButtonClick = () => {
    // navigation.navigate('chatRoom');
  };

  return (
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
        showsMyLocationButton={true}
        showsUserLocation={true}
        onMapReady={() => console.log('Map Is Ready!')}
      >
        <Marker title={userNickname} coordinate={userLocation} />
        <Marker title={partnerNickname} coordinate={partnerLocation} />
        <Marker title={restaurantName} coordinate={restaurantLocation}>
          <View style={styles.view}>
            <Text>{restaurantName}</Text>
            <Image
              source={require('../../assets/images/rice.png')}
              style={{
                width: 24,
                height: 26,
              }}
              resizeMode="cover"
            />
          </View>
        </Marker>
        <Circle
          center={restaurantLocation}
          radius={100}
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
        <OverlaySubDesc>매칭 성공! 1시간 내로 도착하세요!</OverlaySubDesc>

        {isArrived ? (
          <ArrivalButton onPress={handleArrivalButtonClick}>
            <ArrivalText>
              {isArrivalConfirmed ? '도착 완료!' : '도착 확인!'}
            </ArrivalText>
          </ArrivalButton>
        ) : (
          // <RemainingTime expiredTime={expiredTime} onTimeEnd={handleTimeEnd} />
          null
        )}
      </OverlayHeader>
      <OverlayFooter>
        <ChatButton onPress={handleChatButtonClick}>
          <FontAwesome5 name="rocketchat" size={30} color="black" />
        </ChatButton>
      </OverlayFooter>
    </Wrapper>
  );
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
  view: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'yellow',
  },
});

const OverlayHeader = styled.View`
  display: flex;
  align-items: center;
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
  justify-content: flex-end;
  position: absolute;
  bottom: 50px;
  right: 20px;
  width: 100%;
`;

const ChatButton = styled.TouchableOpacity`
  padding: 15px;
  border-radius: 50px;
  background-color: white;
`;

const ArrivalButton = styled.TouchableOpacity`
  width: 50%;
  padding: 10px;
  border-radius: 50px;
`;

const ArrivalText = styled.Text`
  border-radius: 50px;
  padding: 10px;
  background-color: #ff914d;
  text-align: center;
  color: white;
`;

const mapStateToProps = state => {
  const {
    user: { nickname },
    location,
    meetings: {
      selectedMeeting: {
        partnerNickname,
        restaurantName,
        restaurantLocation,
        expiredTime,
        meetingId,
      },
    },
  } = state;

  return {
    userNickname: nickname,
    userLocation: location,
    partnerNickname,
    restaurantName,
    restaurantLocation,
    expiredTime,
    meetingId,
  };
};

const mapDispatchToProps = dispatch => ({
  setUserLocation(location) {
    dispatch(updateLocation(location));
  },
  setSelectedMeeting(meeting) {
    dispatch(setSelectedMeeting(meeting));
  },
  updateUserPromise(amount) {
    // dispatch(setUserInfo(amount));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MatchSuccessScreen);
