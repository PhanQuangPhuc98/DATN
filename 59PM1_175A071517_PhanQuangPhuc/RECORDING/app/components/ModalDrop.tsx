import React, { useState } from 'react'
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import Modal from 'react-native-modal';
import { colors } from '../constants/Theme';
import R from '../assets/R'
const ModalDrop = (props) => {
    const { toggleModal, isModalVisible,onPress,cancle, confirm,content } = props;
    return (
        <View style={{ flex: 1 }}>
            <Modal
            animationInTiming={300} 
            isVisible={isModalVisible}>
                <View style={styles.Container}>
                    <View style={{height:30, borderBottomWidth:0.5}}><Text style={{textAlign:"center",fontFamily:R.fonts.bold, fontSize:16, color:colors.focus}}>Thông báo</Text></View>
                    <View style={{height:105,justifyContent:"center"}}>
                        <Text style={{textAlign:"center", fontFamily:R.fonts.bold, fontSize:14}}>{content}</Text>
                    </View>
                    <View style={styles.Button}>
                        <TouchableOpacity style={{justifyContent:"center", width:140,borderRightWidth:0.5}}
                        onPress={toggleModal}>
                            <Text style={{textAlign:"center",fontFamily:R.fonts.bold, fontSize:14, color:colors.focus}}>
                                {cancle}
                    </Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onPress} style={{justifyContent:"center", width:140}}>
                            <Text style={{textAlign:"center",fontFamily:R.fonts.bold, fontSize:14, color:colors.Sienna1}}>
                               {confirm}
                    </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    Container: { height: 166, width: 279, backgroundColor: colors.white, borderRadius: 8,marginHorizontal:38 },
    Button:{flexDirection:"row",height:30,borderTopWidth:0.5 }
})
export default ModalDrop