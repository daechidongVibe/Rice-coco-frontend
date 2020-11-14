import React, { useState } from 'react';
import { Text, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import styled from 'styled-components/native';

const Search = ({ navigation }) => {
  const [searchList, setSearchList] = useState([]);
  const [searchWord, setSearchWord] = useState('');

  return (
    <Container>
      <KeyboardAvoidingView>
        <SearchInput
          onChangeText={text => setSearchWord(text)}
          placeholder='검색어를 입력해주세요'
          value={searchWord}
        />
      <Button
        title='맛집검색'
      />
      </KeyboardAvoidingView>
    </Container>
  );
};

const Container = styled.View`
  background-color: #fff;
  text-align: center;
`;

const SearchInput = styled.TextInput`
  width: 100%;
  margin: 16px 16px;
  background-color: #ff914d;
`;

export default Search;
