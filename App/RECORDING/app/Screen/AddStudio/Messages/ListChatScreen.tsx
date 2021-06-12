import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Dimensions, TextInput, Platform, FlatList } from 'react-native'
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
import { SCREEN_ROUTER_APP, SCREEN_ROUTER, SCREEN_ROUTER_APP_ADD } from '../../../utils/Constant';
import { showMessages } from '../../../utils/AlertHelper'
import Fire, { database, firebase, Auth, firestore, storage } from '../../../firebase/firebaseSvc';
import Reactotron from 'reactotron-react-native';
import { DataHistory } from '../../../constants/Mockup';
import ScreenComponent from '../../../components/ScreenComponent'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <View style={styles.HeaderBack}>
            <Text style={styles.TextHeader}>{R.string.Messages}</Text>
        </View>
    );
};
const SearchUser = (lable) => {
    return (
        <SafeAreaView style={{ width: width, backgroundColor: R.color.colors.white, paddingHorizontal: 20, paddingVertical: 10 }}>
            <View style={{ width: width - 50, backgroundColor: R.color.colors.brown, marginHorizontal: 5, borderRadius: 2.5 }}>
                <TextInput
                    style={{ width: width - 50, height: 35, borderRadius: 2.5 }}
                    placeholder={lable}
                >

                </TextInput>
            </View>

        </SafeAreaView>
    )
}
const RenderItem = ({ index, item }) => {

    return (
        <TouchableOpacity
            onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER.APPADD, { screen: SCREEN_ROUTER_APP_ADD.CHATADD }) }}
            style={[styles.HeaderPerson, { borderBottomWidth: 0.5, marginHorizontal: 20, width: width - 40, }]}>
            <Avatar
                size={56}
                avatarStyle={styles.AvatarStyle}
                source={item.avatar?{uri:item.avatar}:images.ic_User}>
            </Avatar>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.TextName}>
                    {item.name}
                </Text>
                <Text style={[styles.TextName, { fontSize: 14, color: colors.focus, marginVertical: 10 }]}>
                    {item.messagesUser}
                </Text>

            </View>
        </TouchableOpacity>
    );
}
const RenderListUser = (DataHistory, handleLoadMore, onMomentumScrollBegin) => {
    return (
        <SafeAreaView style={{ borderTopWidth: 0.5, flex: 1 }}>
            <FlatList
                data={DataHistory}
                renderItem={RenderItem}
                showsVerticalScrollIndicator={false}
                keyExtractor={item => item.id}
                onEndReachedThreshold={0.1}
                onEndReached={handleLoadMore}
                onMomentumScrollBegin={onMomentumScrollBegin}
            />
        </SafeAreaView>
    )
}
const ListChatScreen = () => {
    const [Zoom, setKey] = useState([])
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    const pushMessal =[];
    const [messages,setMessages]=useState([])
    const [allmessages,setAllMessages]=useState([])
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const [currentList, setCurrentList] = useState(DataHistory)
    const [newtList, setNewList] = useState([])
    const newlist = Zoom.slice(page.currentPage, page.newPage)
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");
    }
    const checkRoomsStudio =  () => {
        const check = database().ref("rooms").on('value', (snal) => {
            const Zoomkey = []
            snal.forEach(keyroom => {
                const { friend, key, me,avatar,messagesUser,name } = keyroom.val();
                Zoomkey.push({
                    friend:friend,
                    key: key,
                    me:me,
                    avatar:avatar,
                    messagesUser:messagesUser,
                    name:name
                })
                setKey(Zoomkey)
            })
        })
    }
    const CallBackMess = (data) => {
        const Messages =[];
        const currentMess =Messages;
        let List =null;
        data.map((item) => {
            const db = database().ref(`messages/${item.key}/rooms/`)
                .on('value', snapshot => {
                    snapshot.forEach((snap)=>{
                        const {_id,createdAt,text,user} = snap.val()
                        Messages.push({
                            _id:_id,
                            createdAt:createdAt,
                            text:text,
                            user:user
                        })
                        // newList.slice(0,2)
                        List=currentMess.slice(currentMess.length-1,currentMess.length)
                        Reactotron.log("newList",List)
                        setMessages(messages.concat(List))
                    })
                    // alert(JSON.stringify(snapshot.val()));  
                    // const {_id,createdAt,text,user} = snapshot.val()
                   
                    // messages.push({
                    //     _id:_id,
                    //     createdAt:createdAt,
                    //     text:text,
                    //     user:user
                    // })
                    // messages.push(snapshot.val())
                    // setMessages(messages)
                    // List=currentMess.slice(currentMess.length-1,currentMess.length)
                    // Reactotron.log("newList",List)
                    // setMessages(messages.concat(List))
                });
        })

    }
    useEffect(() => {
        checkRoomsStudio()
    }, [])
    useEffect(() => {
        CallBackMess(Zoom)
    }, [Zoom])
    Reactotron.log("key", Zoom);
    Reactotron.log("messages",messages)

    // alert(JSON.stringify(messages))
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                chilStyle={styles.Container}
                children={
                    <SafeAreaView style={styles.Container}>
                        {SearchUser(R.string.Search_User)}
                        {RenderListUser(newlist, handleLoadMore, onMomentumScrollBegin)}
                    </SafeAreaView>
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
    TextSearch: {
        fontFamily: R.fonts.bold,
        color: R.color.colors.black,
        fontSize: 14,

    }
})

export default ListChatScreen