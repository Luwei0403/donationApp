import React, {useState} from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {getFontFamily} from '../../assets/fonts/fonts';

const Tab = props => {
  const [width, setWidth] = useState(0);
  const paddingHorizontal = 33;
  const tabWidth = {
    width: scale(paddingHorizontal * 2 + width),
  };
  return (
    <Pressable
      style={[styles.tab, props.isInactive && styles.inactiveTab, tabWidth]}
      onPress={() => props.onPress(props.tabId)}>
      <Text
        onTextLayout={event => {
          setWidth(event.nativeEvent.lines[0].width);
        }}
        style={[styles.title, props.isInactive && styles.inactiveTitle]}>
        {props.title}
      </Text>
    </Pressable>
  );
};

//accidentally types default in the video, but should actually be defaultProps
Tab.defaultProps = {
  isInactive: false,
  onPress: () => {},
};

Tab.propTypes = {
  tabId: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isInactive: PropTypes.bool,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: '#2979F2',
    height: scale(50),
    justifyContent: 'center',
    borderRadius: scale(50),
    // 陰影效果（適用於 iOS）
    shadowColor: '#000', // 陰影顏色
    shadowOffset: {
      width: 0, // 水平偏移
      height: 4, // 垂直偏移
    },
    shadowOpacity: 0.1, // 陰影透明度
    shadowRadius: 6, // 陰影模糊半徑
    // 陰影效果（適用於 Android）
    elevation: 5, // Android 的陰影屬性
  },
  inactiveTab: {
    backgroundColor: '#F3F5F9',
    // Inactive Tab 的陰影效果
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2, // Android 的陰影屬性
  },
  title: {
    fontFamily: getFontFamily('Inter', '500'),
    fontSize: scale(14),
    lineHeight: scale(17),
    color: '#FFFFFF',
    textAlign: 'center',
  },
  inactiveTitle: {
    color: '#79869F',
  },
});

export default Tab;
