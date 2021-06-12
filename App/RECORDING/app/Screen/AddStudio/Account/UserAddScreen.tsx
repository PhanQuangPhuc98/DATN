import React, { useState, useEffect } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native';
import NavigationUtil from '../../../navigation/NavigationUtil';
import Reactotron from 'reactotron-react-native';
import {
    SCREEN_ROUTER_AUTH,
    SCREEN_ROUTER,
    SCREEN_ROUTER_APP,
    SCREEN_ROUTER_APP_ADD
} from '../../../utils/Constant';
import { DataUser } from '../../../constants/Mockup'
import { Avatar } from 'react-native-elements'
import R from '../../../assets/R'
import { colors } from '../../../constants/Theme'
import Fire from '../../../firebase/firebaseSvc';
import { firebase, database, Auth } from '../../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../../constants/Constant';
import ScreenComponent from '../../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import ModalDrop from '../../../components/ModalDrop'
import { log } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const left = () => {
    return (
        <View>
            <Text style={styles.Title}>{R.string.user}</Text>
        </View>
    );
};
const personal = (Users, onPress, name, phone) => {
    return (
        <View style={styles.HeaderPerson}>
            <Avatar
                size={56}
                avatarStyle={styles.AvatarStyle}
                source={Users ? { uri: Users } : images.ic_User}>
                <Avatar.Accessory
                    onPress={onPress}
                    size={15}
                />
            </Avatar>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={styles.TextName}>
                    {name}
                </Text>
                <Text style={[styles.TextName, { fontSize: 14, color: colors.focus }]}>
                    {phone}
                </Text>

            </View>
        </View>
    );
};
const Logout = async () => {
    const res = await Auth().signOut();
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
const ChildScreen = (source, lable, url, onPress,ImgScreen) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.ContainerScreen}>
            <FastImage
                source={source}
                resizeMode={FastImage.resizeMode.contain}
                style={ImgScreen}></FastImage>
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
const UserAddScreen = () => {
    const [isModalVisible, setModalVisible] = useState(false);
    const [Users, setUsers] = useState({
        _id: '',
        Name: '',
        Image: '',
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
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }
    useEffect(() => {
        Auth().onAuthStateChanged(user => {
            if (user) {
                console.log("state = definitely signed in")
                const onValueChange = database()
                    .ref('/users/' + Fire.uid)
                    .on('value', (snapshot) => {
                        setUsers({
                            ...Users,
                            _id: snapshot.val()._id,
                            Image: snapshot.val().Image,
                            Name: snapshot.val().Name,
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
            }
            else {
                console.log("state = definitely signed out")
            }
        })
    }, [])
    Reactotron.log("User", Users)
    return (
        <SafeAreaView style={{ backgroundColor: colors.primary, flex: 1 }}>
        <ScreenComponent
          leftComponent={left()}
          containerStyle={styles.ContainerHeader}
          statusBarProps={styles.ContainerHeader}
          children={
            <View style={{backgroundColor:colors.brown}}>
              {personal(
                Users.Image,
                () => NavigationUtil.navigate(SCREEN_ROUTER.APP, { screen: SCREEN_ROUTER_APP.ADPOST }),
                Users.Name, Users.Phone)}
              <View style={{ backgroundColor: colors.white }}>
                {ChildScreen(
                  images.ic_InforUser,
                  R.string.InforStudio,
                  images.ic_BackRight,
                  () => {
                    NavigationUtil.navigate(SCREEN_ROUTER.APPADD, {
                      screen: SCREEN_ROUTER_APP_ADD.INFORUSERADD,
                      params:{user:Users}
                    });
                  },styles.ImgScreen
                )}
                {Line()}
                {ChildScreen(
                  images.ic_Content,
                  R.string.UpdateIntroStudio,
                  images.ic_BackRight,
                  () => {
                    NavigationUtil.navigate(SCREEN_ROUTER.APPADD, {
                      screen: SCREEN_ROUTER_APP_ADD.UPDATEINTROADD,
                      params:{user:Users}
                    });
                  },[styles.ImgScreen,{height:22}]
                )}
                {Line()}
                {ChildScreen(
                  images.ic_Orderproduct,
                  R.string.Revenue,
                  images.ic_BackRight,
                  ()=>{NavigationUtil.navigate(SCREEN_ROUTER.APPADD, {
                    screen: SCREEN_ROUTER_APP_ADD.REVENUEADD
                  });},
                  styles.ImgScreen
                )}
                {Line()}
                {ChildScreen(
                  images.ic_revenue,
                  R.string.UpdatePriceCalender,
                  images.ic_BackRight,
                  ()=>{NavigationUtil.navigate(SCREEN_ROUTER.APPADD, {
                    screen: SCREEN_ROUTER_APP_ADD.UPDATEPRICEADD
                  });},
                  [styles.ImgScreen,{height:26}]
                )}
                {Line()}
                {ChildScreen(
                  images.ic_ChangePass,
                  R.string.changepass,
                  images.ic_BackRight,
                  () => { NavigationUtil.navigate(SCREEN_ROUTER.APPADD, { screen: SCREEN_ROUTER_APP_ADD.CHANGEPASSADD }) },
                  styles.ImgScreen
                )}
                {Line()}
                {ChildScreen(
                  images.ic_Logout,
                  R.string.logout,
                  images.ic_BackRight,
                  () => { toggleModal() },
                  styles.ImgScreen
                )}
              </View>
              <ModalDrop
                toggleModal={toggleModal}
                isModalVisible={isModalVisible}
                onPress={() => {
                  toggleModal();
                  Logout();
                  NavigationUtil.navigate(SCREEN_ROUTER.SPLASH)
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
}

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
export default UserAddScreen