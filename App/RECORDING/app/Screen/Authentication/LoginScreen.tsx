import React, { useEffect, useState } from 'react'
import { Text, SafeAreaView, StyleSheet, TextInput, Platform, View, Button, TouchableOpacity, Dimensions } from 'react-native'
import { Header } from "react-native-elements";
import NavigationUtil from '../../navigation/NavigationUtil'
import { colors } from '../../constants/Theme';
import R from '../../assets/R'
import Reactotron from 'reactotron-react-native'
import image from '../../assets/imagesAsset';
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth'
const { height, width } = Dimensions.get("window");
const Infor = (UserInput, Pass, onPress) => {
    return (
        <View>
            <TextInput
                style={styles.TextInputStyle}
                onChangeText={UserInput}
                placeholder={R.string.AccountEmail}
                placeholderTextColor={colors.focus}
            // value={value}
            />
            <TextInput
                style={styles.TextInputStyle}
                onChangeText={Pass}
                placeholder={R.string.pass}
                placeholderTextColor={colors.focus}
                secureTextEntry={true}
            />
            <TouchableOpacity onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER_AUTH.FORGOT_PASS) }}>
                <Text style={styles.ForgotPass}>Quên mật khẩu?</Text>
            </TouchableOpacity>
        </View>
    )
}
const Confirm = (onPress) => {
    return (
        <View>
            <TouchableOpacity
                onPress={onPress}
                style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.log_in}</Text>
            </TouchableOpacity>
            <View style={styles.ContainerRegister}>
                <Text style={[styles.TextConfirm, { color: colors.focus }]}>Chưa có tài khoản?</Text>
                <TouchableOpacity onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER_AUTH.REGISTER) }}>
                    <Text style={[styles.TextConfirm, { color: colors.Sienna1, marginLeft: 3 }]}>Đăng ký</Text></TouchableOpacity>
            </View>
        </View>
    )
}
const Line = () => {
    return (
        <View style={styles.v_container_line}>
            <View style={[styles.line, { marginLeft: 27 }]} />
            <Text style={[styles.TextConfirm, { color: colors.focus, marginHorizontal: 14 }]}>hoặc</Text>
            <View style={[styles.line, { marginRight: 27 }]} />
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
const LoginScreen = ({navigation}) => {
    const [isLoading, setLoading] = useState(true);
    const [confirm, setConfirm] = useState(null);
    const [token, setToken] = useState(null);
    const [code, setCode] = useState('');
    const [Username, setUsername] = useState('admin');
    const [Pass, setPass] = useState('123');
    // useEffect(() => {
    //     signInWithEmail();
    // }, [])
    const signInWithEmail = async () => {
        isLoading
        const res = await auth().signInWithEmailAndPassword(Username, Pass);
        try {
            setLoading(false),
              setToken(res),
              await AsyncStorage.setItem('key', JSON.stringify(res.user.uid));
                setTimeout(() => {
                     !token
                       ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN, {
                           data: 'hello',
                         })
                       : alert(R.string.pleaseLogin);
                }, 500);
           
            Reactotron.log('res', res.user.uid),
                alert('data')
        } catch (error) {
            setLoading(true),
                Reactotron.log('error', error)
        };


    }
    // console.log('user', Username);
    // console.log('pass', Pass);

    return (
        <SafeAreaView style={styles.Container}>
            <Header
                containerStyle={styles.ContainerHeader}
                leftComponent={<TouchableOpacity style={styles.LeftHeader} onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER.MAIN) }}>
                    <FastImage source={image.ic_back} style={styles.ImageBack} resizeMode="contain" />
                    <Text style={styles.TextLeft}>{R.string.log_in}</Text>
                </TouchableOpacity>}
                statusBarProps={styles.ContainerHeader}
            />
            <View style={styles.ContainerLogo}><FastImage source={image.ic_Splash} style={styles.ImageLogo} resizeMode="contain" /></View>
            <View style={styles.ContainerInput}>{Infor(user => setUsername(user), pass => setPass(pass), null)}</View>
            {Confirm(() => signInWithEmail())}
            {Line()}
            {Logo()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.white, alignItems: "center" },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    LeftHeader: { flexDirection: "row", width: 200, height: 40 },
    ImageBack: { height: 14, width: 14, marginTop: 10 },
    TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
    ContainerLogo: { alignItems: "center", paddingHorizontal: 50, paddingVertical: 20 },
    ContainerInput: { alignItems: "center" },
    ImageLogo: { height: 210, width: 395 },
    TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus, marginVertical: 10 },
    ForgotPass: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, marginLeft: 220 },
    ContainerConfirm: {
        height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 330,
        alignItems: "center", justifyContent: "center", marginVertical: 20, marginHorizontal: 20
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    ContainerRegister: { flexDirection: "row", paddingHorizontal: 75 },
    v_container_line: { marginTop: '5%', flexDirection: 'row', alignItems: 'center' },
    line: { height: 1, backgroundColor: colors.line, flex: 1 },
    StyleLogo: { height: 66, width: 65 }
});
export default LoginScreen;