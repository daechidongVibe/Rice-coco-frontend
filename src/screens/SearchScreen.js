import React, { useState } from 'react';
import { FlatList, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';

import RenderItem from '../components/RenderItem';
import configuredAxios from '../config/axiosConfig';
import { SHOULD_ENTER_WORD, SHOULD_ENTER_FOOD } from '../constants/messages';
import getEnvVars from '../../environment';
const { REACT_NATIVE_GOOGLE_PLACES_URL, REACT_NATIVE_GOOGLE_PLACES_API_KEY } = getEnvVars();

const Search = ({ navigation }) => {
  const [searchList, setSearchList] = useState([]);
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [placeHolder, setPlaceHolder] = useState(SHOULD_ENTER_FOOD);

  const restaurantUrl = `${REACT_NATIVE_GOOGLE_PLACES_URL}&keyword=${searchWord}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`;

  const handleSearchIconClick = async () => {
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
    <Container>
      <Input
        placeholder={placeHolder}
        value={searchWord}
        onChangeText={setSearchWord}
        rightIcon={
          <Icon
            name='utensil-spoon'
            size={30}
            color='#ff914d'
            onPress={handleSearchIconClick}
          />
        }
      />
      <FlatList
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
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding: 10px;
  padding-top: 40px;
  background-color: #ffffff;
  text-align: center;
`;

export default Search;
