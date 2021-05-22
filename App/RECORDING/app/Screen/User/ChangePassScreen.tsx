import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Button
} from 'react-native';
import images from '../../assets/imagesAsset';
import {firebase} from '../../firebase/firebaseSvc';
import FastImage from 'react-native-fast-image';
import {colors} from '../../constants/Theme';
import {hasWhiteSpace} from '../../utils/FuncHelper'
import ScreenComponent from '../../components/ScreenComponent';
import Reactotron from 'reactotron-react-native';
import {showMessages} from '../../utils/AlertHelper'
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { Input } from 'react-native-elements';
const {height, width} = Dimensions.get('window');
const Back = (onPress) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={images.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{R.string.changepass}</Text>
    </TouchableOpacity>
  );
};
const Confirm = (onPress) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
        <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
      </TouchableOpacity>
    </View>
  );
};
const renderInput = (lable,source,onPress,secureTextEntry,value,onChangeText) => {
  return (
    <View style={{paddingHorizontal: 20}}>
      <Text style={styles.lableInput}>{lable}</Text>
      <View style={{flexDirection:"row"}}>
      <TextInput
        value={value}
        style={styles.txt}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
      <TouchableOpacity
      onPress={onPress} 
      style={{borderBottomWidth:0.5}}>
        <FastImage 
        source={source}
        style={styles.imgText}
        resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
      </View>
    </View>
  );
};
const ChangePassScreen = () => {
  const [Password, setPassword] = useState(true);
  const [NewPassword, setNewPassword] = useState(true);
  const [confirm_password, setconfirm_password] = useState(true);
  const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
  const iconNew = NewPassword ? R.images.ic_visibility : R.images.ic_invisible;
  const iconConfirm = confirm_password? R.images.ic_visibility : R.images.ic_invisible;
  const [payLoad, setPayLoad] = useState({
    Password: '',
    NewPassword: '',
    confirm_password: '',
  });
  const reauthenticate = (currentPassword) => {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }
  const changePassword = (currentPassword, newPassword) => {
    reauthenticate(currentPassword).then(() => {
      var user = firebase.auth().currentUser;
      user.updatePassword(newPassword).then(() => {
        showMessages(R.string.notification, R.string.ChangePass_Sucess);
        Reactotron.log("Password updated!");
        NavigationUtil.goBack();
      }).catch((error) => { Reactotron.log(error); });
    }).catch((error) => { Reactotron.log(error); });
  }
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        children={<SafeAreaView>
          {
          renderInput(R.string.old_password,icon,()=>{setPassword(!Password)},Password,payLoad.Password,Password=>{setPayLoad({...payLoad,Password:Password});})
          } 
          {renderInput(R.string.new_password,iconNew,()=>{setNewPassword(!NewPassword)},NewPassword,payLoad.NewPassword,NewPassword=>{setPayLoad({...payLoad,NewPassword:NewPassword});})} 
          {renderInput(R.string.confirm_new_password,iconConfirm,()=>{setconfirm_password(!confirm_password)},confirm_password,payLoad.confirm_password,confirm_password=>{setPayLoad({...payLoad,confirm_password:confirm_password});})}
          {Confirm(()=>{
            if (
              payLoad.NewPassword.trim().length < 6 ||
              payLoad.NewPassword != payLoad.confirm_password ||
              (hasWhiteSpace(payLoad.NewPassword) && hasWhiteSpace(payLoad.confirm_password))
            ) {
              showMessages(R.string.notification, 'vui lòng nhập đầy đủ thông tin');
              return;
            }
            changePassword(payLoad.Password,payLoad.NewPassword)})}
          </SafeAreaView>}
      />
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
  ContainerConfirm: {
    height: 46,
    backgroundColor: colors.Sienna1,
    borderRadius: 30,
    width: 330,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 120,
    marginHorizontal: 30,
  },
  TextConfirm: {fontSize: 14, fontFamily: R.fonts.bold, color: colors.white},
  lableInput:{fontSize:14, fontFamily:R.fonts.bold, color:colors.black,marginTop:10},
  txt: {
    borderBottomWidth:0.5,
    borderColor:colors.focus,
    width:width-60
  },
  imgText:{height:22,width:22}
});
export default ChangePassScreen;
