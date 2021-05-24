import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList
} from 'react-native'
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import Fire from '../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../constants/Constant';
import Reactotron from 'reactotron-react-native';
import { colors } from '../../constants/Theme';
import { firebase, database, Auth } from '../../firebase/firebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { DataMoney } from '../../constants/Mockup'
import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../utils/Constant';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                />
            <Text style={styles.TextHeader}>{R.string.putcalender}</Text>
        </TouchableOpacity>
    );
};
const RenderAvatar = (data) => {
    return (
        <SafeAreaView>
            <FastImage
                source={{ uri: data.Image }}
                style={styles.ContainerAvatar}
            />
        </SafeAreaView>
    )
}
const RenderInforStudio = (name,adress) => {
    return (
        <SafeAreaView>
            <Text>
                {name}
            </Text>
            <View style={{flexDirection:"row"}}>
                <View>
                    <FastImage
                    source={R.images.ic_PhoneNumber}
                    >

                    </FastImage>
                    <Text>
                        Liên Hệ
                    </Text>
                </View>

                <View>
                    <FastImage
                    source={R.images.ic_money}
                    >

                    </FastImage>
                    <Text>
                        {DataMoney.sale}
                    </Text>
                </View>
            </View>
            <View>
                <FastImage
                source={R.images.ic_adress}
                />
            <Text>
                {adress}
                </Text>
            </View>
        </SafeAreaView>
    )
}
const DetailPutCalendarScreen = ({ route, navigation }) => {
    const { data } = route.params;
    Reactotron.log("data", data)
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={<SafeAreaView>
                    {RenderAvatar(data)}
                    {RenderInforStudio(data.Name,data.Address+','+data.District+','+data.City)}
                </SafeAreaView>}
            />
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.backgroundColor },
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
        marginBottom: 5,
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
    ContainerLine: {
        borderWidth: 0.65,
        marginHorizontal: 24,
        borderColor: colors.line,
    },
    HeaderBack: { flexDirection: 'row', width: width },
    ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        marginTop: 5,
    },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    TextInfor: {
        fontSize: 15,
        fontFamily: R.fonts.bold
    },
    ImageChage: {
        height: 25,
        width: 30
    },
    SearchStyle: {
        width: width - 80,
        height: 35,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 15
    },
    TextSearch: { height: 35, width: width - 120 },
    HeaderSearch: {
        height: '100%',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageSearch: { height: 16, width: 16 },
    TextCancle: {
        fontFamily: R.fonts.regular,
        fontSize: 16,
        color: colors.white,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    ContainerItem: {
        height: 234,
        backgroundColor: colors.white,
        width: 180,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 8
    },
    ImgItem: { height: 146, width: 180 },
    StyleTextItem: { fontSize: 16, fontFamily: R.fonts.bold, color: colors.black },
    ContainerAvatar: {
        height: 221,
        width: width,
        backgroundColor:"red"
    }
});

export default DetailPutCalendarScreen;