import React, { useState,useEffect } from 'react'
import { Text, View, Button, StyleSheet, SafeAreaView, TouchableOpacity, Image,Dimensions } from 'react-native';
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import fonts from '../../assets/fontsAsset';
import { Header } from "react-native-elements";
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import Mockup from '../../constants/Mockup';
const { height, width } = Dimensions.get("window");
const Search = () => {
    return (
        <TouchableOpacity
            style={styles.SearchStyle}
            onPress={() => {
            }}
        >
            <View style={styles.HeaderSerach}>
                <FastImage
                    style={styles.ImageSearch}
                    source={image.ic_Search}
                    resizeMode={FastImage.resizeMode.contain}
                />
            </View>
            <Text style={styles.TextSearch}>
                Tìm kiếm sản phẩm
            </Text>
        </TouchableOpacity>
    )
}
const RenderImage=({index, item})=>{
    return(
        <View>
            <FastImage
             style={styles.StyleList}
             source={item.img}
             resizeMode={FastImage.resizeMode.contain}
            />
        </View>
    )
}
const SliderBar=()=>{
    return(
        <View>
            <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            data={Mockup.DataImage}
            renderItem={RenderImage}
            />
        </View>
    )
}
const HomeScreen = () => {
    useEffect(()=>{
         console.log(Mockup.DataImage);
         
    },[])
    return (
        <SafeAreaView style={styles.Container}>
            <Header
                containerStyle={styles.HeaderStyle}
                centerComponent={Search}
                statusBarProps={styles.HeaderStyle}
            />
            <View>
            <SwiperFlatList
            autoplay
            autoplayDelay={3}
            autoplayLoop
            data={Mockup.DataImage}
            renderItem={RenderImage}
            />
                <Text>
                    Hello
               </Text>
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        //backgroundColor: 'green'
    },
    HeaderStyle: {
        backgroundColor: colors.Sienna1
    },
    SearchStyle: {
        width: 303,
        height: 31,
        backgroundColor: colors.white,
        flexDirection: "row",
        borderRadius:5
    },
    TextSearch: {
        fontSize: 20,
        fontFamily: R.fonts.regular
    },
    HeaderSerach:{
        height:"100%",
        width:30,
        alignItems:"center",
        justifyContent:"center"
    },
    ImageSearch: {
        height: 16,
        width: 16,
    },
    StyleList:{
       width: width,
       height: width / 2.5
    }
})
export default HomeScreen;