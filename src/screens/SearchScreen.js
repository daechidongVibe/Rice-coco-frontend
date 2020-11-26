import React, { useState } from 'react';
import { connect } from 'react-redux';
import Icon from 'react-native-vector-icons/Feather';
import BouncingPreloader from 'react-native-bouncing-preloader';
import configuredAxios from '../config/axiosConfig';
import ALERT from '../constants/alert';
import RenderItem from '../components/RenderItem';
import { COLOR } from '../constants/color';
import API_URL from '../constants/apiUrl';
import ICON_NAME from '../constants/icon';
import {
  Wrapper,
  SearchInput,
  Container,
  P,
  StyledFlatList,
  ListContainer,
  InputContainer,
  AnimationContainer
} from '../shared/index';

const Search = ({ navigation, isWaiting }) => {
  const [searchList, setSearchList] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchWordSubmit = async () => {
    if (isSearching) return;

    setIsSearching(true);

    try {
      const { data: { results } } = await configuredAxios.get(API_URL.restaurantList(searchWord));
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
      alert(error.message);
    }
    setIsSearching(false);
  };

  return (
    <Wrapper>
      <InputContainer>
        <Container>
          <Icon
            name={ICON_NAME.SEARCH}
            size={24}
            color={COLOR.THEME_COLOR}
          />
          <SearchInput
            value={searchWord}
            onChangeText={setSearchWord}
            onSubmitEditing={handleSearchWordSubmit}
            editable={!isWaiting}
          />
        </Container>
      </InputContainer>
      <ListContainer>
        <P color={COLOR.THEME_COLOR}>
          {!searchList && !isSearching ? ALERT.SHOULD_INPUT_RESTAURANT : ''}
        </P>
        {
          isSearching || isWaiting ?
            <AnimationContainer>
              <BouncingPreloader
                icons={[require('../../assets/images/rice.png')]}
                leftRotation='-680deg'
                rightRotation='360deg'
                leftDistance={-180}
                rightDistance={-250}
                speed={1000}
              />
            </AnimationContainer>
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

export default connect(state => ({
  isWaiting: state.meetings.selectedMeeting.meetingId,
}))(Search);
