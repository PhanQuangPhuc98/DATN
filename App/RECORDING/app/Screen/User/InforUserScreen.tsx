import React, { useState } from 'react';
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
import Fire from '../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../constants/Constant';
import Reactotron from 'reactotron-react-native';
import { colors } from '../../constants/Theme';
import { firebase, database } from '../../firebase/firebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { useEffect } from 'react';
import { SCREEN_ROUTER_APP,SCREEN_ROUTER } from '../../utils/Constant';
const { height, width } = Dimensions.get('window');
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
const renderInfor = (lable, infor) => {
  return (
    <SafeAreaView style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10 }}>
      <View style={{flex:1}}>
        <Text style={[styles.TextInfor,{color:R.color.colors.focus}]}>
          {lable}
        </Text>
      </View>
      <View style={{flexDirection:"row-reverse"}}>
        <Text style={[styles.TextInfor,{color:R.color.colors.black}]}>
          {infor}
        </Text>
      </View>
    </SafeAreaView>
  )
}
const ChangeUser =(onPress)=>{
  return(
    <TouchableOpacity
    onPress={onPress}
    >
      <FastImage
      style={styles.ImageChage}
      source={R.images.ic_ChangeUser}
      resizeMode={FastImage.resizeMode.contain}
      >
      </FastImage>
    </TouchableOpacity>
  )
}
const InforUserScreen = ({route, navigation }) => {
  const {user} =route.params;
  const [token, setToken] = useState(null);
  const checkToken = async () => {
    const res = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
    Reactotron.log('res', res);
    if (res) {
      setToken(res);
    } else if (!res) {
      setToken(null);
    }
  };
  Reactotron.log('data',user)
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
        rightComponent={ChangeUser(()=>{
          NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATEUSER,{data:user})
        })}
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        children={
          <SafeAreaView>
            {renderInfor(R.string.name, user.Name)}
            {renderInfor(R.string.phone, user.Phone)}
            {renderInfor(R.string.email, user.Email)}
            {renderInfor(R.string.Birth_Day, user.Birth_Day? user.Birth_Day:R.string.Not_Update)}
            {renderInfor(R.string.Sex, user.Sex=="1"?"Nam":user.Sex=="0"?"Nữ":R.string.Not_Update)}
            {renderInfor(R.string.city, user.City)}
            {renderInfor(R.string.District, user.District?user.District:R.string.Not_Update)}
            {renderInfor(R.string.Address, user.Address?user.Address:R.string.Not_Update)}
          </SafeAreaView>
        }
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor:R.color.colors.white},
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
    marginBottom: 5,
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
  ContainerLine: {
    borderWidth: 0.65,
    marginHorizontal: 24,
    borderColor: colors.line,
  },
  HeaderBack: { flexDirection: 'row', width: width },
  ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
  TextHeader: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    marginTop: 5,
  },
  ContainerHeader: { backgroundColor: colors.Sienna1 },
  TextInfor:{
    fontSize:15,
    fontFamily:R.fonts.bold
  },
  ImageChage:{
    height:25,
    width:30
  }
});
export default InforUserScreen;
