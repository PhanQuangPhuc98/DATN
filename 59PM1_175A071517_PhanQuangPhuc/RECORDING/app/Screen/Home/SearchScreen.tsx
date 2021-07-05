import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, FlatList, TextInput } from 'react-native';
import { Header } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import { DEFAULT_PARAMS } from '../../constants/Constant'
import NavigationUtil from '../../navigation/NavigationUtil'
import Reactotron from 'reactotron-react-native'
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
import { showConfirm } from '../../utils/AlertHelper'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { DataSearch } from '../../constants/Mockup';
const { height, width } = Dimensions.get("window");
const Search = (onChangeText, placeholder) => {
    return (
        <View
            style={styles.SearchStyle}
        >
            <View style={styles.HeaderSearch}>
                <FastImage
                    style={styles.ImageSearch}
                    source={image.ic_Search}
                    resizeMode="contain"
                />
            </View>
            <TextInput
                textAlign="center"
                style={[styles.TextSearch]}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.focus}
            >

            </TextInput>
        </View>
    )
}
const Cancle = () => {
    return (
        <TouchableOpacity
            onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER.MAIN) }}
        >
            <Text style={styles.TextCancle}>
                {R.string.cancle}
            </Text>
        </TouchableOpacity>
    )
}
const Item = ({ index, item }) => {
    return (
        <TouchableOpacity style={styles.ContainerItem}>
            <FastImage
                source={item.img}
                style={styles.ImgItem}
                resizeMode="contain"
            />
            <View>
                <Text style={[styles.StyleTextItem,{color:colors.black}]}>
                    {item.name}
                </Text>
            </View>
            <Text style={[styles.StyleTextItem, { color: colors.Sienna1, marginLeft:10 }]}>
                {item.price} VND
            </Text>
        </TouchableOpacity>
    )

}
const RenderItem = (data) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => { item.ID_Search }}
                showsVerticalScrollIndicator={false}
                renderItem={Item}
                horizontal={false}
                numColumns={2}
            />
        </View>
    )
}
const SearchScreen = () => {
    const [payload, setPayload] = useState({
        Search: DEFAULT_PARAMS.SEARCH,
        Fulldata: DataSearch,
        data: DataSearch
    })

    const handleSearch = (search) => {
        const formatText = search.toLowerCase();
        console.log(formatText);
        setTimeout(() => {
            setPayload({
                ...payload,
                data: payload.Fulldata.filter(item =>
                    // item.name.toLowerCase().includes(formatText)
                    // console.log(item.name.toLowerCase().includes(formatText));
                    item.name ? item.name.toLowerCase().includes(formatText) : item
                )
            })
        }, 500);
    }
    // console.log(payload.data);
    //   useEffect(()=>{

    // },[])
    console.log("data", payload.data);
    return (
        <SafeAreaView>
            <Header
                containerStyle={styles.HeaderStyle}
                statusBarProps={styles.HeaderStyle}
                centerComponent={Search(handleSearch, R.string.search)}
                rightComponent={Cancle()}
            />
            {RenderItem(payload.data)}

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
  HeaderStyle: {backgroundColor: colors.Sienna1},
  SearchStyle: {
    width: 303,
    height: 44,
    backgroundColor: colors.white,
    flexDirection: 'row',
    borderRadius: 5,
    marginRight: 40,
  },
  TextSearch: {height: 40},
  HeaderSearch: {
    height: '100%',
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ImageSearch: {height: 16, width: 16},
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
    marginLeft: 10,
    marginVertical: 5,
  },
  ImgItem: {height: 146, width: 180},
  StyleTextItem: {fontSize: 16, fontFamily: R.fonts.bold, color: colors.black},
});
export default SearchScreen;