import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {colors} from '../constants/Theme'
import images from '../assets/imagesAsset';
import NavigationUtil from './NavigationUtil';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackAuth from '../navigation/stack/StackAuth';
import StackApp from '../navigation/stack/StackApp';
import SplashScreen from '../Screen/Authentication/SplashScreen';
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP,SCREEN_ROUTER} from '../utils/Constant';

const { HOME,PRODUCT,PUTCALENDAR,NOTIFY,USER } = SCREEN_ROUTER_APP
const { LOGIN,REGISTER,FORGOT_PASS } = SCREEN_ROUTER_AUTH
const Stack = createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ButtonTab =()=>{
  return(
    <Tab.Navigator>
       <Tab.Screen
        name={SCREEN_ROUTER_APP.HOME} 
        component={StackApp[HOME]}
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
              children={"Trang chủ"}
              style={{color:tintColor}}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PRODUCT} 
        component={StackApp[PRODUCT]}
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
              children={"Sản phẩm"}
              style={{color:tintColor}}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PUTCALENDAR} 
        component={StackApp[PUTCALENDAR]}
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
              children={"Đặt lịch"}
              style={{color:tintColor}}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.NOTIFY} 
        component={StackApp[NOTIFY]}
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
              children={"Thông báo"}
              style={{color:tintColor}}
              />
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.USER} 
        component={StackApp[USER]}
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
              children={"Tài khoản"}
              style={{color:tintColor}}
              />
            )
          }
        }}
       />
    </Tab.Navigator>
  )
}
const authStackScreen = () => {
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
          name={SCREEN_ROUTER.AUTH} component={authStackScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainTab;