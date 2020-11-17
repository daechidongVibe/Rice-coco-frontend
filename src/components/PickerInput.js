import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import styled from 'styled-components';
import { Picker } from '@react-native-picker/picker';

const PickerInput = ({ content, onChange, contentOptions }) => {
  return (
    <View style={styles.wrapper}>
      <Picker
        selectedValue={content}
        style={styles.picker}
        onValueChange={value => onChange(value)}
      >
        {contentOptions.map((option, index) => {
          return <Picker.Item key={index} label={option} value={option} />;
        })}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: 'white',
    marginBottom: 10,
  },
  picker: {
    textAlign: 'center',
  },
});

export default PickerInput;
