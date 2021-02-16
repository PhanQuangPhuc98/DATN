
import React, { useState } from 'react';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NavigationUtil from './NavigationUtil'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from '../Screen/Authentication/LoginScreen'
import { SCREEN_ROUTER } from '../utils/Constant';
import Imgae from '../assets/imagesAsset';


const HomeScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
      <TouchableOpacity
        onPress={() => {
          NavigationUtil.goBack();
        }}
      >
        <Text>Home!</Text>
      </TouchableOpacity>
    </View>
  );
}
const SettingsScreen = (navigation) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'orange' }}>
      <Text>Settings!</Text>
    </View>
  );
}
const Stack = createStackNavigator();
// const Tab = createBottomTabNavigator();
const AppNavigation = () => {
  const [isSigned, setSigned] = useState(false);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen" component={HomeScreen}
        />
        <Stack.Screen
          name="Setting" component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
// const switchNav = createSwitchNavigator({
//   [SCREEN_ROUTER.MAIN]:Tab,
// })
export default AppNavigation;