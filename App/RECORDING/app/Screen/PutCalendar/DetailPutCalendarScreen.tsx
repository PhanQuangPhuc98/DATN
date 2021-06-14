import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    TextInput,
    FlatList,
    Linking,
    Platform,
    ScrollView
} from 'react-native'
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import {getCurrentDate} from '../../utils/FuncHelper';
import {showMessages} from '../../utils/AlertHelper';
import { callNumber } from '../../utils/CallPhone'
import Fire from '../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../constants/Constant';
import Reactotron from 'reactotron-react-native';
import { colors } from '../../constants/Theme';
import { firebase, database, Auth } from '../../firebase/firebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenComponent from '../../components/ScreenComponent';
import ModalDrop from '../../components/ModalDrop';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { DataMoney, Introduct } from '../../constants/Mockup'
import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../utils/Constant';
import { log } from 'react-native-reanimated';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
            />
            <Text style={styles.TextHeader}>{R.string.putcalender}</Text>
        </TouchableOpacity>
    );
};
const RenderAvatar = (data) => {
    return (
        <SafeAreaView>
            <FastImage
                source={{ uri: data.Image }}
                style={styles.ContainerAvatar}
            />
        </SafeAreaView>
    )
}
const RenderInforStudio = (name, adress, onPhone, onAdress,price) => {
    return (
        <SafeAreaView style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
            <Text style={{ fontFamily: R.fonts.bold, fontSize: 20, color: colors.black }}>
                {name}
            </Text>
            <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                    style={{ flex: 1, flexDirection: "row", paddingVertical: 10 }}
                    onPress={onPhone}
                >
                    <FastImage
                        source={R.images.ic_PhoneNumber}
                        style={{ height: 18, width: 20 }}
                    >

                    </FastImage>
                    <Text style={{ paddingLeft: 10, fontFamily: R.fonts.bold, fontSize: 14, color: colors.Sienna1 }}>
                        Liên Hệ
                    </Text>
                </TouchableOpacity>

                <View style={{ flexDirection: "row-reverse", flex: 1 }}>
                    <Text style={{ fontFamily: R.fonts.bold, fontSize: 22, color: colors.Sienna1 }}>
                        {price} VND
                    </Text>
                    <FastImage
                        source={R.images.ic_money}
                        style={{ height: 19, width: 16, marginRight: 5, marginTop: 10 }}
                    >

                    </FastImage>
                </View>
            </View>
            <TouchableOpacity
                onPress={onAdress}
                style={{ flexDirection: "row" }}>
                <FastImage
                    source={R.images.ic_adress}
                    style={{ height: 21, width: 19 }}
                />
                <Text style={{ paddingLeft: 10, fontFamily: R.fonts.bold, fontSize: 14, color: colors.focus }}>
                    {adress}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}
const Line = () => {
    return <View style={styles.ContainerLine}></View>;
};
const RenderIntroduct = () => {
    return (
        <SafeAreaView style={{ flexDirection: "row", paddingHorizontal: 10 }}>
            <FastImage
                source={R.images.ic_introduct}
                style={{ height: 18, width: 18, marginTop: 5, marginRight: 10 }}
                resizeMode={FastImage.resizeMode.contain}
            />
            <Text style={{ fontFamily: R.fonts.bold, fontSize: 18, color: colors.Sienna1 }}>
                {R.string.introduct.toUpperCase()}
            </Text>
        </SafeAreaView>
    )
}
const RenderContent = ({ index, item }) => {
    return (
        <SafeAreaView>
            <Text style={{ paddingHorizontal: 10, fontFamily: R.fonts.bold, fontSize: 14, color: colors.black }}>
                {item.content}
            </Text>
        </SafeAreaView>

    )
}
const RenderListContent = (data) => {
    return (
        <View>
            <FlatList
                data={data}
                keyExtractor={item => { item.id }}
                renderItem={RenderContent}
            >
            </FlatList>
        </View>
    )
}
const RenderButton = (onChat, onPut) => {
    return (
        <SafeAreaView
            style={{ width: width, height: 62, flexDirection: "row", justifyContent: "center", alignItems: "center", backgroundColor:colors.white }}
        >
            <TouchableOpacity
                onPress={onChat}
                style={{ height: 42, width: 160, borderColor: R.color.colors.Sienna1, borderRadius: 20, borderWidth: 1, marginRight: 45, flexDirection: "row", alignItems: "center", backgroundColor: colors.white }}>
                <FastImage
                    source={R.images.ic_Chat}
                    style={{ height: 20, width: 20, marginHorizontal: 20 }}
                    resizeMode={FastImage.resizeMode.contain}
                >

                </FastImage>
                <Text style={{ textAlign: 'center', color: colors.Sienna1, fontSize: 16, fontFamily: R.fonts.bold }}>
                    {R.string.Chat.toUpperCase()}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={onPut}
                style={{ height: 42, width: 160, borderColor: R.color.colors.Sienna1, borderRadius: 20, borderWidth: 1, backgroundColor: colors.Sienna1, justifyContent: 'center' }}>
                <Text
                    style={{ textAlign: 'center', color: colors.white, fontSize: 16, fontFamily: R.fonts.bold }}
                >
                    {R.string.putcalender.toUpperCase()}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};
const DetailPutCalendarScreen = ({ route, navigation }) => {
    const { data,params } = route.params;
    const Content =[];
    const putKey = database().ref().push().key;
    const [intro, setIntro] = useState([])
    const [Users, setUsers] = useState({
        _id: '',
        Name: '',
        Image: '',
        Email: '',
        Password: '',
        Phone: '',
        Sex: '',
        Birth_Day: '',
        Category: '0',
        City: '',
        District: '',
        Address: ''
    });
    const [key, setKey] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisiblePut, setModalVisiblePut] = useState(false);
    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    const toggleModalPut = () => {
        setModalVisiblePut(!isModalVisiblePut);
    };
    const [isLoading, setLoading] = useState(false);
    const CallIntro = () => {
        setLoading(true)
        const db = database()
        setTimeout(() => {
            try {
                setLoading(false)
                db
                    .ref(`/IntroStudio/${data._id}`)
                    .on("value", snap => {
                        const { content } = snap.val()
                        Content.push({
                            content:content
                        })
                        setIntro(Content)
                    })
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }, 1000)
    }
    const PutCalendar =()=>{
        const db = database()
        setTimeout(() => {
            try {
                setLoading(false)
                db
                    .ref(`/PutCaledar/${putKey}`)
                    .update({
                        idUser:params.user._id,
                        ImageUser:params.user.Image,
                        ImageStudio:data.Image,
                        NameStudio:data.Name,
                        NameUser:params.user.Name,
                        Price:data.newPrice,
                        Date:getCurrentDate(),
                        idStudio:data._id,
                        PhoneStudio:data.Phone,
                        PhoneUser:params.user.Phone
                    })
                showMessages(R.string.notification, R.string.Put_Sucess)
            } catch (error) {
                console.log(error);
                setLoading(false)
            }
        }, 1000)
    }
    const CallUser =()=>{
        Auth().onAuthStateChanged(user => {
            if (user) {
                console.log("state = definitely signed in")
                const onValueChange = database()
                    .ref('/users/' + Fire.uid)
                    .on('value', (snapshot) => {
                        setUsers({
                            ...Users,
                            _id: snapshot.val()._id,
                            Image: snapshot.val().Image,
                            Name: snapshot.val().Name,
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
            }
            else {
                console.log("state = definitely signed out")
            }
        })
    }
    useEffect(() => {
        CallUser()
        CallIntro()
    }, [])
    const checkRoomsUSer = async () => {
        const check = await database().ref("rooms").on('value', (snal) => {
            snal ? snal.forEach(keyroom => {
                if (params.user.Category === "0" && keyroom.val().friend === data._id) {

                    if (keyroom.val().me === params.user._id) {
                        setKey(keyroom.val().key)
                    }
                }
            }) : null
        })
    }
    const checkRoomsStudio = async () => {
        const check = await database().ref("rooms").on('value', (snal) => {
            snal ? snal.forEach(keyroom => {
                if (params.user.Category === "1" && keyroom.val().me === data._id) {
                    if (keyroom.val().friend === params.user._id) {
                        setKey(keyroom.val().key)
                    }
                }
            }) : null
        })
    }
    useEffect(() => {
        params.user.Category === "0" ? checkRoomsUSer() : params.user.Category === "1" ?checkRoomsStudio():null
    }, [])

    // Reactotron.log("data", data)
    // Reactotron.log("user", Users)
    // Reactotron.log("key", key)
    // console.log("Key",key);
    var x = parseInt('1000',10);
    var y = parseInt('1000',10);
    console.log("Number",x+y);
    Reactotron.log("params",params.user)
    // Reactotron.log("content",intro) 
    return (
        <SafeAreaView style={styles.Container}>
            {
                <ScreenComponent
                    leftComponent={Back(() => {
                        NavigationUtil.goBack();
                    })}
                    containerStyle={styles.ContainerHeader}
                    statusBarProps={styles.ContainerHeader}
                    children={<SafeAreaView>
                        {RenderAvatar(data)}
                        {RenderInforStudio(data.Name, data.Address + ',' + data.District + ',' + data.City, toggleModal, () => { NavigationUtil.navigate(SCREEN_ROUTER_APP.MAP, { data: data }) },data.newPrice)}
                        {Line()}
                        {RenderIntroduct()}
                        {RenderListContent(intro)}
                    </SafeAreaView>}
                />
            }
            <View>
                <ModalDrop
                    toggleModal={toggleModalPut}
                    isModalVisible={isModalVisiblePut}
                    cancle={R.string.exit}
                    confirm={R.string.confirm}
                    content={R.string.PutStudio}
                    onPress={() => {
                        toggleModalPut(),
                        PutCalendar()
                    }}
                />
            </View>
            <View>
                <ModalDrop
                    toggleModal={toggleModal}
                    isModalVisible={isModalVisible}
                    cancle={R.string.exit}
                    confirm={R.string.Call}
                    content={R.string.callStudio}
                    onPress={() => {
                        toggleModal(),
                            callNumber(data.Phone)
                    }}
                />
            </View>
            {RenderButton(() => {
                NavigationUtil.navigate(SCREEN_ROUTER.APP, {
                    screen: SCREEN_ROUTER_APP.CHAT,
                    params: {
                        data: data,
                        params: {
                            user: Users
                        },
                        Key:{
                            key:key
                        }
                    }
                })
            },()=>{
                toggleModalPut()
            })}
        </SafeAreaView>
    )
};
const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: colors.backgroundColor },
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
    TextInfor: {
        fontSize: 15,
        fontFamily: R.fonts.bold
    },
    ImageChage: {
        height: 25,
        width: 30
    },
    SearchStyle: {
        width: width - 80,
        height: 35,
        backgroundColor: colors.white,
        flexDirection: 'row',
        borderRadius: 5,
        marginHorizontal: 15
    },
    TextSearch: { height: 35, width: width - 120 },
    HeaderSearch: {
        height: '100%',
        width: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ImageSearch: { height: 16, width: 16 },
    TextCancle: {
        fontFamily: R.fonts.regular,
        fontSize: 16,
        color: colors.white,
        marginVertical: 10,
        marginHorizontal: 5,
    },
    ContainerItem: {
        height: 234,
        backgroundColor: colors.white,
        width: 180,
        borderRadius: 10,
        marginVertical: 5,
        marginHorizontal: 8
    },
    ImgItem: { height: 146, width: 180 },
    StyleTextItem: { fontSize: 16, fontFamily: R.fonts.bold, color: colors.black },
    ContainerAvatar: {
        height: 221,
        width: width,
        backgroundColor: "red"
    }
});

export default DetailPutCalendarScreen;