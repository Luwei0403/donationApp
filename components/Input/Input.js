import React, {useState} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {scale} from 'react-native-size-matters';
import {getFontFamily} from '../../assets/fonts/fonts';
import PropTypes from 'prop-types';

const Input = props => {
  const [value, setValue] = useState('');
  return (
    <View>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder ? props.placeholder : null}
        style={styles.input}
        value={value}
        secureTextEntry={props.secureTextEntry}
        keyboardType={props.keyboardType}
        onChangeText={val => {
          setValue(val);
          props.onChangeText(val);
        }}
      />
    </View>
  );
};

Input.defaultProps = {
  onChangeText: () => {},
  keyboardType: 'default',
  secureTextEntry: false,
};

Input.propTypes = {
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChangeText: PropTypes.func,
  secureTextEntry: PropTypes.bool,
};

const styles = StyleSheet.create({
  label: {
    fontFamily: getFontFamily('Inter', '400'),
    color: '#36455A',
    fontSize: scale(12),
    lineHeight: scale(15),
  },
  input: {
    paddingVertical: scale(12),
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(167, 167, 167, 0.5)',
  },
});

export default Input;
