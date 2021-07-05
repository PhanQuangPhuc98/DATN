import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, StyleSheet, TextInput, Platform, View, Button, ActivityIndicator, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import { Header } from "react-native-elements";
import NavigationUtil from '../../navigation/NavigationUtil'
import { colors } from '../../constants/Theme';
import { ASYNC_STORAGE,DEFAULT_PARAMS } from '../../constants/Constant';
import R from '../../assets/R';
import OneSignal from 'react-native-onesignal';
import Reactotron from 'reactotron-react-native'
import Geolocation from 'react-native-geolocation-service';
import image from '../../assets/imagesAsset';
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER,SCREEN_ROUTER_APP_ADD } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
import { hasWhiteSpace, validateEmail } from '../../utils/FuncHelper';
import { showMessages } from '../../utils/AlertHelper'
import AsyncStorage from '@react-native-community/async-storage';
// import auth from '@react-native-firebase/auth'
import { firebase, Auth,database } from '../../firebase/firebaseSvc'
const { height, width } = Dimensions.get("window");
const Infor = (style, placeholder, onChangeText, value, secureTextEntry) => {
  return (
    <View >
      <TextInput
        // style={styles.TextInputStyle}
        style={style}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.focus}
        value={value}
        secureTextEntry={secureTextEntry}
        autoCompleteType={'off'}
      />
    </View>
  );
};
const ForgotPass = (category) => {
  return (
    <TouchableOpacity
      onPress={() => {
        NavigationUtil.navigate(SCREEN_ROUTER_AUTH.FORGOT_PASS,{data:category});
      }}>
      <Text style={styles.ForgotPass}>Quên mật khẩu?</Text>
    </TouchableOpacity>
  );
}
const Confirm = (onPress,id) => {
  return (
    <View style={{alignItems:"center"}}>
      <TouchableOpacity
        onPress={onPress}
        style={styles.ContainerConfirm}>
        <Text style={styles.TextConfirm}>{R.string.log_in}</Text>
      </TouchableOpacity>
      <View style={styles.ContainerRegister}>
        <Text style={[styles.TextConfirm, { color: colors.focus }]}>Chưa có tài khoản?</Text>
        <TouchableOpacity onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER_AUTH.REGISTER,{data:id}) }}>
          <Text style={[styles.TextConfirm, { color: colors.Sienna1, marginLeft: 3 }]}>Đăng ký</Text></TouchableOpacity>
      </View>
    </View>
  )
}
const Line = () => {
  return (
    <View style={styles.v_container_line}>
      <View style={[styles.line, { marginLeft: 35 }]} />
      <Text style={[styles.TextConfirm, { color: colors.focus, marginHorizontal: 14 }]}>hoặc</Text>
      <View style={[styles.line, { marginRight: 35 }]} />
    </View>
  )
}
const Logo = (onPressFacebook, onPressGoogle) => {
  return (
    <View style={{ flexDirection: "row", paddingVertical: 27 }}>
      <TouchableOpacity onPress={onPressFacebook}>
        <FastImage source={image.ic_LogoFacebook} style={[styles.StyleLogo, { marginRight: 15 }]} />
      </TouchableOpacity>
      <TouchableOpacity onPress={onPressGoogle}>
        <FastImage source={image.ic_LogoGoogle} style={[styles.StyleLogo]} />
      </TouchableOpacity>
    </View>
  )
}
const LoginScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [Password, setPassword] = useState(true);
  const [confirm, setConfirm] = useState(null);
  const [token, setToken] = useState(null);
  const [code, setCode] = useState('');
  const User =[];
  const Studio =[];
  const [checkStudio,setCheckStudio]=useState([])
  const [checkUser,setCheckUser]=useState([])
  const Data = database();
  const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
  const [payload, setPayload] = useState({
    Username: '',
    Pass: ''
  });
  const [category,setCategory]=useState({
    id:''
  })
  const [CheckOnline,SetCheckOnline]=useState([])
  const Onile =[];
  const DB = async()=>{
    let Category =await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
    setCategory({
      ...category,
      id:Category
    })
  }
  const CallUser =()=>{

    try {
      Data
      .ref("Users")
      .once("value",Snapshot=>{
        Snapshot.forEach((snap)=>{
          const {email,Phone,Category} =snap.val();
          if(Category===DEFAULT_PARAMS.USER){
            User.push({
              email:email?email:null,
              Phone:Phone?Phone:null
            })
          }
          if(Category===DEFAULT_PARAMS.STUDIO){
            Studio.push({
              email:email?email:null,
              Phone:Phone?Phone:null
            })
          }
        })
        setCheckUser(User)
        setCheckStudio(Studio)
      })
    } catch (error) {
      console.log(error);
    }
  }
  const CallOnlineUser =()=>{
    try {
      Data
      .ref(`/Online/`)
      .once("value",Snapshot=>{
        Snapshot.forEach((snap)=>{
          const {OnlineUser,OnlineStudio,Email}=snap.val()
          Onile.push({
            OnlineUser:OnlineUser?OnlineUser:null,
            OnlineStudio:OnlineStudio?OnlineStudio:null,
            Email:Email?Email:null
          })

        })
        SetCheckOnline(Onile)
      })
    } catch (error) {
      
    }
  }
  useEffect(() => {
    CallOnlineUser()
    CallUser()
  }, [])
  useEffect(() => {
    DB()
    const unsubscribe = navigation.addListener('blur', () => {
      setPayload({
        Username: '',
        Pass: '',
      });
    });
    return unsubscribe;
  }, [navigation]);
  const UpdateOnlineUser =(token)=>{
    try {
      //ChangeUserIdOnesignal(token)
      Data
      .ref(`/Online/${token}/`)
      .update({
        OnlineUser:DEFAULT_PARAMS.YES
      })
    } catch (error) {
      
    }
  }
  const UpdateOnlineStudio =(token)=>{
    try {
      //ChangeUserIdOnesignal(token)
      Data
      .ref(`/Online/${token}/`)
      .update({
        OnlineStudio:DEFAULT_PARAMS.YES
      })
    } catch (error) {
      
    }
  }
  const signInWithEmail = async () => {
    setLoading(true)

    try {
      const res = await Auth().signInWithEmailAndPassword(payload.Username, payload.Pass);
      setLoading(false),
        setToken(res),
        await AsyncStorage.setItem(
          ASYNC_STORAGE.TOKEN,
          res.user.uid.toString(),
        );
        console.log("token",res.user.uid.toString());
        UpdateUserOneSignal(res.user.uid.toString())
     // ChangeUserIdOnesignal(res.user.uid.toString())  
      showMessages(R.string.notification, 'Đăng nhập thành công!');
      category.id===DEFAULT_PARAMS.USER?
      setTimeout(() => {
        !token
          ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN)
          : alert(R.string.pleaseLogin);
      }, 500)&&UpdateOnlineUser(res.user.uid.toString()) :
      setTimeout(() => {
        !token
          ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN_ADMIN, {
            screen: SCREEN_ROUTER_APP_ADD.MANYUSER,
          })
          : alert(R.string.pleaseLogin);
      }, 500)&&UpdateOnlineStudio(res.user.uid.toString())


      
      Reactotron.log('res', res.user.uid)
      console.log("hello");
      
    } catch (error) {
      setLoading(false),
        Reactotron.log('error', error)
        console.log("error",error);
        
        showMessages(R.string.notification, R.string.NotifiNotAceesLogin);
    };


  }
  const UpdateUserOneSignal =async(token)=>{
    const { userId, } = await OneSignal.getDeviceState();
    try {
      Data
      .ref(`/UserIdOneSignal/${token}`)
      .update({
        userId:userId
      })
    } catch (error) {
      console.log(error);
    }
  }
  Reactotron.log('payload', payload);
 // console.log("CheckOnline",CheckOnline);
  // console.log("Checkuser",checkUser);
  
  return (
    <SafeAreaView style={styles.Container}>
      <Header
        containerStyle={styles.ContainerHeader}
        leftComponent={
          <TouchableOpacity
          style={styles.LeftHeader}
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER.INTRO)
          }}>
          <FastImage
            source={image.ic_back}
            style={styles.ImageBack}
            resizeMode="contain"
          />
          <Text style={styles.TextLeft}>{R.string.log_in}</Text>
        </TouchableOpacity>
        }
        statusBarProps={styles.ContainerHeader}
      />
      <ScrollView
      
      showsVerticalScrollIndicator={false}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <View style={styles.ContainerLogo}>
            <FastImage
              source={image.ic_Splash}
              style={styles.ImageLogo}
              resizeMode="contain"
            />
          </View>
          <View style={styles.ContainerInput}>
            {Infor(
              [styles.TextInputStyle,{width:width-80}],
              R.string.email,
              (user) =>
                setPayload({
                  ...payload,
                  Username: user,
                }),
              payload.Username,
              null,
            )}
            {
              <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
                {Infor([styles.TextInputStyle, { width: width - 100 }], R.string.pass, (pass) => setPayload({ ...payload, Pass: pass, }), payload.Pass, Password,)}
                <TouchableOpacity
                  onPress={() => { setPassword(!Password) }}
                  style={{ borderBottomWidth: 0.5, paddingTop: 15 }}>
                  <FastImage
                    source={icon}
                    style={styles.imgText}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </TouchableOpacity>
              </View>
            }
            {ForgotPass(category.id)}
          </View>
          {isLoading ? <ActivityIndicator size="small" color={R.color.colors.Sienna1} /> :
            Confirm(() => {
              if (!validateEmail(payload.Username)) {
                showMessages(R.string.notification, 'Email không đúng');
                return;
              }
              if (
                payload.Pass.trim().length < 6 ||
                hasWhiteSpace(payload.Pass)) {
                showMessages(R.string.notification, 'Mật khẩu không đúng');
                return;
              }
              if(category.id===DEFAULT_PARAMS.USER){
                checkStudio.forEach((item)=>{
                  if(item.email===payload.Username){
                    showMessages(R.string.notification,R.string.NotificationNotStudio)
                  }
                })
               
              }
              if(category.id===DEFAULT_PARAMS.STUDIO){
                checkUser.forEach((item)=>{
                  if(item.email===payload.Username){
                    showMessages(R.string.notification,R.string.NotificationNotUser)
                  }
                })
               
              }
              if(category.id===DEFAULT_PARAMS.USER){
                              
              CheckOnline.forEach((item)=>{
                if((item.Email===payload.Username)&&(item.OnlineUser===DEFAULT_PARAMS.NO)){
                  signInWithEmail()
                  //alert("hello")
                }
                else  if((item.Email===payload.Username)&&(item.OnlineUser===DEFAULT_PARAMS.YES)) {
                  //alert("no")
                  showMessages(R.string.notification,R.string.NotifiLogin)
                }
              })
             
              }
              if(category.id===DEFAULT_PARAMS.STUDIO){
                CheckOnline.forEach((item)=>{
                  if((item.Email===payload.Username)&&(item.OnlineStudio===DEFAULT_PARAMS.NO)){
                    signInWithEmail()
                  }
                  else if((item.Email===payload.Username)&&(item.OnlineStudio===DEFAULT_PARAMS.YES)){
                    showMessages(R.string.notification,R.string.NotifiLogin)
                  }
                })
                
              }
              signInWithEmail()
            },
            category.id
            )}
          {/* {Line()} */}
          {/* {Logo()} */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: colors.white, alignItems: "center", },
  ContainerHeader: { backgroundColor: colors.Sienna1 },
  LeftHeader: { flexDirection: "row", width: 200, height: 40 },
  ImageBack: { height: 14, width: 14, marginTop: 10 },
  TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
  ContainerLogo: { paddingVertical: 15, },
  ContainerInput: { alignItems: "center" },
  ImageLogo: { height: height /3, width: width },
  TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus },
  ForgotPass: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, marginLeft: Platform.Version==23?190:220},
  ContainerConfirm: {
    height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: width-60,
    alignItems: "center", justifyContent: "center", marginVertical: 20
  },
  TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
  ContainerRegister: { flexDirection: "row", paddingHorizontal: 75 },
  v_container_line: { marginTop: '5%', flexDirection: 'row', alignItems: 'center' },
  line: { height: 1, backgroundColor: colors.line, flex: 1 },
  StyleLogo: { height: 66, width: 65 },
  imgText: { height: 22, width: 22 }
});
export default LoginScreen;