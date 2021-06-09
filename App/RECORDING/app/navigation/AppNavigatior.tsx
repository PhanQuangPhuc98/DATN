import React, { useState,useEffect } from 'react';
import { Text, View, Image, Button, StyleSheet, Platform, Dimensions, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { colors } from '../constants/Theme'
import images from '../assets/imagesAsset';
import NavigationUtil from './NavigationUtil';
import { createBottomTabNavigator, BottomTabBar } from '@react-navigation/bottom-tabs';
import StackBottom from './stack/StackBottom'
import StackAuth from './stack/StackAuth';
import AsyncStorage from '@react-native-community/async-storage';
import { showConfirm } from '../utils/AlertHelper'
import { ASYNC_STORAGE,DEFAULT_PARAMS } from '../constants/Constant'
import Reactotron from 'reactotron-react-native';
import StackApp from './stack/StackApp';
import StackAdd from './stack/StackAdd';
import SplashScreen from '../Screen/Authentication/SplashScreen';
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP, SCREEN_ROUTER,SCREEN_ROUTER_APP_ADD } from '../utils/Constant';
import R from '../assets/R'
const dimension = Dimensions.get('window');
const { width, height } = dimension;
const {
  HOME,
  PRODUCT,
  PUTCALENDAR,
  NOTIFY,
  USER,
  SEARCH,
  CHAT,
  CHANGEPASS,
  INFORUSER,
  LISTCHAT,
  ADPOST,
  UPDATEUSER,
  DETAILPUTCALENDAR,
  MAP,
  INTRO
} = SCREEN_ROUTER_APP;
const {
  CHANGEPASSADD,
  CHATADD,
  DETAILUSER,
  INFORUSERADD,
  LISTCHATADD,
  MANYUSER,
  NOTIFICATION,
  REVENUEADD,
  REVENUEADDMONTH,
  UPDATEINTROADD,
  UPDATEPRICEADD,
  UPDATEUSERADD,
  USERADD
} = SCREEN_ROUTER_APP_ADD;
const { LOGIN, REGISTER, FORGOT_PASS } = SCREEN_ROUTER_AUTH
const Stack = createStackNavigator();
const AppStack = createStackNavigator();
const AppAddStack =createStackNavigator();
const AuthStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ButtonTab = () => {
  const [category,setCategory]=useState({
    id:''
  })
  const DB = async()=>{
    let Category =await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
    setCategory({
      ...category,
      id:Category
    })
   console.log("Category1",Category);
   console.log("Category2",category.id);
  }
  useEffect(() => {
    DB()
  }, [])
 
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar
          {...props}
          style={{
            ...props.style,
            height: Platform.OS != 'ios' ? height * 0.08 : height * 0.1
          }}
        />
      )}
      tabBarOptions={{
        tabStyle: { paddingHorizontal: 10, height: 50 }
      }}
    >
      <Tab.Screen
        name={category.id==='0'?SCREEN_ROUTER_APP.HOME:SCREEN_ROUTER_APP_ADD.MANYUSER}
        component={category.id==='0'?StackBottom[HOME]:StackBottom[USERADD]}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <View>
                <Image
                  source={images.ic_Home}
                  style={{ width: sizeIcon, height: sizeIcon, tintColor: tintColor, resizeMode: "contain" }}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel: ({ focused, color }) => {
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <Text
                children={R.string.home}
                style={[styles.LableTabButon, { color: tintColor }]}
              />
            )
          }

        }}

      />
      <Tab.Screen
        name={category.id==='0'?SCREEN_ROUTER_APP.PRODUCT:null}
        component={category.id==='0'?StackBottom[PRODUCT]:null}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <View>
                <Image
                  source={images.ic_Product}
                  style={{ width: sizeIcon, height: sizeIcon, tintColor: tintColor, resizeMode: "contain" }}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel: ({ focused, color }) => {
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <Text
                children={R.string.product}
                style={[styles.LableTabButon, { color: tintColor }]}
              />
            )
          },
          tabBarButton: buttonProps => {
            return (
              <TouchableOpacity
                {...buttonProps}
                onPress={async e => {
                  const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
                  if (!token) {
                    showConfirm(
                      R.string.notification,
                      'Vui lòng đăng nhập để thực hiện chức năng này',
                      () =>
                        NavigationUtil.navigate(SCREEN_ROUTER.AUTH, {
                          screen: SCREEN_ROUTER_AUTH.LOGIN,
                        }),
                      null,
                      'Đăng nhập',
                    );
                    return;
                   
                  }
                  buttonProps.onPress(e);
                }
                }
              />
            )
          }
        }}
      />
      <Tab.Screen
        name={category.id==='0'?SCREEN_ROUTER_APP.PUTCALENDAR:SCREEN_ROUTER_APP_ADD.LISTCHATADD}
        component={category.id==='0'?StackBottom[PUTCALENDAR]:StackBottom[LISTCHATADD]}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <View>
                <Image
                  source={images.ic_PutCalender}
                  style={{ width: sizeIcon, height: sizeIcon, tintColor: tintColor, resizeMode: "contain" }}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel: ({ focused, color }) => {
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <Text
                children={R.string.putcalender}
                style={[styles.LableTabButon, { color: tintColor }]}
              />
            )
          },
          tabBarButton: buttonProps => {
            return (
              <TouchableOpacity
                {...buttonProps}
                onPress={async e => {
                  const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
                  if (!token) {
                    showConfirm(
                      R.string.notification,
                      'Vui lòng đăng nhập để thực hiện chức năng này',
                      () =>
                        NavigationUtil.navigate(SCREEN_ROUTER.AUTH, {
                          screen: SCREEN_ROUTER_AUTH.LOGIN,
                        }),
                      null,
                      'Đăng nhập',
                    );
                    return;
                   
                  }
                  buttonProps.onPress(e);
                }
                }
              />
            )
          }
        }}
      />
      <Tab.Screen
        name={category.id==='0'?SCREEN_ROUTER_APP.NOTIFY:SCREEN_ROUTER_APP_ADD.NOTIFICATION}
        component={category.id==='0'?StackBottom[NOTIFY]:StackBottom[NOTIFICATION]}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <View>
                <Image
                  source={images.ic_Notification}
                  style={{ width: sizeIcon, height: sizeIcon, tintColor: tintColor, resizeMode: "contain" }}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel: ({ focused, color }) => {
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <Text
                children={R.string.notification}
                style={[styles.LableTabButon, { color: tintColor }]}
              />
            )
          },
          tabBarButton: buttonProps => {
            return (
              <TouchableOpacity
                {...buttonProps}
                onPress={async e => {
                  const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
                  if (!token) {
                    showConfirm(
                      R.string.notification,
                      'Vui lòng đăng nhập để thực hiện chức năng này',
                      () =>
                        NavigationUtil.navigate(SCREEN_ROUTER.AUTH, {
                          screen: SCREEN_ROUTER_AUTH.LOGIN,
                        }),
                      null,
                      'Đăng nhập',
                    );
                    return;
                   
                  }
                  buttonProps.onPress(e);
                }
                }
              />
            )
          }
        }}
      />
      <Tab.Screen
        name={category.id==='0'?SCREEN_ROUTER_APP.USER:SCREEN_ROUTER_APP_ADD.USERADD}
        component={category.id==='0'?StackBottom[USER]:StackBottom[USERADD]}
        options={{
          tabBarIcon: ({ focused, color, size }) => {
            const sizeIcon = focused ? 30 : 25;
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <View>
                <Image
                  source={images.ic_User}
                  style={{ width: sizeIcon, height: sizeIcon, tintColor: tintColor, resizeMode: "contain" }}
                >
                </Image>
              </View>
            )
          },
          tabBarLabel: ({ focused, color }) => {
            const tintColor = focused ? colors.Sienna1 : colors.focus;
            return (
              <Text
                children={R.string.user}
                style={[styles.LableTabButon, { color: tintColor }]}
              />
            )
          },
          tabBarButton: buttonProps => {
            return (
              <TouchableOpacity
                {...buttonProps}
                onPress={async e => {
                  const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
                  if (!token) {
                    showConfirm(
                      R.string.notification,
                      'Vui lòng đăng nhập để thực hiện chức năng này',
                      () =>
                        NavigationUtil.navigate(SCREEN_ROUTER.AUTH, {
                          screen: SCREEN_ROUTER_AUTH.LOGIN,
                        }),
                      null,
                      'Đăng nhập',
                    );
                    return;
                   
                  }
                  buttonProps.onPress(e);
                }
                }
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
const App = () => {
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
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.CHANGEPASS}
        component={StackApp[CHANGEPASS]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.INFORUSER}
        component={StackApp[INFORUSER]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.LISTCHAT}
        component={StackApp[LISTCHAT]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.ADPOST}
        component={StackApp[ADPOST]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.UPDATEUSER}
        component={StackApp[UPDATEUSER]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.DETAILPUTCALENDAR}
        component={StackApp[DETAILPUTCALENDAR]}
      />
       <AppStack.Screen
        name={SCREEN_ROUTER_APP.MAP}
        component={StackApp[MAP]}
      />
      <AppStack.Screen
        name={SCREEN_ROUTER_APP.INTRO}
        component={StackApp[INTRO]}
      />
    </AppStack.Navigator>
  );
}
const AppAdd =()=>{
  return (
    <AppAddStack.Navigator headerMode="none">
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.MANYUSER}
        component={StackAdd[MANYUSER]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.LISTCHATADD}
        component={StackAdd[LISTCHATADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.MANYUSER}
        component={StackAdd[NOTIFICATION]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.USERADD}
        component={StackAdd[USERADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.CHATADD}
        component={StackAdd[CHATADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.DETAILUSER}
        component={StackAdd[DETAILUSER]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.NOTIFICATION}
        component={StackAdd[NOTIFICATION]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.INFORUSERADD}
        component={StackAdd[INFORUSERADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.UPDATEUSERADD}
        component={StackAdd[UPDATEUSERADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.UPDATEINTROADD}
        component={StackApp[UPDATEINTROADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.UPDATEPRICEADD}
        component={StackAdd[UPDATEPRICEADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.REVENUEADD}
        component={StackAdd[REVENUEADD]}
      />
      <AppAddStack.Screen
        name={SCREEN_ROUTER_APP_ADD.REVENUEADDMONTH}
        component={StackAdd[REVENUEADDMONTH]}
      />
    </AppAddStack.Navigator>
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
         <Stack.Screen
          name={SCREEN_ROUTER.MAIN_ADMIN} component={AppAdd}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
const styles = StyleSheet.create({
  LableTabButon: { fontSize: 11, fontFamily: R.fonts.bold, width:60,textAlign:'center' }
})
export default MainTab;