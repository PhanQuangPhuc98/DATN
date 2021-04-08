import React, { useEffect } from 'react'
import { Text, View,StyleSheet,SafeAreaView,Image} from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER_AUTH,SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../utils/Constant';
import {colors} from '../../constants/Theme'
import { Header } from "react-native-elements";
import Images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
const SplashScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            NavigationUtil.navigate(SCREEN_ROUTER.MAIN);
        }, 2000);
    },[])
    return (
        <SafeAreaView style={styles.Container}>
             <Header containerStyle={styles.HeaderContainer} statusBarProps={styles.StatusBar}/>
            <View style={styles.BoderSplash}>
                <FastImage style={styles.ImgSplash}  source={Images.ic_Splash} resizeMode="contain"/>
            </View>
            <View style={styles.BoderText}>
               <Text style={styles.TextSplash}> RECORDING STUDIO </Text>
            </View>
        </SafeAreaView>
    )
}
const styles=StyleSheet.create({
    HeaderContainer:{
        backgroundColor:colors.Sienna1
    },
    StatusBar:{
        backgroundColor:colors.Sienna1
    },
    Container:{
        flex:1,
        backgroundColor:"#FFFFFF",
        alignItems:"center", 
    },
    BoderSplash:{
        marginTop:180,
        marginHorizontal:50, 
    },
    ImgSplash:{
        height:300,
        width:350,
    },
    BoderText:{
        marginTop:30,        
    },
    TextSplash:{
       fontSize:32,
       fontWeight:"bold",
       color:colors.Sienna1
    }
});
export default SplashScreen