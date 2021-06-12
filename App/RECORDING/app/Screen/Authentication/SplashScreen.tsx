import React, { useEffect } from 'react'
import { Text, View,StyleSheet,SafeAreaView,Image} from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER_AUTH,SCREEN_ROUTER_APP, SCREEN_ROUTER,SCREEN_ROUTER_APP_ADD } from '../../utils/Constant';
import {colors} from '../../constants/Theme'
import { Header } from "react-native-elements";
import {Auth} from '../../firebase/firebaseSvc';
import {ASYNC_STORAGE} from '../../constants/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import Images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
const SplashScreen = ({ navigation }) => {
    const checkUser =()=>{
        setTimeout(async () => {
            const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
            const Category =await  AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
            console.log("token",token);
            console.log("Category",Category)
            if (!token) {
              await AsyncStorage.setItem(ASYNC_STORAGE.TOKEN, '');
              NavigationUtil.navigate(SCREEN_ROUTER.APP,{screen:SCREEN_ROUTER_APP.INTRO});
            }
            else {
                Category==="0"?NavigationUtil.navigate(SCREEN_ROUTER.MAIN,{screen:SCREEN_ROUTER_APP.HOME}): NavigationUtil.navigate(SCREEN_ROUTER.MAIN_ADMIN,{screen:SCREEN_ROUTER_APP_ADD.MANYUSER});
            }
          }, 2000);
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            checkUser()
            Auth().onAuthStateChanged(user => {
              if (user) {
                console.log("state = definitely signed in")
              }
              else {
                console.log("state = definitely signed out")
              }
            })
          });
          return unsubscribe;
    },[navigation])
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