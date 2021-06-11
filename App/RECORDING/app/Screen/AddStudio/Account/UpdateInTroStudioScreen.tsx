import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, TextInput, Platform, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image';
import images from '../../../assets/imagesAsset';
import R from '../../../assets/R';
import { colors } from '../../../constants/Theme';
import NavigationUtil from '../../../navigation/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import DatePicker from 'react-native-datepicker';
import { CheckBox } from "react-native-elements";
import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../../utils/Constant';
import { showMessages } from '../../../utils/AlertHelper'
import Fire, { database } from '../../../firebase/firebaseSvc';
import Reactotron from 'reactotron-react-native';
import { Introduct } from '../../../constants/Mockup';
import ScreenComponent from '../../../components/ScreenComponent'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.UpdateIntroStudio}</Text>
        </TouchableOpacity>
    );
};
const Confirm = (onPress) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
            </TouchableOpacity>
        </View>
    );
};

const UpdateInTroStudioScreen = () => {
    const [intro,setIntro]=useState({
        content:''
    })
    const RenderContent = ({ index, item }) => {
        return (
            <SafeAreaView> 
                <TextInput 
                multiline={true}
                onChangeText={Intro=>{
                    setIntro({
                        ...intro,
                        content:Intro
                    })
                }}
                value={item.content}>
                </TextInput>
            </SafeAreaView>
        )
    };
    const RenderListContent = () => {
        return (
            <View>
                <FlatList
                    data={Introduct}
                    keyExtractor={item => { item.id }}
                    renderItem={RenderContent}
                >
                </FlatList>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <SafeAreaView style={styles.ContainerScreen}>
                        <Text style={styles.TextIntro}>
                            {R.string.introduct}
                        </Text>
                        {RenderListContent()}
                        {Confirm()}
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.backgroundColor},
    ContainerScreen: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    ContainerLine: {
        borderWidth: 0.65,
        marginHorizontal: 24,
        borderColor: colors.line,
    },
    HeaderBack: { flexDirection: 'row', width: width },
    ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        marginTop: 5,
    },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    ContainerConfirm: {
        height: 46,
        backgroundColor: colors.Sienna1,
        borderRadius: 30,
        width: width - 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 60,
        marginHorizontal: 15,
    },
    TextInputStyle: { borderBottomWidth: 0.5, width: width - 50, borderColor: colors.focus, height: 40 },
    TextIntro:{
        fontFamily:R.fonts.bold,
        fontSize:14
    }
})
export default UpdateInTroStudioScreen;
