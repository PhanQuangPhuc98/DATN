import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity,Dimensions } from 'react-native'
import { Header } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import {DataCity} from '../../constants/Mockup';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import {hasWhiteSpace,validateEmail} from '../../utils/FuncHelper';
import {showMessages} from '../../utils/AlertHelper'
import Reactotron from 'reactotron-react-native';
import NavigationUtil from '../../navigation/NavigationUtil';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
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
          Username:'admin',
          Password:'123'
        })
        const [Password, setPassword] = useState(true);
        const [token, setToken] = useState(null);
        const [isLoading, setLoading] = useState(true);
        const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
        const CreatAcout = async () => {
              isLoading;
              const res = await auth().createUserWithEmailAndPassword(
                payload.Username,
                payload.Password,
              );
              try {
                setLoading(false),
                  setToken(res),
                  await AsyncStorage.setItem(
                    'key',
                    JSON.stringify(res.user.uid.toString()),
                  );
                showMessages(R.string.notification, 'Đăng ký thành công!');
                setTimeout(() => {
                  !token
                    ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN, {
                        data: 'hello',
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