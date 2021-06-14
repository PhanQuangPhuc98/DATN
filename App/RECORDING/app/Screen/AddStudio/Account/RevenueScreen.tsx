import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet,RefreshControl, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, TextInput, Platform, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image';
import images from '../../../assets/imagesAsset';
import R from '../../../assets/R';
import { colors } from '../../../constants/Theme';
import NavigationUtil from '../../../navigation/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, ListItem } from 'react-native-elements'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import DatePicker from 'react-native-datepicker';
import { CheckBox } from "react-native-elements";
import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../../utils/Constant';
import { showMessages } from '../../../utils/AlertHelper'
import Fire, { database } from '../../../firebase/firebaseSvc';
import Reactotron from 'reactotron-react-native';
import { DataHistory } from '../../../constants/Mockup';
import ScreenComponent from '../../../components/ScreenComponent'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.Revenue}</Text>
        </TouchableOpacity>
    );
};
const RenderMultiScreen = (Week, Month, convert) => {
    return (
        <SafeAreaView style={styles.ContainerMulti}>
            <TouchableOpacity
                style={styles.StyleScreen}
                onPress={Week}
            >
                <Text style={[styles.TextRevenue, { borderBottomWidth: convert === false ? 1.5 : null }]}>
                    {R.string.By_Week}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={Month}
                style={styles.StyleScreen}
            >
                <Text style={[styles.TextRevenue, { borderBottomWidth: convert === true ? 1.5 : null }]}>
                    {R.string.By_Month}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const Line = () => {
    return <View style={styles.ContainerLine}></View>;
};
const RenderItem = ({ index, item }) => {

    return (
        <View style={[styles.HeaderPerson, { borderBottomWidth: 0.5, marginHorizontal: 35, width: width - 80, flex: 1 }]}>
            <View style={{width:width/2,flexDirection: 'row',}}>
                <Avatar
                    size={56}
                    avatarStyle={styles.AvatarStyle}
                    source={item.ImageUser?{uri:item.ImageUser}:images.ic_User}>
                </Avatar>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.TextName}>
                        {item.NameUser}
                    </Text>
                    <Text style={[styles.TextName, { fontSize: 14, color: colors.focus, marginVertical: 10 }]}>
                        {item.PhoneUser}
                    </Text>

                </View>
            </View>

            <View style={{width:width/2, paddingVertical:32,paddingHorizontal:35 }}>
                <Text style={{fontSize: 14, color: colors.focus, }}>
                    {item.Date}
                </Text>
            </View>
        </View>
    );
}
const RenderListHistoryDay = (dataDay,onRefresh) => {
    return (
        <SafeAreaView style={{ paddingTop: 10, paddingHorizontal: 10, flex: 1 }}>
            <Text style={{ marginHorizontal: 30, fontSize: 15, fontFamily: R.fonts.bold }}>
                {R.string.History_PutCalender}
            </Text>
            <FlatList
                data={dataDay}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
                refreshControl={<RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />}
            >
            </FlatList>
        </SafeAreaView>
    )
}
const RenderListHistoryMonth = (dataMonth,onRefresh) => {
    return (
        <SafeAreaView style={{ paddingTop: 10, paddingHorizontal: 10, flex: 1 }}>
            <Text style={{ marginHorizontal: 30, fontSize: 15, fontFamily: R.fonts.bold }}>
                {R.string.History_PutCalender}
            </Text>
            <FlatList
                data={dataMonth}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                renderItem={RenderItem}
                refreshControl={<RefreshControl
                    refreshing={false}
                    onRefresh={onRefresh}
                />}
            >
            </FlatList>
        </SafeAreaView>
    )
}
const RenderDay = (data,onRefresh) => {
    return (
        <SafeAreaView style={[styles.Container, { paddingVertical: 10 }]}>
            <View style={{ flexDirection: "row", width: width, paddingVertical: 10 }}>
                <Text style={{ width: width / 2, textAlign: 'center' }}>
                    31/05/2021
                </Text>
                <Text style={{ width: width / 2, textAlign: 'center' }}>
                    06/06/2021
                </Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>

                <Text style={{ width: width / 2, textAlign: 'center', fontFamily: R.fonts.bold, fontSize: 15 }}>
                    {R.string.Total_Revenue}
                </Text>
                <View style={{ flexDirection: 'row', width: width / 2, alignItems: 'center', justifyContent: 'center' }}>
                    <FastImage
                        source={R.images.ic_money}
                        style={{ height: 19, width: 16, marginRight: 5, marginTop: 10 }}
                    >

                    </FastImage>
                    <Text style={{ fontFamily: R.fonts.bold, fontSize: 22, color: R.color.colors.Sienna1 }}>
                        300.0000 VND
                    </Text>
                </View>
            </View>
            {Line()}
            {RenderListHistoryDay(data,onRefresh)}
        </SafeAreaView>
    )
}
const RenderMonth = (month,onRefresh) => {
    return (
        <SafeAreaView style={[styles.Container, { paddingVertical: 10 }]}>
            <View style={{ flexDirection: "row", width: width, paddingVertical: 10 }}>
                <Text style={{ width: width / 2, textAlign: 'center' }}>
                    01/06/2021
                </Text>
                <Text style={{ width: width / 2, textAlign: 'center' }}>
                    30/06/2021
                </Text>
            </View>

            <View style={{ flexDirection: 'row', paddingVertical: 10 }}>

                <Text style={{ width: width / 2, textAlign: 'center', fontFamily: R.fonts.bold, fontSize: 15 }}>
                    {R.string.Total_Revenue}
                </Text>
                <View style={{ flexDirection: 'row', width: width / 2, alignItems: 'center', justifyContent: 'center' }}>
                    <FastImage
                        source={R.images.ic_money}
                        style={{ height: 19, width: 16, marginRight: 5, marginTop: 10 }}
                    >

                    </FastImage>
                    <Text style={{ fontFamily: R.fonts.bold, fontSize: 22, color: R.color.colors.Sienna1 }}>
                        300.0000 VND
                    </Text>
                </View>
            </View>
            {Line()}
            {RenderListHistoryMonth(month,onRefresh)}
        </SafeAreaView>
    )
}
const RevenueScreen = () => {
    const [convert, setConvert] = useState(false)
    const history =[];
    const [callHistory,setHistory]=useState([])
    const DB =database();
    const [isLoading,setisLoading]=useState(false)
    const CallHistoryPrice =()=>{
        setisLoading(true)
        setTimeout(()=>{
            try {
                DB
                .ref('/PutCaledar/')
                .on("value",snapot=>{
                    setisLoading(false)
                    snapot.forEach((snap)=>{
                        const {idUser,ImageUser,ImageStudio,NameStudio,NameUser,Price,Date,idStudio,PhoneStudio,PhoneUser}=snap.val()
                        if(idStudio===Fire.uid){
                            history.push({
                                idUser:idUser,
                                ImageUser:ImageUser,
                                ImageStudio:ImageStudio,
                                NameStudio:NameStudio,
                                NameUser:NameUser,
                                Price:Price,
                                Date:Date,
                                PhoneStudio:PhoneStudio,
                                PhoneUser:PhoneUser
                            })
                        }
                    })
                    setHistory(history)
                })
            } catch (error) {
                setisLoading(false)
                console.log(error);
            }
        })
    }
    useEffect(() => {
        CallHistoryPrice()
    }, [])
    var x = parseInt('1000',10);
    var y = parseInt('1000',10);
    console.log("Number",x+y);
    Reactotron.log("Data",callHistory)
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <View style={styles.Container}>
                        {RenderMultiScreen(() => { setConvert(!convert) }, () => { setConvert(!convert) }, convert)}
                        {convert == false ? RenderDay(callHistory,()=>{CallHistoryPrice}) : RenderMonth(callHistory,()=>{CallHistoryPrice})}
                    </View>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.white },
    ContainerScreen: {
        backgroundColor: colors.white,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    ContainerLine: {
        borderWidth: 0.65,
        width: width - 80,
        marginHorizontal: 40,
        borderColor: colors.line,
        marginVertical: 10
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
    ContainerMulti: {
        width: width,
        height: 42,
        flexDirection: "row",
        borderBottomWidth: 0.5
    },
    StyleScreen: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    TextRevenue: {
        fontSize: 14,
        height: 42,
        fontFamily: R.fonts.bold,
        borderBottomColor: R.color.colors.Sienna1,
        paddingVertical: 10,
    },
    AvatarStyle: { borderRadius: 40 },
    TextName: { fontSize: 16, fontFamily: R.fonts.bold },
    HeaderPerson: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        height: height / 10,
        paddingVertical: 10,
        // paddingHorizontal: 24,
        marginBottom: 5
    },
})

export default RevenueScreen
