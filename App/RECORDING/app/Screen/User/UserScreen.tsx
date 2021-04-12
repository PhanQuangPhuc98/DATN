import React, {useState, useEffect} from 'react';
import {Text, View, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import NavigationUtil from '../../navigation/NavigationUtil';
import Reactotron from 'reactotron-react-native';
import {
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '../../utils/Constant';
import {ASYNC_STORAGE} from '../../constants/Constant';
import AsyncStorage from '@react-native-community/async-storage';

const UserScreen = () => {
  // const [token, setToken] = useState(null);
  const logout = async () => {
    const res = await auth().signOut();
    try {
      const token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
      if (token) {
        await AsyncStorage.setItem(ASYNC_STORAGE.TOKEN, '');
      }
      //Reactotron.log('loken', token);
      // NavigationUtil.navigate(SCREEN_ROUTER.MAIN);;
         Reactotron.log('res', res);
      return;
    } catch (error) {
      Reactotron.log('error', error);
    }
    //alert("hello")
  };
  // const checkToken = async () => {
  //   let token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
  //   if (token) {
  //     setToken(token);
  //   }
  // };
  // useEffect(() => {
  //   checkToken();
  // }, []);
  //Reactotron.log('token', token);
  return (
    <View style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
      <Button title={'Logout'} onPress={() => logout()}></Button>
    </View>
  );
};

export default UserScreen;
