import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, TextInput, Platform } from 'react-native'
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
import ScreenComponent from '../../../components/ScreenComponent'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.update_user}</Text>
        </TouchableOpacity>
    );
};
const RenderInput = (Label, value, onChangeText) => {
    return (
        <View style={{ paddingTop: 5 }}>
            <Text style={[styles.TextInfor]}>
                {Label}
            </Text>
            <TextInput
                value={value}
                style={styles.TextInputStyle}
                onChangeText={onChangeText}
            >

            </TextInput>
        </View>
    )
}
const renderIcon = () => {
    return (
        <SafeAreaView>
            <FastImage
                source={R.images.ic_expant}
                style={{ height: 16, width: 16 }}
                resizeMode={FastImage.resizeMode.contain}
            >
            </FastImage>
        </SafeAreaView>
    )

}
const RenderAdress = (label, Data, onSelectedItemsChange, selectedItems, Adress) => {
    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <SectionedMultiSelect
                items={Data}
                IconRenderer={renderIcon}
                single={true}
                uniqueKey="name"
                // subKey="DataCity"
                confirmText={R.string.confirm}
                selectText={Adress}
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
const Confirm = (onPress) => {
    return (
        <View>
            <TouchableOpacity onPress={onPress} style={styles.ContainerConfirm}>
                <Text style={styles.TextConfirm}>{R.string.confirm}</Text>
            </TouchableOpacity>
        </View>
    );
};

const UpdateUserAddScreen = ({ route, ...props }) => {
    const { data } = route.params;
    const [city, setCity] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [dataHN, setHN] = useState([])
    const [dataHCM, setHCM] = useState([])
    const [payload, setPayload] = useState({
        _id: data ? data._id : '',
        Name: data ? data.Name : '',
        Email: data ? data.Email : '',
        Phone: data ? data.Phone : '',
        Sex: data ? data.Sex : '',
        Birth_Day: data ? data.Birth_Day : '',
        Category: data ? data.Category : '',
        City: data ? data.City : '',
        District: data ? data.District : '',
        Address: data ? data.Address : ''
    })
    const onSelectedCity = (selectedItems) => {
        setPayload({
            ...payload,
            City: selectedItems[0]
        })
    }
    const onSelectedDistrict = (selectedItems) => {
        setPayload({
            ...payload,
            District: selectedItems[0]
        })
    }
    const CallCity = () => {
        const city = database()
            .ref("/City/")
            .on('value', (snapshot) => {
                let Data = [];
                console.log(snapshot.val(), "city");
                snapshot.forEach((child) => {
                    Data.push({
                        id: child.val().id,
                        name: child.val().name
                    })
                })
                setCity(Data)
            });
    }
    const CallDistrict = () => {
        const District = database()
            .ref("/District/")
            .on('value', (snapshot) => {
                setHN(snapshot.val().HN)
                setHCM(snapshot.val().HCM)
            });
    }
    useEffect(() => {
        CallCity()
        CallDistrict()
    }, [])
    Reactotron.log(payload.District, "District");
    const updateUser = async () => {
        setLoading(true)
        try {
            const update = await database()
                .ref(`/users/${Fire.uid}`)
                .update({
                    Name: payload.Name,
                    Email: payload.Email,
                    Phone: payload.Phone,
                    Sex: payload.Sex,
                    Birth_Day: payload.Birth_Day,
                    City: payload.City,
                    District: payload.District,
                    Address: payload.Address
                })
            setLoading(false);
            showMessages(R.string.notification, R.string.Update_Sucess);
            NavigationUtil.navigate(SCREEN_ROUTER.MAIN, { screen: SCREEN_ROUTER_APP.USER })
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
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
                    <SafeAreaView style={{ paddingHorizontal: 25 }}>
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                        >
                            {RenderInput(R.string.name, payload.Name, name => { setPayload({ ...payload, Name: name }) })}
                            {RenderInput(R.string.phone, payload.Phone, phone => { setPayload({ ...payload, Phone: phone }) })}
                            {RenderInput(R.string.email, payload.Email, enail => { setPayload({ ...payload, Email: enail }) })}
                            {RenderAdress(R.string.city, city, onSelectedCity, payload.City, payload.City == '' ? R.string.select_province : payload.City)}
                            {RenderAdress(R.string.District, payload.City == "Hà Nội" ? dataHN : dataHCM, onSelectedDistrict, payload.District, payload.District == '' ? R.string.select_distric : payload.District)}
                            {RenderInput(R.string.Address, payload.Address, adress => { setPayload({ ...payload, Address: adress }) })}
                            {isLoading ? <ActivityIndicator size="small" color={R.color.colors.Sienna1} /> : Confirm(updateUser)}
                        </ScrollView>

                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: { flex: 1 },
    ContainerScreen: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 24,
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
    TextLable: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.focus, },
    TextInfor: {
        fontSize: 15,
        fontFamily: R.fonts.bold,
        color: colors.focus
    },
    TextConfirm: { fontSize: 14, fontFamily: R.fonts.bold, color: colors.white },
    ContainerConfirm: {
        height: 46,
        backgroundColor: colors.Sienna1,
        borderRadius: 30,
        width: width - 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        // marginHorizontal: 20,
    },
    TextInputStyle: { borderBottomWidth: 0.5, width: width - 50, borderColor: colors.focus, height: 40 },
    ic_Date: {
        width: 16,
        height: 16,
        position: 'absolute',
        bottom: 12,
        right: 10
    },
    v_line: {
        backgroundColor: '#DDDDDD',
        opacity: 0.2,
        borderBottomWidth: Platform.OS == 'ios' ? 0.25 : 0.2,
        position: 'relative',
        bottom: 2
    },
})
export default UpdateUserAddScreen