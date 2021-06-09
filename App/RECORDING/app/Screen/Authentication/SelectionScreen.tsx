import React, { useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native'
import { Header, CheckBox } from "react-native-elements";
import FastImage from 'react-native-fast-image';import NavigationUtil from '../../navigation/NavigationUtil';
import Reactotron from 'reactotron-react-native';
import {
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '../../utils/Constant';
import ScreenComponent from '../../components/ScreenComponent';
import R from '../../assets/R';
import { colors } from '../../constants/Theme';
import {ASYNC_STORAGE} from '../../constants/Constant';
import AsyncStorage from '@react-native-community/async-storage';
const Confirm = (onPress) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
            </TouchableOpacity>
        </View>
    );
};
const RenderImageLogo = () => {
    return (
        <View style={styles.ContainerLogo}>
            <FastImage
                style={styles.ImageLogo}
                source={R.images.ic_Splash}
                resizeMode="contain"
            >

            </FastImage>
        </View>

    )
}
const SelectionScreen = () => {
    const [checked, setChecked] = useState(false);
    const [payload, setPayload] = useState({
        id: '0',
    })
    console.log("Category",payload.id);
    
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <View style={[styles.Container,{paddingHorizontal:10}]}>
                        {RenderImageLogo()}
                        < Text style={styles.TextIntro}>{R.string.Intro}</Text>
                        <View style={styles.CotainerCheck}>
                            <CheckBox
                                title='Phòng thu'
                                containerStyle={{ backgroundColor: "white" }}
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
                                containerStyle={{ backgroundColor: "white" }}
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
                        {Confirm(async()=>{
                            payload.id==="0"?NavigationUtil.navigate(SCREEN_ROUTER.MAIN,{
                                screen:SCREEN_ROUTER_APP.HOME}):
                                NavigationUtil.navigate(SCREEN_ROUTER.AUTH)
                                await AsyncStorage.setItem(
                                    ASYNC_STORAGE.CATEGORY,
                                    payload.id,
                                  );
                        })}
                    </View>
                }
            />
        </SafeAreaView >
    )
}

export default SelectionScreen

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: R.color.colors.white,
    },
    TextIntro: {
        fontFamily: R.fonts.bold,
        fontSize: 14,
        textAlign: "center"
    },
    CotainerCheck: {
        flexDirection: "row", backgroundColor: 'white', paddingVertical: 25,paddingHorizontal:30
    },
    ContainerConfirm: {
        height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 293,
        alignItems: "center", justifyContent: "center", marginVertical: 60, marginHorizontal: 45
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    ImageLogo: { height: 222, width: 311 },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    ContainerLogo: { alignItems: "center", paddingVertical: 50 },
})