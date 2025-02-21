import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {getFontFamily} from '../../assets/fonts/fonts';

const Header = props => {
  const styleToApply = () => {
    switch (props.type) {
      case 1:
        return styles.title1;
      case 2:
        return styles.title2;
      case 3:
        return styles.title3;
    }
  };

  return (
    <View>
      <Text
        style={[styleToApply(), props.color && {color: props.color}]}
        numberOfLines={props.numberOfLines ? props.numberOfLines : null}>
        {props.title}
      </Text>
    </View>
  );
};

//accidentally types default in the video, but should actually be defaultProps
Header.defaultProps = {
  title: '',
  type: 1,
  color: '#000000',
};

Header.propTypes = {
  title: PropTypes.string,
  type: PropTypes.number,
  color: PropTypes.string,
  numberOfLines: PropTypes.number,
};

const styles = StyleSheet.create({
  title1: {
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: scale(24),
    lineHeight: scale(29),
  },
  title2: {
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: scale(18),
    lineHeight: scale(22),
  },
  title3: {
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: scale(16),
    lineHeight: scale(19),
  },
});

export default Header;
