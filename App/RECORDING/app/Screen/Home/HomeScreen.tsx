import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,ScrollView, SafeAreaView, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
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
            <View style={styles.HeaderSearch}>
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
const Information = (label, Add, onPress) => {
    return (
        <View style={styles.ContainerInfor}>
            <Text style={[styles.TextSearch, { fontSize: 15, fontFamily: R.fonts.bold, color: colors.Sienna1, width: 200, marginRight: 75 }]}>
                {label}
            </Text>
            <TouchableOpacity
                onPress={onPress}
            >
                <Text style={[styles.TextSearch, { fontSize: 15, fontFamily: R.fonts.bold, color: colors.focus }]}>
                    {Add}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const RenderImage = ({ index, item }) => {
    return (
        <View>
            <FastImage
                style={styles.StyleList}
                source={item.img}
            />
        </View>
    )
}
const SliderBar = () => {
    return (
        <View style={styles.FontSlider}>
            <SwiperFlatList
                autoplay
                autoplayDelay={3}
                autoplayLoop
                data={Mockup.DataImage}
                index={0}
                renderItem={RenderImage}
                showPagination={true}
                paginationActiveColor={colors.Sienna1}
                paginationStyleItem={styles.NormalDot}
                paginationStyleItemActive={[styles.NormalDot, { height: 16, width: 16 }]}
                paginationStyleItemInactive={[styles.NormalDot, { backgroundColor: colors.Sienna1 }]}
            />
        </View>
    )
}
const RenderItemProduct = ({ index, item }) => {
    return (
        <View style={[styles.StyleProduct, { height: 164, width: 121, backgroundColor: colors.primary, marginHorizontal: 5, borderRadius: 7 }]}>
            <FastImage
                style={{ height: 89, width: 121, borderTopRightRadius: 7, borderTopLeftRadius: 7 }}
                source={item.img}
            />
            <View style={{ backgroundColor: colors.white, height: 76, padding: 5, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 }}>
                <Text style={[styles.TextSearch, { fontSize: 14, fontFamily: R.fonts.bold, color: colors.black, height: 36 }]}>
                    {item.name}
                </Text>
                <Text style={[styles.TextSearch, { fontSize: 12, fontFamily: R.fonts.bold, color: colors.Sienna1 }]}>
                    {item.price}+{" "}+VND
            </Text>
            </View>
        </View>
    )
}
const RenderItemPromotion = ({ index, item }) => {
    return (
        <View style={{ flexDirection: "row", marginHorizontal: 5, marginVertical: 5 }}>
            <FastImage
                style={{ height: 88, width: 88, borderRadius: 5 }}
                source={item.img}
            />
            <View>
                <View style={{ marginHorizontal: 5 }}>
                    <Text style={{fontSize:15,fontFamily:R.fonts.bold}}>
                        {item.name}
                    </Text>
                    <Text style={{ height: 32, width: 291,fontSize:11,fontFamily:R.fonts.bold, color:colors.focus }}>
                        {item.content}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <FastImage
                        style={{ height: 11.74, width: 11.87, marginHorizontal: 5, marginTop: 5 }}
                        source={image.ic_Date}
                    />
                    <Text>
                        {item.Date}
                    </Text>
                </View>
            </View>
        </View>
    )
}
const ListImage = () => {
    return (
        <View>
            <FlatList
                data={Mockup.DataImageProduct}
                keyExtractor={(item, index) => { item.ID }}
                showsHorizontalScrollIndicator={false}
                renderItem={RenderItemProduct}
                horizontal={true}
            />
        </View>
    )
}
const ListPromotion = () => {
    return (
        <ScrollView
         showsVerticalScrollIndicator={false}
        >
            <FlatList
                data={Mockup.DataPromotion}
                keyExtractor={(item, index) => { item.ID }}
                renderItem={RenderItemPromotion}
            />
        </ScrollView>
    )
}
const HomeScreen = () => {
    useEffect(() => {
        console.log(Mockup.DataImage);
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <Header
                containerStyle={styles.HeaderStyle}
                centerComponent={Search()}
                statusBarProps={styles.HeaderStyle}
            />
            <View style={{flex:1}}>
                {SliderBar()}
                {Information('SẢN PHẨM', 'Xem thêm >>')}
                {ListImage()}
                {Information('KHUYẾN MẠI', 'Xem thêm >>')}
                {ListPromotion()}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.primary
    },
    HeaderStyle: {
        backgroundColor: colors.Sienna1
    },
    SearchStyle: {
        width: 303,
        height: 31,
        backgroundColor: colors.white,
        flexDirection: "row",
        borderRadius: 5
    },
    TextSearch: {
        fontSize: 20,
        fontFamily: R.fonts.regular
    },
    HeaderSearch: {
        height: "100%",
        width: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    ImageSearch: {
        height: 16,
        width: 16,
    },
    StyleList: {
        width: width - 10,
        height: 170,
        borderRadius: 7,
        marginHorizontal: 5
    },
    FontSlider: {
        backgroundColor: colors.Sienna1,
        borderBottomRightRadius: 140,
        borderBottomLeftRadius: 140
    },
    NormalDot: {
        height: 12,
        width: 12,
        borderRadius: 12,
        backgroundColor: colors.Sienna1,
        marginHorizontal: 4
    },
    StyleProduct: {
        width: width - 10,
        height: 76,
        borderRadius: 5,
        backgroundColor: colors.white
    },
    ContainerInfor: {
        height: 30,
        flexDirection: "row",
        //backgroundColor:"green",
        marginHorizontal: 10,
    },
})
export default HomeScreen;