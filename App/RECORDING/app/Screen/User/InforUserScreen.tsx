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
import { colors } from '../../constants/Theme';
import { firebase, database } from '../../firebase/firebaseSvc';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { useEffect } from 'react';
import { SCREEN_ROUTER_APP } from '../../utils/Constant';
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
const InforUserScreen = () => {
  const [Users, setUsers] = useState({
    _id: '',
    Name: '',
    Email: '',
    Password: '',
    Phone: '',
    Sex: '',
    Birth_Day: '',
    Category: '0',
    City: '',
    District: '',
    Address: ''
  });
  useEffect(() => {
    const onValueChange = database()
      .ref('/users/' + Fire.uid)
      .on('value', (snapshot) => {
        setUsers({
          ...Users,
          _id: snapshot.val()._id,
          Name: snapshot.val().name,
          Category: snapshot.val().Category,
          Email: snapshot.val().email,
          Phone: snapshot.val().Phone,
          Sex: snapshot.val().Sex,
          Birth_Day: snapshot.val().Birth_Day,
          City: snapshot.val().City,
          District: snapshot.val().District,
          Address: snapshot.val().Address,
        });
      });
  }, [])
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
        rightComponent={ChangeUser(()=>{
          NavigationUtil.navigate(SCREEN_ROUTER_APP.UPDATEUSER)
        })}
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        children={
          <SafeAreaView>
            {renderInfor(R.string.name, Users.Name)}
            {renderInfor(R.string.phone, Users.Phone)}
            {renderInfor(R.string.email, Users.Email)}
            {renderInfor(R.string.Birth_Day, Users.Birth_Day)}
            {renderInfor(R.string.Sex, Users.Sex)}
            {renderInfor(R.string.city, Users.City)}
            {renderInfor(R.string.District, Users.District)}
            {renderInfor(R.string.Address, Users.Address)}
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
