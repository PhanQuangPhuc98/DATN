import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/Theme';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
const {height, width} = Dimensions.get('window');
const Back = (onPress) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={images.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{R.string.information}</Text>
    </TouchableOpacity>
  );
};
const InforUserScreen = () => {
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}></ScreenComponent>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {flex: 1},
  Title: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    width: 100,
  },
  AvatarStyle: {borderRadius: 40},
  HeaderPerson: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: height / 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 5,
  },
  TextName: {fontSize: 16, fontFamily: R.fonts.bold},
  ImgScreen: {height: 19, width: 30},
  ContainerScreen: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  ContainerLine: {
    borderWidth: 0.65,
    marginHorizontal: 24,
    borderColor: colors.line,
  },
  HeaderBack: {flexDirection: 'row', width: width},
  ic_Back: {height: 16, width: 10, marginTop: 10, marginRight: 15},
  TextHeader: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    marginTop: 5,
  },
  ContainerHeader: {backgroundColor: colors.Sienna1},
});
export default InforUserScreen;
