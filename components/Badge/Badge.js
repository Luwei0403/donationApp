import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {getFontFamily} from '../../assets/fonts/fonts';

const Badge = props => {
  const [width, setWidth] = useState(0);

  const paddingHorizontal = 13;
  const badgeWidth = {
    width: scale(paddingHorizontal * 2 + width),
  };
  return (
    <View disabled={props.isInactive} style={[styles.badge, badgeWidth]}>
      <Text
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={[styles.title]}>
        {props.title}
      </Text>
    </View>
  );
};

Badge.propTypes = {
  title: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#0FA770',
    height: scale(25),
    justifyContent: 'center',
    borderRadius: scale(30),
  },
  title: {
    fontFamily: getFontFamily('Inter', '600'),
    fontSize: scale(11),
    lineHeight: scale(12),
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default Badge;
