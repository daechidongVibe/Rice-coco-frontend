import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import { Picker } from '@react-native-picker/picker';
import {Container, InputContainer} from '../shared/index';

const PickerInput = ({ content, onChange, contentOptions }) => {
  return (
    <View>
      <Picker
        selectedValue={content}
        onValueChange={value => onChange(value)}
      >
        {contentOptions.map((option, index) => {
          return <Picker.Item key={index} label={option} value={option} />;
        })}
      </Picker>
    </View>
  );
};

export default PickerInput;
