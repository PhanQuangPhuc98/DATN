
import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationUtil from './NavigationUtil'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StackAuth from '../navigation/stack/StackAuth'
import StackApp from '../navigation/stack/StackApp'
import SplashScreen from '../Screen/Authentication/SplashScreen'
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
            return(
              <View>
                
              </View>
            )
          }
        }}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PRODUCT} component={StackApp[PRODUCT]}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.PUTCALENDAR} component={StackApp[PUTCALENDAR]}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.NOTIFY} component={StackApp[NOTIFY]}
       />
       <Tab.Screen
        name={SCREEN_ROUTER_APP.USER} component={StackApp[USER]}
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