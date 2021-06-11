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
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.user}</Text>
        </TouchableOpacity>
    );
};
const personal = (name, phone) => {
    return (
        <View style={styles.HeaderPerson}>
            <Avatar
                size={56}
                avatarStyle={styles.AvatarStyle}
                source={images.img_Avatar}>
            </Avatar>
            <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
                <Text style={styles.TextName}>
                    {name ? name : "Phan Quang Phúc"}
                </Text>
                <Text style={[styles.TextName, { fontSize: 14, color: colors.focus }]}>
                    {phone ? phone : "0965630621"}
                </Text>

            </View>
        </View>
    );
};
const renderInfor = (lable, infor) => {
    return (
      <SafeAreaView style={{ flexDirection: "row", paddingHorizontal: 20, paddingVertical: 10,backgroundColor:R.color.colors.white }}>
        <View style={{borderBottomWidth:0.5, flex:1,paddingVertical: 10}}>
        <View style={{flex:1}}>
          <Text style={[styles.TextInfor,{color:R.color.colors.focus}]}>
            {lable}
          </Text>
        </View>
        <View style={{flexDirection:"row-reverse"}}>
          <Text style={[styles.TextInfor,{color:R.color.colors.black}]}>
            {infor?infor:R.string.Not_Update}
          </Text>
        </View>
        </View>
      </SafeAreaView>
    )
  }
const DetailUserScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: R.color.colors.brown }}>
            <ScreenComponent
                leftComponent={Back(()=>NavigationUtil.goBack())}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                chilStyle={{ backgroundColor: R.color.colors.brown }}
                children={
                    <SafeAreaView>
                        {personal()}
                        <Text style={{ borderBottomWidth: 0.7, backgroundColor: R.color.colors.white, textAlign: 'center',color:R.color.colors.Sienna1, height:30,paddingVertical:5}}>
                            {R.string.InforUser}
                        </Text>
                        {renderInfor(R.string.name )}
                        {renderInfor(R.string.phone)}
                        {renderInfor(R.string.email)}
                        {renderInfor(R.string.city)}
                        {renderInfor(R.string.District)}
                        {renderInfor(R.string.Address)}
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
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
    ContainerLine: { borderWidth: 0.65, marginHorizontal: 24, borderColor: colors.line },
    HeaderBack: { flexDirection: 'row', width: width },
    ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        marginTop: 5,
    },
    TextInfor: {
        fontSize: 14,
        fontFamily: R.fonts.bold,
        color: colors.focus,

    }
});
export default DetailUserScreen
