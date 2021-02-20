
import React, { useState } from 'react';
import { Text, View, Image, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationUtil from './NavigationUtil'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screen/Authentication/LoginScreen'
import SplashScreen from '../Screen/Authentication/SplashScreen'
import { SCREEN_ROUTER_AUTH, SCREEN_ROUTER_APP } from '../utils/Constant';
import HomeScreen from '../Screen/Home/HomeScreen'
import Imgae from '../assets/imagesAsset';

const { LOGIN } = SCREEN_ROUTER_AUTH;
const { HOME } = SCREEN_ROUTER_APP

const SettingsScreen = ({ navigation }) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }}>

      <Button
        title="go to Home"
        onPress={() => navigation.goBack()}
      >
      </Button>
      <Text>Settings!</Text>
    </View>
  );
}
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainTab = () => {
  const [isSigned, setSigned] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode='none'>
        <Stack.Screen
          name={SCREEN_ROUTER_AUTH.LOGIN} component={LoginScreen}
        />
        <Stack.Screen
          name={SCREEN_ROUTER_APP.HOME} component={HomeScreen}
        />
        <Stack.Screen
          name={"SettingsScreen"} component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default MainTab;