import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, Image, View, Text } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';

import axiosInstance from '../config/axiosConfig';

const MyPageScreen = () => {
  return (
    <View>
      <Text>내정보!!!!!!!!!!!!!!!!!!!!!!!</Text>
    </View>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MyPageScreen);
