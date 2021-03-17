import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER_AUTH } from '../../utils/Constant';

const SplashScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN)
        }, 1000);
    })
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )
}
export default SplashScreen