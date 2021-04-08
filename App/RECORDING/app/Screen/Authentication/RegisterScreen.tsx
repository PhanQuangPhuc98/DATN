import React, { useState } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native'
import { Header } from "react-native-elements";
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import {DataCity} from '../../constants/Mockup';
import image from '../../assets/imagesAsset';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER_APP, SCREEN_ROUTER_AUTH, SCREEN_ROUTER } from '../../utils/Constant'
import FastImage from 'react-native-fast-image';
const Confirm = () => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER.MAIN) }}
                style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.registration}</Text>
            </TouchableOpacity>
        </View>
    )
}
const RenderInput = (label, UserInput, cover) => {
    return (
        <View style={{paddingVertical:10}}>
            <Text style={styles.TextLable}>{label}</Text>
            <TextInput
                style={styles.TextInputStyle}
                onChangeText={UserInput}
                placeholderTextColor={colors.focus}
                secureTextEntry={cover}
            />
        </View>
    )
}
const RenderCity = (onSelectedItemsChange,selectedItems,label) => {

    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <SectionedMultiSelect
                items={DataCity}
                IconRenderer={Icon}
                single={true}
                uniqueKey="city_id"
                // subKey="DataCity"
                confirmText={R.string.confirm}
                selectText={R.string.select_province}
                readOnlyHeadings={false}
                showCancelButton={true}
                showChips={true}
                onSelectedItemsChange={onSelectedItemsChange}
                selectedItems={selectedItems}
                ref={(SectionedMultiSelect) =>
                    (SectionedMultiSelect = SectionedMultiSelect)
                }
            />
        </View>
    )
}

const RegisterScreen = () => {
        console.log(DataCity);
        
        const [Item, SetItem]= useState({
          selectedItems: [],
       })
       const onSelectedItemsChange =(selectedItems)=>{
           SetItem({
               ...Item.selectedItems,
               selectedItems:selectedItems
           })
       }
    return (
        <SafeAreaView style={styles.Container}>
            <Header
                containerStyle={styles.ContainerHeader}
                leftComponent={<TouchableOpacity style={styles.LeftHeader} onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER_AUTH.LOGIN) }}>
                    <FastImage source={image.ic_back} style={styles.ImageBack} resizeMode="contain" />
                    <Text style={styles.TextLeft}>{R.string.sign_up_for_account}</Text>
                </TouchableOpacity>}
                statusBarProps={styles.ContainerHeader}
            />
            <View>
                {RenderInput(R.string.name)}
                {RenderInput(R.string.phone)}
                {RenderCity(onSelectedItemsChange,Item.selectedItems, R.string.city)}
                {RenderInput(R.string.pass, null, true)}
                {RenderInput(R.string.confirm_password, null, true)}
              
            </View>
              {Confirm()}
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.white, alignItems: "center" },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    ContainerConfirm: {
        height: 46, backgroundColor: colors.Sienna1, borderRadius: 30, width: 330,
        alignItems: "center", justifyContent: "center", marginVertical: 120, marginHorizontal: 20
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    LeftHeader: { flexDirection: "row", width: 200, height: 40 },
    TextLeft: { marginTop: 3, fontFamily: R.fonts.bold, fontSize: 18, color: colors.white, marginLeft: 5 },
    ImageBack: { height: 14, width: 14, marginTop: 10 },
    TextInputStyle: { borderBottomWidth: 0.5, width: 328, borderColor: colors.focus,height:40 },
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, }
})
export default RegisterScreen;