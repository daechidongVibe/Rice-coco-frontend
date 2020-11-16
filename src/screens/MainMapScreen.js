import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { connect } from 'react-redux';
import * as Location from 'expo-location';
import styled from 'styled-components/native';
import { updateLocation } from '../actions';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Circle,
} from 'react-native-maps';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import mockMeeting from '../../mockMeetings';

const MainMapScreen = ({ location, setLocation, navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const [fontLoaded] = useFonts({
    Glacial: require('../../assets/fonts/GlacialIndifference-Bold.otf'),
  });
  const { latitude, longitude } = location;
  const [meetingLists, setMeetingLists] = useState([]);

  const handleRestaurantSearchButton = () => {
    navigation.navigate('Search');
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

      setLocation({ latitude, longitude });
    })();
  }, []);

  useEffect(() => {
    setMeetingLists(mockMeeting);
  }, []);

  return fontLoaded ? (
    <>
      <Wrapper>
        <MapView
          initialRegion={{
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          enableZoomControl={true}
          showsMyLocationButton={true}
          showsUserLocation={true}
        >
          <Marker coordinate={location} />

          {meetingLists.map(meeting => {
            const {
              restaurant: { location, name },
              userNickname,
            } = meeting;
            const { latitude, longitude } = location;

            return (
              <Marker
                key={meeting['_id']}
                coordinate={{ latitude, longitude }}
                title={'name'}
                description={`userNickname`}
              >
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
          <Marker
            coordinate={{ latitude: 37.5051548, longitude: 127.0891086 }}
            title={'부타이'}
            description={'어른다람쥐가 대기중'}
          >
            <Image
              source={require('../../assets/images/rice.png')}
              style={{
                width: 24,
                height: 26,
              }}
              resizeMode="cover"
            />
          </Marker>
          <Marker
            coordinate={{ latitude: 37.5091548, longitude: 127.0811086 }}
            title={'부타이'}
            description={'어른다람쥐가 대기중'}
          >
            <Image
              source={require('../../assets/images/rice.png')}
              style={{
                width: 24,
                height: 26,
              }}
              resizeMode="cover"
            />
          </Marker>
          {/* <MapView.Callout
            title={true}
            width={210}
            onPress={() => {
              props.navigation.navigate('PlaceDetail', {
                placeTitle: marker.title,
                placeId: marker.id,
              });
            }}
          ></MapView.Callout> */}

          <Circle
            center={location}
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

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  setLocation(location) {
    dispatch(updateLocation(location));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMapScreen);
