import React, { useState, useEffect } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import auth from '@react-native-firebase/auth';
import NavigationUtil from '../../navigation/NavigationUtil';
import Reactotron from 'reactotron-react-native';
import {
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '../../utils/Constant';
import { DataUser } from '../../constants/Mockup'
import { Avatar } from 'react-native-elements'
import R from '../../assets/R'
import { colors } from '../../constants/Theme'
import { ASYNC_STORAGE } from '../../constants/Constant';
import ScreenComponent from '../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import ModalDrop from '../../components/ModalDrop'
const { height, width } = Dimensions.get('window');
const left = () => {
  return (
    <View>
      <Text style={styles.Title}>{R.string.user}</Text>
    </View>
  );
};
const personal = () => {
  return (
    <View style={styles.HeaderPerson}>
      <Avatar
        size={56}
        avatarStyle={styles.AvatarStyle}
        source={images.img_Avatar}>
        <Avatar.Accessory
          onPress={() => {
            alert('hello');
          }}
          size={15}
        />
      </Avatar>
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text style={styles.TextName}>
          {DataUser.name}
        </Text>
        <Text style={[styles.TextName, { fontSize: 14, color: colors.focus }]}>
          {DataUser.phone}
        </Text>

      </View>
    </View>
  );
};
const Logout = async () => {
  const res = await auth().signOut();
  try {
    const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
    if (token) {
      await AsyncStorage.setItem(ASYNC_STORAGE.TOKEN, '');

    }
    Reactotron.log('res', res);
    return;
  } catch (error) {
    Reactotron.log('error', error);
  }
};
const Line = () => {
  return <View style={styles.ContainerLine}></View>;
};
const ChildScreen = (source, lable, url,onPress) => {
  return (
    <TouchableOpacity
    onPress={onPress} 
    style={styles.ContainerScreen}>
      <FastImage
        source={source}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.ImgScreen}></FastImage>
      <Text
        style={[
          styles.TextName,
          { fontSize: 14, width: width - 120, marginHorizontal: 10 },
        ]}>
        {lable}
      </Text>
      <FastImage
        source={url}
        resizeMode={FastImage.resizeMode.contain}
        style={styles.ImgScreen}></FastImage>
    </TouchableOpacity>

  );
};

const UserScreen = () => {
  const [isModalVisible, setModalVisible]=useState(false);
  const toggleModal=()=>{
    setModalVisible(!isModalVisible);
  }
  return (
    <SafeAreaView style={{ backgroundColor: colors.primary, flex: 1 }}>
      <ScreenComponent
        leftComponent={left()}
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        children={
          <View>
            {personal()}
            <View style={{ backgroundColor: colors.white }}>
              {ChildScreen(
                images.ic_InforUser,
                R.string.information,
                images.ic_BackRight
              )}
              {Line()}
              {ChildScreen(
                images.ic_Orderproduct,
                R.string.order,
                images.ic_BackRight
              )}
              {Line()}
              {ChildScreen(
                images.ic_Language,
                R.string.language,
                images.ic_BackRight,
              )}
              {Line()}
              {ChildScreen(
                images.ic_ChangePass,
                R.string.changepass,
                images.ic_BackRight
              )}
              {Line()}
              {ChildScreen(
                images.ic_Logout,
                R.string.logout,
                images.ic_BackRight,
                ()=>{toggleModal()}
              )}
            </View>
            <ModalDrop
        toggleModal={toggleModal}
        isModalVisible={isModalVisible}
        onPress={() => {
          toggleModal();
          Logout();
          NavigationUtil.navigate(SCREEN_ROUTER.AUTH, { screen: SCREEN_ROUTER_AUTH.LOGIN })
        }
        }
        cancle={R.string.cancle}
        confirm={R.string.confirm}
        content={R.string.logoutmess}
      />
          </View>
        }
      />
      
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  ContainerHeader: { backgroundColor: colors.Sienna1 },
  Title: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    width: 100,
  },
  AvatarStyle: { borderRadius: 40 },
  HeaderPerson: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    height: height / 10,
    paddingVertical: 10,
    paddingHorizontal: 24,
    marginBottom: 5
  },
  TextName: { fontSize: 16, fontFamily: R.fonts.bold },
  ImgScreen: { height: 19, width: 30 },
  ContainerScreen: {
    backgroundColor: colors.white,
    flexDirection: 'row',
    height: 55,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  ContainerLine: { borderWidth: 0.65, marginHorizontal: 24, borderColor: colors.line }
});
export default UserScreen;
