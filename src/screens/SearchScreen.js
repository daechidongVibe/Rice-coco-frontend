import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import BouncingPreloader from 'react-native-bouncing-preloader';
import getEnvVars from '../../environment';
import configuredAxios from '../config/axiosConfig';
import ALERT from '../constants/alert';
import RenderItem from '../components/RenderItem';
import { COLOR } from '../constants/assets';
import { Wrapper, SearchInput, Container, P, StyledFlatList, ListContainer, InputContainer } from '../shared/index';
const { REACT_NATIVE_GOOGLE_PLACES_URL, REACT_NATIVE_GOOGLE_PLACES_API_KEY } = getEnvVars();

const Search = ({ navigation }) => {
  const [searchList, setSearchList] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const restaurantUrl = `${REACT_NATIVE_GOOGLE_PLACES_URL}&keyword=${searchWord}&key=${REACT_NATIVE_GOOGLE_PLACES_API_KEY}`;

  const handleSearchWordSubmit = async () => {
    if (isSearching) return;

    setIsSearching(true);

    try {
      const { data: { results } } = await configuredAxios.get(restaurantUrl);
      const filteredSearchList = results.map(
        result => {
          return {
            id: result.place_id,
            name: result.name,
            rating: result.rating,
            openingHours: result['opening_hours'],
          };
        }
      );

      setSearchList(filteredSearchList);
    } catch (error) {
      console.warn(error);
    }
    setIsSearching(false);
  };

  return (
    <Wrapper>
      <InputContainer>
        <Container>
          <Icon
            name='search'
            size={24}
            color={COLOR.THEME_COLOR}
          />
          <SearchInput
            value={searchWord}
            onChangeText={setSearchWord}
            onSubmitEditing={handleSearchWordSubmit}
          />
        </Container>
      </InputContainer>
      <ListContainer>
        <P color={COLOR.THEME_COLOR}>
          {!searchList && !isSearching ? ALERT.SHOULD_INPUT_RESTAURANT : ''}
        </P>
        {
          isSearching ?
            <BouncingPreloader
              icons={[require('../../assets/images/ricecoco-icon.png')]}
              leftRotation='-680deg'
              rightRotation='360deg'
              leftDistance={-180}
              rightDistance={-250}
              speed={1000}
              useNativeDriver={true}
            />
            :
            <StyledFlatList
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
      </ListContainer>
    </Wrapper>
  );
};

export default Search;
