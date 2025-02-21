import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {getFontFamily} from '../../assets/fonts/fonts';

const Button = props => {
  return (
    <Pressable
      disabled={props.isDisabled}
      style={[styles.button, props.isDisabled && styles.disabled]}
      onPress={() => props.onPress()}>
      <Text style={styles.title}>{props.title}</Text>
    </Pressable>
  );
};

//accidentally types default in the video, but should actually be defaultProps
Button.defaultProps = {
  isDisabled: false,
  onPress: () => {},
};

Button.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#2979F2',
    height: scale(55),
    justifyContent: 'center',
    borderRadius: scale(50),
  },
  disabled: {
    opacity: 0.5,
  },
  title: {
    fontFamily: getFontFamily('Inter', '500'),
    fontSize: scale(16),
    lineHeight: scale(19),
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
export default Button;
