import React, { useState } from 'react';
import { Text, View, Image, Button,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {colors} from '../constants/Theme'
import images from '../assets/imagesAsset';
import NavigationUtil from './NavigationUtil';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackBottom from './stack/StackBottom'
import StackAuth from './stack/StackAuth';
import StackApp from './stack/StackApp';
import SplashScreen from '../Screen/Authentication/SplashScreen';
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP,SCREEN_ROUTER} from '../utils/Constant';
import R from '../assets/R'

const {
  HOME,
  PRODUCT,
  PUTCALENDAR,
  NOTIFY,
  USER,
  SEARCH,
  CHAT,
} = SCREEN_ROUTER_APP;
const { LOGIN,REGISTER,FORGOT_PASS } = SCREEN_ROUTER_AUTH
const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ButtonTab =()=>{
  return(
    <Tab.Navigator>
       <Tab.Screen
        name={SCREEN_ROUTER_APP.HOME} 
        component={StackBottom[HOME]}
        options={{
          tabBarIcon:({focused,color, size})=>{
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <View>
                <Image 
                source={images.ic_Home}
                style={{width:sizeIcon,height:sizeIcon,tintColor:tintColor,resizeMode:"contain"}}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel:({focused, color})=>{
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <Text
              children={R.string.home}
              style={[styles.LableTabButon,{color:tintColor}]}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PRODUCT} 
        component={StackBottom[PRODUCT]}
        options={{
          tabBarIcon:({focused,color, size})=>{
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <View>
                <Image 
                source={images.ic_Product}
                style={{width:sizeIcon,height:sizeIcon,tintColor:tintColor,resizeMode:"contain"}}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel:({focused, color})=>{
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <Text
              children={R.string.product}
              style={[styles.LableTabButon,{color:tintColor}]}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PUTCALENDAR} 
        component={StackBottom[PUTCALENDAR]}
        options={{
          tabBarIcon:({focused,color, size})=>{
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <View>
                <Image 
                source={images.ic_PutCalender}
                style={{width:sizeIcon,height:sizeIcon,tintColor:tintColor,resizeMode:"contain"}}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel:({focused, color})=>{
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <Text
              children={R.string.putcalender}
              style={[styles.LableTabButon,{color:tintColor}]}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.NOTIFY} 
        component={StackBottom[NOTIFY]}
        options={{
          tabBarIcon:({focused,color, size})=>{
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <View>
                <Image 
                source={images.ic_Notification}
                style={{width:sizeIcon,height:sizeIcon,tintColor:tintColor,resizeMode:"contain"}}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel:({focused, color})=>{
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <Text
              children={R.string.notification}
              style={[styles.LableTabButon,{color:tintColor}]}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.USER} 
        component={StackBottom[USER]}
        options={{
          tabBarIcon:({focused,color, size})=>{
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <View>
                <Image 
                source={images.ic_User}
                style={{width:sizeIcon,height:sizeIcon,tintColor:tintColor,resizeMode:"contain"}}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel:({focused, color})=>{
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return(
              <Text
              children={R.string.user}
              style={[styles.LableTabButon,{color:tintColor}]}
              />
            )
          }
        }}
       />
    </Tab.Navigator>
  )
}
const AuthStackScreen = () => {
    return (
      <AuthStack.Navigator
        headerMode='none'>
        <AuthStack.Screen  
         name={SCREEN_ROUTER_AUTH.LOGIN} component={StackAuth[LOGIN]}
          />
        <AuthStack.Screen  
         name={SCREEN_ROUTER_AUTH.REGISTER} component={StackAuth[REGISTER]}
          />
        <AuthStack.Screen  
         name={SCREEN_ROUTER_AUTH.FORGOT_PASS} component={StackAuth[FORGOT_PASS]}
          />

      </AuthStack.Navigator>
    );
  };
const App=()=>{
  return (
    <AppStack.Navigator headerMode="none">
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.HOME}
        component={StackApp[HOME]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.PRODUCT}
        component={StackApp[PRODUCT]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.PUTCALENDAR}
        component={StackApp[PUTCALENDAR]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.NOTIFY}
        component={StackApp[NOTIFY]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.USER}
        component={StackApp[USER]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.SEARCH}
        component={StackApp[SEARCH]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.CHAT}
        component={StackApp[CHAT]}
      />
    </AppStack.Navigator>
  );
}
const MainTab = () => {
  const [isSigned, setSigned] = useState(false);
  return (
    <NavigationContainer ref={ref => NavigationUtil.setTopLevelNavigator(ref)}>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen
          name={SCREEN_ROUTER.SPLASH} component={SplashScreen}
        />
        <Stack.Screen
          name={SCREEN_ROUTER.MAIN} component={ButtonTab}
        />
        <Stack.Screen
          name={SCREEN_ROUTER.AUTH} component={AuthStackScreen}
        /> 
        <Stack.Screen
          name={SCREEN_ROUTER.APP} component={App}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  LableTabButon:{fontSize:11, fontFamily:R.fonts.bold}
})
export default MainTab;