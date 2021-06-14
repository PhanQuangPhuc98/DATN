import React, { useState, useEffect } from 'react';
import { Text, View, Button, SafeAreaView, StyleSheet, TouchableOpacity, Dimensions, ActivityIndicator, Platform } from 'react-native';
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
import { showMessages } from '../../../utils/AlertHelper'
import Fire from '../../../firebase/firebaseSvc';
import { firebase, database, Auth } from '../../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../../constants/Constant';
import ScreenComponent from '../../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import images from '../../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import ModalDrop from '../../../components/ModalDrop'
import { TextInput } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.UpdatePriceCalender}</Text>
        </TouchableOpacity>
    );
};
const Confirm = (onPress) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
            </TouchableOpacity>
        </View>
    );
};
const RenderChangePrice = (lable, value, onChangeText) => {
    return (
        <SafeAreaView>
            <Text style={styles.TextLable}>
                {lable}
            </Text>
            <TextInput
                style={styles.TextInputStyle}
                value={value}
                onChangeText={onChangeText}
            />
        </SafeAreaView>
    )
}
const UpdatePricePutCalendarScreen = () => {
    const [price, setPrice] = useState({
        newPrice: '0',
        oldPrice: '0',
        SalesPromotion: '0%'
    })
    const [loading, setLoading] = useState(false)
    const DB = database();
    const UpdatePriceUser =()=>{
        setLoading(true)
        setTimeout(() => {
            try {
                setLoading(false)
                DB
                .ref(`/users/${Fire.uid}`)
                .update({ newPrice:price.newPrice,oldPrice:price.oldPrice})
                showMessages(R.string.notification, R.string.Update_Sucess);
                NavigationUtil.goBack()
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }, 1000)

    }
    const callPrice = () => {
        setLoading(true)
        setTimeout(() => {
            try {
                setLoading(false)
                DB
                    .ref(`/PriceStudio/${Fire.uid}`)
                    .on("value", snap => {
                        const { oldPrice, newPrice, SalesPromotion } = snap.val()
                        setPrice({
                            ...price,
                            newPrice: newPrice,
                            oldPrice: oldPrice,
                            SalesPromotion: SalesPromotion + "%"
                        })
                    })
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }, 1000)

    }
    const updatePrice = () => {
        setLoading(true)
        setTimeout(() => {
            try {
                setLoading(false)
                DB
                    .ref(`/PriceStudio/${Fire.uid}`)
                    .update({
                        newPrice: price.newPrice,
                        oldPrice: price.oldPrice,
                        SalesPromotion: price.SalesPromotion
                    })
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        },1000)

    }
    useEffect(() => {
        callPrice()
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <SafeAreaView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
                        {RenderChangePrice(R.string.Old_price, price.oldPrice, oldPrice => { setPrice({ ...price, oldPrice: oldPrice }) })}
                        {RenderChangePrice(R.string.New_Price, price.newPrice, newPrice => { setPrice({ ...price, newPrice: newPrice }) })}
                        {/* {RenderChangePrice(R.string.Sales_Promotion, price.SalesPromotion, SalesPromotion => { setPrice({ ...price, SalesPromotion: SalesPromotion }) })} */}
                        {loading ? <ActivityIndicator size="small" color={R.color.colors.Sienna1} /> :

                            Confirm(() => {
                                if (!price.oldPrice.trim().length) {
                                    showMessages(R.string.notification, 'Vui lòng nhập giá cũ !');
                                    return;
                                }
                                if (!price.newPrice.trim().length) {
                                    showMessages(R.string.notification, 'Vui lòng nhập giá mới !');
                                    return;
                                }
                                if (!price.SalesPromotion.trim().length) {
                                    showMessages(R.string.notification, 'Vui lòng nhập khuyến mại !');
                                    return;
                                }
                                updatePrice()
                                UpdatePriceUser()
                            })

                        }
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1 },
    ContainerScreen: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 24,
        paddingVertical: 10,
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
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.black, },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    ContainerConfirm: {
        height: 46,
        backgroundColor: colors.Sienna1,
        borderRadius: 30,
        width: width - 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60,
    },
    TextInputStyle: { borderBottomWidth: 0.5, width: width - 50, borderColor: colors.focus, height: 40, marginVertical: 10 },
});
export default UpdatePricePutCalendarScreen
