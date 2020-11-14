import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import styled from 'styled-components';
import { Picker } from '@react-native-picker/picker';

const PickerInput = ({ content, onChange, contentOptions }) => {
  return (
    <StyledPicker>
      <Picker
        selectedValue={content}
        style={styles.picker}
        onValueChange={value => onChange(value)}
      >
        {contentOptions.map((option, index) => {
          return (
            <Picker.Item
              style={styles.pickerItem}
              key={index}
              label={option}
              value={option}
            />
          );
        })}
      </Picker>
    </StyledPicker>
  );
};

const StyledPicker = styled.View`
  width: 300px;
  height: 50px;
  background-color: white;
  margin-bottom: 10px;
  text-align: center;
`;

const styles = StyleSheet.create({
  picker: {
    width: 300,
    height: 50,
    textAlign: 'center',
  },
  pickerItem: {
    width: 300,
    height: 50,
    textAlign: 'center',
  },
});

export default PickerInput;
