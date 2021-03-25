import React, { useState } from 'react'
import { Text, View, StyleSheet, Animated, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import FastImage from 'react-native-fast-image';
import image from '../assets/imagesAsset';
import { colors } from '../constants/Theme'
const ButtonAnimation = (props) => {
    const {ButtonMess}=props;
    const mode = new Animated.Value(0);
    const handlePress = () => {Animated.timing(mode, {toValue: mode._value === 0 ? 1 : 0 ,duration: 500 }).start();}
    const thx ={transform:[{translateY:mode.interpolate({inputRange: [0, 1],outputRange: [0, 40]})}]}
    const thy = {transform:[{translateY:mode.interpolate({inputRange: [0, 1],outputRange: [0, 80]})}]}
    const rotation = {transform: [{rotate: mode.interpolate({inputRange: [0, 1],outputRange: ["0deg", "45deg"]})}]}
    return (
        <View style={styles.container}>
                <TouchableWithoutFeedback onPress={()=>{handlePress();ButtonMess()}}>
                    <Animated.View style={[styles.Aniamnted,thy]}>
                        <FastImage source={image.ic_Phone} style={[styles.Img]}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{handlePress();ButtonMess()}}>
                    <Animated.View style={[styles.Aniamnted,thx]}>
                        <FastImage source={image.ic_Messenger} style={[styles.Img]}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={()=>{handlePress()}}>
                    <Animated.View style={[styles.Aniamnted,rotation]}>
                        <FastImage source={image.ic_Group} style={styles.Img}/>
                    </Animated.View>
                </TouchableWithoutFeedback>
        </View>
    )
}
const styles = StyleSheet.create({
    container:{alignItems:"center"},
    Img: {height: 32,width: 32,},
    Aniamnted: {position: "absolute"}})
export default ButtonAnimation;