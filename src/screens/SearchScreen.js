import React, { useState } from 'react';
import {  Keyboard, ImageBackground } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';

import RenderItem from '../components/RenderItem';
import configuredAxios from '../config/axiosConfig';
import { SHOULD_ENTER_WORD, SHOULD_ENTER_FOOD, SHOULD_INPUT_RESTAURANT} from '../constants/messages';
import getEnvVars from '../../environment';
import RotatedIcon from '../components/RotatedIcon';
import LoadingSpinner from '../components/LoadingSpinner';

const { REACT_NATIVE_GOOGLE_PLACES_URL, REACT_NATIVE_GOOGLE_PLACES_API_KEY } = getEnvVars();

const Search = ({ navigation }) => {
  const [searchList, setSearchList] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(SHOULD_ENTER_FOOD);

  const restaurantUrl = `${REACT_NATIVE_GOOGLE_PLACES_URL}&keyword=${searchWord}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`;

  const handleSearchWordSubmit = async (e) => {
    if (isSearching) return;

    if (!searchWord) {
      setPlaceHolder(SHOULD_ENTER_WORD);
      return;
    }

    Keyboard.dismiss();
    setIsSearching(true);

    try {
      const { data: { results } } = await configuredAxios.get(restaurantUrl);
      const filteredDataList = results.map(
        result => {
          return {
            id: result.place_id,
            name: result.name,
            rating: result.rating,
            openingHours: result['opening_hours'],
          };
        }
      );

      setSearchList(filteredDataList);
    } catch (err) {
      console.log(err);
    }

    setIsSearching(false);
  };
  return (
    <>
      <Container>
        <Input
          placeholder={placeHolder}
          value={searchWord}
          onChangeText={setSearchWord}
          onSubmitEditing={handleSearchWordSubmit}
        />
        <ImageBackground
          style={{
            width: 160,
            height: 160,
            position: 'absolute',
            bottom: 100,
            opacity: 0.5
          }}
        ><Description>{!searchList&&!isSearching ? SHOULD_INPUT_RESTAURANT : ''}</Description>
        </ImageBackground>
        {
          isSearching ?
            <LoadingSpinner
            />
            :
            <RestaurantList
              data={searchList}
              renderItem={({ item }) => (
                <RenderItem
                  item={item}
                  navigation={navigation}
                  searchWord={searchWord}
                />
              )}
              keyExtractor={restaurant => restaurant.id}
            />
        }
      </Container>
    </>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 40px;
  background-color: #ffffff;
  text-align: center;
  align-content: center;
  align-items: center;
`;

const Description = styled.Text`
  width: 100%;
  font-size: 16px;
  margin: auto;
`;

const RestaurantList = styled.FlatList`
  width: 100%;
  padding: 20px;
  margin: 0 auto;
`;
export default Search;
