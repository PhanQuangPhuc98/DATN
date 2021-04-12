import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import {ASYNC_STORAGE} from '../../constants/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import Reactotron from 'reactotron-react-native';
const Notification = () => {
     const [token, setToken] = useState(null);
       const checkToken = async () => {
         let token = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
         if (token) {
           setToken(token);
         }
       };
         useEffect(() => {
           checkToken();
         }, []);
    console.log('token',token)
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )
}

export default Notification;