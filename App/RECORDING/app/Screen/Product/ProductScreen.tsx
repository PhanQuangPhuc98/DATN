import React, { useState } from 'react'
import { Text, View,StyleSheet } from 'react-native'

const ProductScreen =()=>{
        return (
            <View style={styles.Container}>
                <Text> textInComponent </Text>
            </View>
        )
};
const styles=StyleSheet.create({
    Container:{
        flex:1,
        alignItems:"center",
        justifyContent:'center', 
        backgroundColor:"green"
    }
})
export default ProductScreen;