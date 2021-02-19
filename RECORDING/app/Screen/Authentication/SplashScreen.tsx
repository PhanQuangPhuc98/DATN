import React, { useEffect } from 'react'
import { Text, View } from 'react-native'
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER } from '../../utils/Constant';

const SplashScreen = () => {
    useEffect(() => {
        setTimeout(() => {
            NavigationUtil.navigate(SCREEN_ROUTER.LOGIN)
        }, 1000);
    })
    return (
        <View>
            <Text> textInComponent </Text>
        </View>
    )
}
export default SplashScreen