import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,Dimensions } from 'react-native'
import { Header,CheckBox  } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import {DataCity} from '../../constants/Mockup';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ASYNC_STORAGE } from '../../constants/Constant';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {hasWhiteSpace,validateEmail} from '../../utils/FuncHelper';
import {showMessages} from '../../utils/AlertHelper'
import Reactotron from 'reactotron-react-native';
import Fire from '../../firebase/firebaseSvc'
import NavigationUtil from '../../navigation/NavigationUtil';
import AsyncStorage from '@react-native-community/async-storage';
import Firebase from 'firebase'
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
const { height, width } = Dimensions.get("window");
const Confirm = (onPress) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
        <Text style={styles.TextConfirm}>{R.string.registration}</Text>
      </TouchableOpacity>
    </View>
  );
};
const RenderInput = (style,label, UserInput, cover) => {
    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <TextInput
                style={style}
                onChangeText={UserInput}
                placeholderTextColor={colors.focus}
                secureTextEntry={cover}
            />
        </View>
    )
}
const RenderCity = (onSelectedItemsChange,selectedItems,label) => {

    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <SectionedMultiSelect
                items={DataCity}
                IconRenderer={Icon}
                single={true}
                uniqueKey="city_id"
                // subKey="DataCity"
                confirmText={R.string.confirm}
                selectText={R.string.select_province}
                readOnlyHeadings={false}
                showCancelButton={true}
                showChips={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                ref={(SectionedMultiSelect) =>
                    (SectionedMultiSelect = SectionedMultiSelect)
                }
            />
        </View>
    )
}

const RegisterScreen = () => {
    //     console.log(DataCity);
        
    //     const [Item, SetItem]= useState({
    //       selectedItems: [],
    //    })
    //    const onSelectedItemsChange =(selectedItems)=>{
    //        SetItem({
    //            ...Item.selectedItems,
    //            selectedItems:selectedItems
    //        })
    //    }
        const [payload,setPayload]=useState({
          Name:'',
          Username:'admin',
          Password:'123', 
          id:'0'
        })
        console.log(payload.Name);
        const [checked,setChecked]= useState(false);
        const [Password, setPassword] = useState(true);
        const [token, setToken] = useState(null);
        const [isLoading, setLoading] = useState(true);
        const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
        console.log(payload.id);
        const CreatAcout = async () => {
              isLoading;
              const res = await Firebase.auth().createUserWithEmailAndPassword(
                payload.Username,
                payload.Password,
              );
              try {
                var userf = Firebase.auth().currentUser;
                userf.updateProfile({ displayName: payload.Name})
                Firebase.database().ref('users/'+payload.Name).set({name:payload.Name,_id:Fire.uid,Category:payload.id})
                .then(function() {
                  alert("User " + payload.Name + " was created successfully.");
                }, function(error) {
                  console.log("Error update displayName.");
                })
                setLoading(false),
                  setToken(res),
                  await AsyncStorage.setItem(
                    ASYNC_STORAGE.TOKEN,
                    res.user.uid.toString(),
                );
                showMessages(R.string.notification, 'Đăng ký thành công!');
                setTimeout(() => {
                  !token
                    ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN, {
                      screen: SCREEN_ROUTER_APP.HOME,
                    })
                    : alert(R.string.pleaseRegister);
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
              <Text style={styles.TextLeft}>
                {R.string.sign_up_for_account}
              </Text>
            </TouchableOpacity>
          }
          statusBarProps={styles.ContainerHeader}
        />
        <View style={{paddingVertical:15}}>
          {/* {RenderInput(R.string.name)}
                {RenderInput(R.string.phone)}
                {RenderCity(onSelectedItemsChange,Item.selectedItems, R.string.city)} */}
          {RenderInput(styles.TextInputStyle,R.string.name,name=>setPayload({...payload,Name:name}),false)}
          {RenderInput(styles.TextInputStyle,R.string.email, user => setPayload({...payload,Username:user}), false)}
          {
          <View style={{flexDirection:'row', paddingVertical:25}}>
            {RenderInput([styles.TextInputStyle,{ width:width-90}],R.string.pass, pass => setPayload({...payload,Password:pass}), Password)}
            <TouchableOpacity
              onPress={()=>{setPassword(!Password)}} 
              style={{borderBottomWidth:0.5, paddingTop:15}}>
             <FastImage 
              source={icon}
              style={styles.imgText}
              resizeMode={FastImage.resizeMode.contain}
             />
             </TouchableOpacity>
          </View>
          }
          <CheckBox
          title='Phòng thu'
          checked={checked}
          onPress={()=>
            {
              setPayload({
                ...payload,
                id:'1',
              }),
              setChecked(!checked)}
            }
        />
        
        <CheckBox
          title='Người dùng'
          checked={checked?false:true}
          onPress={()=>{
            setPayload({
              ...payload,
              id:'0',
            }),
            setChecked(!checked)
          }
          }
        />
          {/* {RenderInput(R.string.confirm_password, null, true)} */}
        </View>
        {Confirm(() => 
        {
          if(!validateEmail(payload.Username)){
            showMessages(R.string.notification, 'Email không đúng');
            return;
          }
          if (
            payload.Password.trim().length < 6 ||
            hasWhiteSpace(payload.Password))
           {
            showMessages(R.string.notification, 'Mật khẩu không đúng');
            return;
          }
          CreatAcout()
        }
      )}
      </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.white, alignItems: "center" },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    ContainerConfirm: {
        height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 330,
        alignItems: "center", justifyContent: "center", marginVertical: 120, marginHorizontal: 20
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    LeftHeader: { flexDirection: "row", width: 200, height: 40 },
    TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
    ImageBack: { height: 14, width: 14, marginTop: 10 },
    TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus},
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
    imgText:{height:22,width:22}
})
export default RegisterScreen;