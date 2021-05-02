import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Header } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from 'firebase'
import auth from '@react-native-firebase/auth'
import Reactotron from 'reactotron-react-native';
import {hasWhiteSpace,validateEmail} from '../../utils/FuncHelper';
import {showMessages} from '../../utils/AlertHelper'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
const Confirm = (onPress) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
        <Text style={styles.TextConfirm}>{R.string.registration}</Text>
      </TouchableOpacity>
    </View>
  );
};
const RenderInput = (placeholder,UserInput, cover) => {
    return (
        <View style={{paddingVertical:10, alignItems:"center"}}>
            <TextInput
                style={styles.TextInputStyle}
                onChangeText={UserInput}
                placeholderTextColor={colors.focus}
                secureTextEntry={cover}
                placeholder={placeholder}
            />
        </View>
    )
}
const RenderImageLogo = ()=>{
    return(
        <View style={styles.ContainerLogo}>
            <FastImage
            style={styles.ImageLogo}
            source={image.ic_Splash}
            resizeMode="contain"
            >

            </FastImage>
        </View>

    )
}
const ForgotPassScreen = () => {
     const [email, setEmail] = useState('');
     const [token, setToken] = useState(null);
     const [isLoading, setLoading] = useState(true);
     const ForgotPass = async () => {
       isLoading;
       const res = await Firebase.auth().sendPasswordResetEmail(email);
       try {
         setLoading(false),
           setToken(res),
           await AsyncStorage.setItem(
             'key',
             JSON.stringify(res),
           );
         setTimeout(() => {
           !token
             ? NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
             : alert(R.string.pleaseForgotPass);
         }, 500);

         Reactotron.log('res', res), alert('data');
       } catch (error) {
         setLoading(true), Reactotron.log('error', error);
       }
     };
    return (
      <SafeAreaView style={styles.Container}>
        <Header
          containerStyle={styles.ContainerHeader}
          leftComponent={
            <TouchableOpacity
              style={styles.LeftHeader}
              onPress={() => {
                NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN);
              }}>
              <FastImage
                source={image.ic_back}
                style={styles.ImageBack}
                resizeMode="contain"
              />
              <Text style={styles.TextLeft}>{R.string.forgot_password}</Text>
            </TouchableOpacity>
          }
          statusBarProps={styles.ContainerHeader}
        />
        <View style={styles.Container}>
          {RenderImageLogo()}
          <Text style={styles.TextForgot}>{R.string.header_forgot}</Text>
          {RenderInput(R.string.email, (email) => setEmail(email), false)}
          {Confirm(() => 
          {
            if(!validateEmail(email)){
              showMessages(R.string.notification, 'Email không đúng');
              return;
            }
            ForgotPass()
          }
          )
          }
        </View>
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.white, alignItems: "center" },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    ContainerConfirm: {
        height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 233,
        alignItems: "center", justifyContent: "center", marginVertical: 120, marginHorizontal: 20
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    LeftHeader: { flexDirection: "row", width: 200, height: 40 },
    TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
    ImageBack: { height: 14, width: 14, marginTop: 10 },
    TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus, height: 40 },
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
    ImageLogo:{height:222, width:311},
    ContainerLogo: { alignItems: "center",paddingHorizontal: 50,paddingVertical:50},
    TextForgot:{textAlign:"center",fontFamily:R.fonts.bold,fontSize:16,color:colors.black, width:246}
})
export default ForgotPassScreen;