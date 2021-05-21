import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Dimensions } from 'react-native'
import { Header, CheckBox } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import { DataCity } from '../../constants/Mockup';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ASYNC_STORAGE } from '../../constants/Constant';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { hasWhiteSpace, validateEmail } from '../../utils/FuncHelper';
import { showMessages } from '../../utils/AlertHelper'
import Reactotron from 'reactotron-react-native';
import Fire from '../../firebase/firebaseSvc'
import NavigationUtil from '../../navigation/NavigationUtil';
import AsyncStorage from '@react-native-community/async-storage';
import { Auth, database } from '../../firebase/firebaseSvc'
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
const RenderInput = (style, label, UserInput, cover) => {
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
const RenderCity = (onSelectedItemsChange, selectedItems, label) => {
  return (
    <View>
      <Text style={styles.TextLable}>{label}</Text>
      <SectionedMultiSelect
        items={DataCity}
        IconRenderer={Icon}
        single={true}
        uniqueKey="name"
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
  const [payload, setPayload] = useState({
    Name: '',
    Username: 'admin',
    Password: '123',
    Phone: '',
    Sex: '',
    Birth_Day: '',
    id: '0',
    City: '',
    District: '',
    Address: '',
  })
  const onSelectedItemsChange = (selectedItems) => {
    setPayload({
      ...payload,
      City: selectedItems
    })
  }
  console.log(payload.City, "city");
  const [checked, setChecked] = useState(false);
  const [Password, setPassword] = useState(true);
  const [token, setToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
  console.log(payload.id);
  const CreatAcout = async () => {
    isLoading;
    const res = await Auth().createUserWithEmailAndPassword(
      payload.Username,
      payload.Password,
    );
    try {
      var userf = Auth().currentUser;
      userf.updateProfile({ displayName: payload.Name })
      database()
        .ref(`/users/${Fire.uid}`)
        .set({ name: payload.Name, _id: Fire.uid, Category: payload.id, email: payload.Username, Image: "", Phone: payload.Phone, Address: payload.Address, City: payload.City[0], Sex: payload.Sex, District: payload.District, Birth_Day: payload.Birth_Day })

      showMessages(R.string.notification, 'Đăng ký thành công!');
      setLoading(false),

        setToken(res),
        await AsyncStorage.setItem(
          ASYNC_STORAGE.TOKEN,
          res.user.uid.toString(),
        );
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
      <View style={{ paddingVertical: 15 }}>
        {RenderInput(styles.TextInputStyle, R.string.name, name => setPayload({ ...payload, Name: name }), false)}
        {RenderInput(styles.TextInputStyle, R.string.email, user => setPayload({ ...payload, Username: user }), false)}
        {RenderInput(styles.TextInputStyle, R.string.phone, phone => setPayload({ ...payload, Phone: phone }), false)}
        {RenderCity(onSelectedItemsChange, payload.City, R.string.city)}
        {
          <View style={{ flexDirection: 'row', paddingVertical: 25 }}>
            {RenderInput([styles.TextInputStyle, { width: width - 90 }], R.string.pass, pass => setPayload({ ...payload, Password: pass }), Password)}
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
        <View style={{flexDirection:"row", backgroundColor:'white'}}>
          <CheckBox
            title='Phòng thu'
            containerStyle={{backgroundColor:"white"}}
            uncheckedIcon='circle-o'
            checkedIcon='dot-circle-o'
            checked={checked}
            checkedColor={colors.Sienna1}
            onPress={() => {
              setPayload({
                ...payload,
                id: '1',
              }),
                setChecked(!checked)
            }
            }
          />
          <CheckBox
            title='Người dùng'
            containerStyle={{backgroundColor:"white"}}
            uncheckedIcon='circle-o'
            checkedIcon='dot-circle-o'
            checked={checked ? false : true}
            checkedColor={colors.Sienna1}
            onPress={() => {
              setPayload({
                ...payload,
                id: '0',
              }),
                setChecked(!checked)
            }
            }
          />
        </View>
        {/* {RenderInput(R.string.confirm_password, null, true)} */}
      </View>
      {Confirm(() => {
        if (!validateEmail(payload.Username)) {
          showMessages(R.string.notification, 'Email không đúng');
          return;
        }
        if (
          payload.Password.trim().length < 6 ||
          hasWhiteSpace(payload.Password)) {
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
    alignItems: "center", justifyContent: "center", marginTop: 10, marginHorizontal: 20
  },
  TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
  LeftHeader: { flexDirection: "row", width: 200, height: 40 },
  TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
  ImageBack: { height: 14, width: 14, marginTop: 10 },
  TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus },
  TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
  imgText: { height: 22, width: 22 }
})
export default RegisterScreen;