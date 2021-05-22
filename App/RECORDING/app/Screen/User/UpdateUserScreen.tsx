import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, Dimensions, TextInput, Platform } from 'react-native'
import FastImage from 'react-native-fast-image';
import images from '../../assets/imagesAsset';
import R from '../../assets/R';
import { colors } from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialIcons'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { DataCity } from '../../constants/Mockup'
import DatePicker from 'react-native-datepicker';
import { Header, CheckBox } from "react-native-elements";
import { SCREEN_ROUTER_APP } from '../../utils/Constant';
import {showMessages} from '../../utils/AlertHelper'
import Fire, { firebase, database } from '../../firebase/firebaseSvc';
import Reactotron from 'reactotron-react-native';
import ScreenComponent from '../../components/ScreenComponent'
import { Label } from 'native-base';
import { set } from 'react-native-reanimated';
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
const RenderInput = (Label, value,onChangeText) => {
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
const RenderDate = (birthDayStr, onDateChange) => {
    return (
        <View style={{ marginTop: 16, width: width - 50 }}>
            <Text style={{ fontSize: 14, color: '#666666', fontFamily: R.fonts.bold }} children={R.string.Birth_Day} />
            <DatePicker
                style={{ width: width - 45, marginTop: 4 }}
                androidMode='spinner'
                date={birthDayStr || new Date()}
                mode='date'
                showIcon={true}
                format='DD/MM/YYYY'
                confirmBtnText='Xác nhận'
                cancelBtnText='Huỷ'
                maxDate={new Date()}
                iconSource={R.images.ic_date}
                customStyles={{
                    dateInput: {
                        alignItems: 'flex-start',
                        paddingLeft: 10,
                        borderColor: 'white',
                        paddingBottom: 0,
                        marginBottom: 0
                    },
                    dateText: [
                        {
                            color: colors.black
                        }
                    ],
                    datePicker: {
                        justifyContent: 'center'
                    },
                    dateIcon: {
                        height: 18,
                        width: 16,

                    }
                }}
                onDateChange={onDateChange}
            />
            {/* <FastImage source={R.images.ic_date} style={styles.ic_Date} resizeMode={FastImage.resizeMode.contain} /> */}
            <View style={styles.v_line} />
        </View>
    )
}
const RenderSex = (title, checked, onPress) => {
    return (
        <View>
            <CheckBox
                title={title}
                containerStyle={{ backgroundColor: "white" }}
                uncheckedIcon='circle-o'
                checkedIcon='dot-circle-o'
                checked={checked}
                checkedColor={colors.Sienna1}
                onPress={onPress}
            />
        </View>
    )
}
const RenderAdress = (label, Data, onSelectedItemsChange, selectedItems, Adress) => {
    return (
        <View>
            <Text style={styles.TextLable}>{label}</Text>
            <SectionedMultiSelect
                items={Data}
                IconRenderer={Icon}
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
const UpdateUserScreen = ({ route, ...props }) => {
    const { data } = route.params;
    const [city, setCity] = useState([]);
    const [checked, setChecked] = useState(false);
    const [dataHN,setHN]=useState([])
    const [dataHCM,setHCM]=useState([])
    const [birthDayStr, setBirthDayStr] = useState(data.Birth_Day);
    const [Password, setPassword] = useState(true);
    const [payload, setPayload] = useState({
        _id: '',
        Name: '',
        Email: '',
        Password: '',
        Phone: '',
        Sex: '',
        Birth_Day: data?data.Birth_Day:'',
        Category: '0',
        City: '',
        District: '',
        Address: ''
    })
    const onSelectedCity = (selectedItems) => {
        setPayload({
            ...payload,
            City: selectedItems[0]
        })
    }
    const onSelectedDistrict=(selectedItems)=>{
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
    const CallDistrict =()=>{
           const District= database()
            .ref("/District/")
            .on('value', (snapshot) => {
            setHN(snapshot.val().HN)
            setHCM(snapshot.val().HCM)
            });
    }
    useEffect(() => {
        const onValueChange = database()
            .ref('/users/' + Fire.uid)
            .on('value', (snapshot) => {
                setPayload({
                    ...payload,
                    _id: snapshot.val()._id,
                    Name: snapshot.val().name,
                    Category: snapshot.val().Category,
                    Email: snapshot.val().email,
                    Phone: snapshot.val().Phone,
                    Sex: snapshot.val().Sex,
                    Birth_Day: snapshot.val().Birth_Day,
                    City: snapshot.val().City,
                    District: snapshot.val().District,
                    Address: snapshot.val().Address,
                });
            });
        CallCity()
        CallDistrict()
    }, [])
    // Reactotron.log(dataHCM, "datacity");
    const updateUser =async ()=>{
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
        try {
            showMessages(R.string.notification, R.string.Update_Sucess);
            NavigationUtil.navigate(SCREEN_ROUTER_APP.USER)
        } catch (error) {
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
                        {RenderInput(R.string.name, payload.Name,name=>{setPayload({...payload,Name:name})})}
                        {RenderInput(R.string.phone, payload.Phone,phone=>{setPayload({...payload,Phone:phone})})}
                        {RenderInput(R.string.email, payload.Email,enail=>{setPayload({...payload,Email:enail})})}
                        {RenderDate(payload.Birth_Day, date => { setPayload({
                            ...payload,
                            Birth_Day:date
                        }) })}
                        <View style={{ flexDirection: "row", backgroundColor: 'white' }}>
                            <Text style={[styles.TextInfor, { marginTop: 15 }]}>
                                {R.string.Sex}
                            </Text>
                            {RenderSex(R.string.Boy, checked, () => {
                                setPayload({
                                    ...payload,
                                    Sex: '1',
                                }),
                                    setChecked(!checked)
                            })}
                            {RenderSex(R.string.Girl, checked ? false : true, () => {
                                setPayload({
                                    ...payload,
                                    Sex: '0',
                                }),
                                    setChecked(!checked)
                            })}
                        </View>
                        {RenderAdress(R.string.city, city, onSelectedCity, payload.City, data.City)}
                        {RenderAdress(R.string.District,payload.City=="Hà Nội"?dataHN:dataHCM,onSelectedDistrict,payload.District,data.District)}
                        {RenderInput(R.string.Address, payload.Address,adress=>{setPayload({...payload,Address:adress})})}
                        {Confirm(updateUser)}
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    Container: { flex: 1 },
    Title: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        width: 100,
    },
    AvatarStyle: { borderRadius: 40 },
    HeaderPerson: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: height / 10,
        paddingVertical: 10,
        paddingHorizontal: 24,
        marginBottom: 5,
    },
    TextName: { fontSize: 16, fontFamily: R.fonts.bold },
    ImgScreen: { height: 19, width: 30 },
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
        width: 330,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 30,
        marginHorizontal: 10,
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
export default UpdateUserScreen