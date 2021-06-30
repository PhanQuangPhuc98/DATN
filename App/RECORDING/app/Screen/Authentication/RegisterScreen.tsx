import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, ActivityIndicator, TextInput, TouchableOpacity, Dimensions, ScrollView, Platform } from 'react-native'
import { Header, CheckBox } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import { DataCity } from '../../constants/Mockup';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../constants/Constant';
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { hasWhiteSpace, validateEmail, validatePhoneNumber } from '../../utils/FuncHelper';
import { showMessages } from '../../utils/AlertHelper'
import Reactotron from 'reactotron-react-native';
import Fire from '../../firebase/firebaseSvc'
import OneSignal from 'react-native-onesignal';
import NavigationUtil from '../../navigation/NavigationUtil';
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service';
import { Auth, database } from '../../firebase/firebaseSvc'
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER, SCREEN_ROUTER_APP_ADD } from '../../utils/Constant'
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
    <View style={{ paddingTop: 5 }}>
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
const RenderCity = (data, onSelectedItemsChange, selectedItems, label) => {
  return (
    <View style={[styles.TextInputStyle, { paddingTop: 15, height: 80 }]}>
      <Text style={styles.TextLable}>{label}</Text>
      <SectionedMultiSelect
        items={data}
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
const RegisterScreen = ({ route, navigation, ...props }) => {
  const { data } = route.params
  const [payload, setPayload] = useState({
    Name: '',
    Email: '',
    Password: '',
    ConfimPass: '',
    Phone: '',
    Sex: '',
    Birth_Day: '',
    City: '',
    District: '',
    Address: '',
  })
  const putKey = database().ref().push().key;
  const onSelectedItemsChange = (selectedItems) => {
    setPayload({
      ...payload,
      City: selectedItems
    })
  }
  //console.log(payload.City, "city");
  const [checked, setChecked] = useState(false);
  const [city, setCity] = useState([]);
  const [Password, setPassword] = useState(true);
  const [category, setCategory] = useState({
    id: ''
  })
  const [current_position, setcurrent_position] = useState({
    latitude: null,
    longitude: null
  })
  const [confirm_password, setconfirm_password] = useState(true);
  const [token, setToken] = useState(null);
  const User = [];
  const [checkUser, setCheckUser] = useState([])
  const [isLoading, setLoading] = useState(false);
  const Database = database();
  const icon = Password ? R.images.ic_visibility : R.images.ic_invisible;
  const iconConfirm = confirm_password ? R.images.ic_visibility : R.images.ic_invisible;
  const DB = async () => {
    let Category = await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
    setCategory({
      ...category,
      id: Category
    })
    console.log("Category", Category);

  }
  const getUser = async () => {
    const { userId, } = await OneSignal.getDeviceState();
    console.log("userId", userId);

  }
  const location = () => {

    try {
      Geolocation.getCurrentPosition(data => {
        setcurrent_position({
          ...current_position,
          latitude: data ? data.coords.latitude : 21.0031167,
          longitude: data ? data.coords.longitude : 105.82014
        })

        Reactotron.log(data)
      })
    } catch (error) {

      Reactotron.log(error)
    }
  }
  const UpdateUserOneSignal = async (token) => {
    const { userId, } = await OneSignal.getDeviceState();
    try {
      Database
        .ref(`/UserIdOneSignal/${token}`)
        .update({
          userId: userId
        })
    } catch (error) {
      console.log(error);
    }
  }
  const CallCity = () => {
    setTimeout(async () => {
      const city = await database()
      if (!city) {
        console.log("not network");
        alert("not network")
      }
      city.ref("/City/")
        .on('value', (snapshot) => {
          let Data = [];
          // console.log("connect network",snapshot.val());
          snapshot.forEach((child) => {
            Data.push({
              id: child.val().id,
              name: child.val().name
            })
          })
          setCity(Data)
        });
    }, 500);
  }
  useEffect(() => {
    CallCity()
  }, [city])
  useEffect(() => {
    CallUser()
  }, [checkUser])
  useEffect(() => {
    DB()
    // CallUser()
    location()
    getUser()
  }, [])
  // console.log("lucation",current_position);

  const CreatIntro = () => {
    const db = database()
    try {
      db
        .ref(`/IntroStudio/${Fire.uid}`)
        .set({ content: "" })

    } catch (error) {
      console.log(error);
    }
  }
  const CallUser = () => {

    try {
      Database
        .ref("Users")
        .once("value", Snapshot => {
          Snapshot.forEach((snap) => {
            const { email, Phone } = snap.val();
            User.push({
              email: email ? email : null,
              Phone: Phone ? Phone : null
            })
          })
          setCheckUser(User)
        })
    } catch (error) {
      console.log(error);
    }
  }
  const CreatPrice = () => {
    const db = database()
    try {
      db
        .ref(`/PriceStudio/${Fire.uid}`)
        .set({ oldPrice: '0', newPrice: '0', SalesPromotion: '0' })

    } catch (error) {
      console.log(error);
    }
  }
  const UpdateOnlineUser = (token) => {
    try {
      Database
        .ref(`/Online/${token}/`)
        .update({
          OnlineUser: DEFAULT_PARAMS.YES,
          Email: payload.Email
        })
    } catch (error) {

    }
  }
  const UpdateOnlineStudio = (token) => {
    try {
      Database
        .ref(`/Online/${token}/`)
        .update({
          OnlineStudio: DEFAULT_PARAMS.YES,
          Email: payload.Email
        })
    } catch (error) {

    }
  }
  const CreatAcout = async () => {
    setLoading(true)
    try {
      const res = await Auth().createUserWithEmailAndPassword(
        payload.Email,
        payload.Password,
      );
      var userf = Auth().currentUser;
      userf.updateProfile({ displayName: payload.Name })
      database()
        .ref(`/Users/${Fire.uid}`)
        .set({
          Name: payload.Name,
          _id: Fire.uid, Category: data,
          email: payload.Email,
          Image: "",
          Phone: payload.Phone,
          Address: payload.Address,
          City: payload.City[0],
          Sex: payload.Sex,
          District: payload.District,
          Birth_Day: payload.Birth_Day,
          latitude: data === "1" ? current_position.latitude : null,
          longitude: data === "1" ? current_position.longitude : null,
        })
      if (category.id === "1") {
        CreatIntro()
        CreatPrice()
      }
      UpdateUserOneSignal(res.user.uid.toString())
      setLoading(false),
        setToken(res),
        await AsyncStorage.setItem(
          ASYNC_STORAGE.TOKEN,
          res.user.uid.toString(),
        );
      data === DEFAULT_PARAMS.USER ?
        setTimeout(() => {
          !token
            ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN, {
              screen: SCREEN_ROUTER_APP_ADD.MANYUSER,
            })
            : alert(R.string.pleaseRegister);
        }, 500) && UpdateOnlineUser(res.user.uid.toString()) :
        setTimeout(() => {
          !token
            ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN_ADMIN, {
              screen: SCREEN_ROUTER_APP.HOME,
            })
            : alert(R.string.pleaseRegister);
        }, 500) && UpdateOnlineStudio(res.user.uid.toString())
      showMessages(R.string.notification, 'Đăng ký thành công!');
    } catch (error) {
      setLoading(false), Reactotron.log('error', error);
    }
  };
  //console.log("city", city)
   //console.log("checkUser",checkUser);

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
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={[styles.Container]}>
          {RenderInput(styles.TextInputStyle, data === "1" ? R.string.nameStudio : R.string.name, name => setPayload({ ...payload, Name: name }), false)}
          {RenderInput(styles.TextInputStyle, R.string.email, email => setPayload({ ...payload, Email: email }), false)}
          {RenderInput(styles.TextInputStyle, R.string.phone, phone => setPayload({ ...payload, Phone: phone }), false)}
          {RenderCity(city, onSelectedItemsChange, payload.City, R.string.city)}
          <View style={{ flexDirection: 'row' }}>
            {RenderInput([styles.TextInputStyle, { width: width - 70 }], R.string.pass, pass => setPayload({ ...payload, Password: pass }), Password)}
            <TouchableOpacity
              onPress={() => { setPassword(!Password) }}
              style={{ borderBottomWidth: 0.5, paddingTop: Platform.Version == 23 ? 42.5 : 42 }}>
              <FastImage
                source={icon}
                style={styles.imgText}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
          <View style={{ flexDirection: 'row' }}>
            {RenderInput([styles.TextInputStyle, { width: width - 70 }], R.string.confirm_password, confirm_password => setPayload({ ...payload, ConfimPass: confirm_password }), confirm_password)}
            <TouchableOpacity
              onPress={() => { setconfirm_password(!confirm_password) }}
              style={{ borderBottomWidth: 0.5, paddingTop: 42 }}>
              <FastImage
                source={iconConfirm}
                style={styles.imgText}
                resizeMode={FastImage.resizeMode.contain}
              />
            </TouchableOpacity>
          </View>
        </View>
        {isLoading ? <ActivityIndicator size="small" color={R.color.colors.Sienna1} /> :
          Confirm(() => {
            if (!payload.Name.trim().length) {
              showMessages(R.string.notification, 'Vui lòng nhập họ và tên !');
              return;
            }
            if (!validateEmail(payload.Email)) {
              showMessages(R.string.notification, 'Email không hợp lệ !');
              return;
            }
            if (!validatePhoneNumber(payload.Phone)) {
              showMessages(R.string.notification, 'Số điện thoại không hợp lệ !');
              return;
            }
            if (payload.City == '') {
              showMessages(R.string.notification, 'Vui lòng chọn Tỉnh/thành phố !');
              return;
            }
            if (
              payload.Password.trim().length < 6 ||
              hasWhiteSpace(payload.Password)) {
              showMessages(R.string.notification, 'Mật khẩu phải lớn hơn 6 ký tự !');
              return;
            }
            if (payload.Password != payload.ConfimPass) {
              showMessages(R.string.notification, 'Mật khẩu không hợp lệ, vui lòng thử lại !');
              return;
            }
            checkUser.forEach((item) => {
              if (item.email === payload.Email) {
                showMessages(R.string.notification, R.string.NotificationCheckEmail)
              }
              else if (item.email != payload.Email) {
                CreatAcout()
              }
            })
          })
        }
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: colors.white, alignItems: "center" },
  ContainerHeader: { backgroundColor: colors.Sienna1 },
  ContainerConfirm: {
    height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 330,
    alignItems: "center", justifyContent: "center", marginVertical: 80, marginHorizontal: 20
  },
  TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
  LeftHeader: { flexDirection: "row", width: 200, height: 40 },
  TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
  ImageBack: { height: 14, width: 14, marginTop: 10 },
  TextInputStyle: { borderBottomWidth: 0.5, width: width - 50, borderColor: colors.focus, height: 40 },
  TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
  imgText: { height: 22, width: 22 }
})
export default RegisterScreen;