import React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';

const BackButton = props => {
  return (
    <Pressable onPress={() => props.onPress()} style={styles.container}>
      <FontAwesomeIcon icon={faArrowLeft} />
    </Pressable>
  );
};

BackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FAFAFA',
    width: scale(44),
    height: scale(44),
    borderRadius: scale(26),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BackButton;
