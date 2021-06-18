import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, RefreshControl, ScrollView, ActivityIndicator, Dimensions, TextInput, Platform, FlatList } from 'react-native'
import FastImage from 'react-native-fast-image';
import images from '../../../assets/imagesAsset';
import R from '../../../assets/R';
import { colors } from '../../../constants/Theme';
import NavigationUtil from '../../../navigation/NavigationUtil';
import Icon from 'react-native-vector-icons/MaterialIcons'
import { Avatar, ListItem } from 'react-native-elements'
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import DatePicker from 'react-native-datepicker';
import {DEFAULT_PARAMS} from '../../../constants/Constant';
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
const SearchUser = (lable, onChangeText) => {
    return (
        <SafeAreaView style={{ width: width, backgroundColor: R.color.colors.white, paddingHorizontal: 20, paddingVertical: 10 }}>
            <View style={{ width: width - 50, backgroundColor: R.color.colors.brown, marginHorizontal: 5, borderRadius: 2.5 }}>
                <TextInput
                    style={{ width: width - 50, height: 35, borderRadius: 2.5 }}
                    placeholder={lable}
                    onChangeText={onChangeText}
                >

                </TextInput>
            </View>

        </SafeAreaView>
    )
}

const ListChatScreen = () => {
    let studio = [];
    let users = [];
    // const [Studio, setStudio] = useState(null);
    const [User, setUser] = useState({
        FulldataUsers: users,
        DataUsers: users
    })
    const [Studio, setStudio] = useState({
        _id: '',
        Image: '',
        Name: '',
        Category: '',
        Email: '',
        Phone: '',
        Sex: '',
        Birth_Day: '',
        City: '',
        District: '',
        Address: '',
    })
    const handleSearch = (search) => {
        const formatText = search.toLowerCase();
        console.log(formatText);
        setTimeout(() => {
            setKey({
                ...Zoom,
                dataZoom: Zoom.fullZoom.filter(item =>
                    item.name ? item.name.toLowerCase().includes(formatText) : item
                )
            }
            )
        }, 500);
    }
    const Zoomkey = []
    const [active, setActive] = useState(false)
    const [Zoom, setKey] = useState({
        fullZoom: Zoomkey,
        dataZoom: Zoomkey
    })
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    const DB = database()
    const pushMessal = [];
    const [messages, setMessages] = useState([])
    const [allmessages, setAllMessages] = useState([])
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const [currentList, setCurrentList] = useState(DataHistory)
    const [newtList, setNewList] = useState([])
    const newlist = Zoom.dataZoom.slice(page.currentPage, page.newPage)
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");
    }
    const UpdateRead = (roomKey) => {
        try {
            DB
                .ref(`rooms/${roomKey}/`)
                .update({
                    RedStudio: DEFAULT_PARAMS.YES
                })
        } catch (error) {
            console.log(error);
        }
    }
    const checkRoomsStudio = () => {
        const check = DB.ref("rooms").on('value', (snal) => {
            snal.forEach(keyroom => {
                const { friend, key, me, avatar, messagesUser, name, messagesStudio, newMess, RedStudio,RedUser } = keyroom.val();
                if (friend === Fire.uid) {
                    Zoomkey.push({
                        friend: friend,
                        key: key,
                        me: me,
                        avatar: avatar,
                        messagesUser: messagesUser,
                        name: name,
                        messagesStudio: messagesStudio,
                        newMess: newMess,
                        RedStudio: RedStudio,
                        RedUser:RedUser
                    })
                    setKey({
                        ...Zoom,
                        fullZoom: Zoomkey,
                        dataZoom: Zoomkey
                    })
                }
            })
        })

    }
    const CallAcout = () => {
        Auth().onAuthStateChanged(user => {
            if (user) {
                // console.log("state = definitely signed in")
                const onValueChange = database()
                    .ref('/users/')
                    .on('value', (snapshot) => {
                        snapshot.forEach((child) => {
                            if (child.val().Category === "1" && child.val()._id === Fire.uid) {
                                setStudio({
                                    ...Studio,
                                    _id: child.val()._id,
                                    Image: child.val().Image,
                                    Name: child.val().Name,
                                    Category: child.val().Category,
                                    Email: child.val().email,
                                    Phone: child.val().Phone,
                                    Sex: child.val().Sex,
                                    Birth_Day: child.val().Birth_Day,
                                    City: child.val().City,
                                    District: child.val().District,
                                    Address: child.val().Address,
                                })
                            } else if (child.val().Category != "1" && child.val()._id != Fire.uid) {
                                users.push({
                                    _id: child.val()._id,
                                    Image: child.val().Image,
                                    Name: child.val().Name,
                                    Category: child.val().Category,
                                    Email: child.val().email,
                                    Phone: child.val().Phone,
                                    Sex: child.val().Sex,
                                    Birth_Day: child.val().Birth_Day,
                                    City: child.val().City,
                                    District: child.val().District,
                                    Address: child.val().Address,
                                })
                            }
                            // } else if (child.val()._id === Fire.uid) {
                            //     setCategory({
                            //         ...Categoty,
                            //         _id: child.val()._id,
                            //         Image: child.val().Image,
                            //         Name: child.val().Name,
                            //         Category: child.val().Category,
                            //         Email: child.val().email,
                            //         Phone: child.val().Phone,
                            //         Sex: child.val().Sex,
                            //         Birth_Day: child.val().Birth_Day,
                            //         City: child.val().City,
                            //         District: child.val().District,
                            //         Address: child.val().Address,
                            //     })
                            // }
                        })
                        // setStudio({
                        //     ...Studio,
                        //     fulldata: studio,
                        //     data: studio
                        // });
                        setUser({
                            ...User,
                            FulldataUsers: users,
                            DataUsers: users
                        })
                    });
            }
            else {
                console.log("state = definitely signed out")
            }
        })
    }
    useEffect(() => {
        checkRoomsStudio()
        CallAcout()
    }, [])
    const RenderItem = ({ index, item }) => {
        // console.log("RedStudio",item.RedUser);
        
        return (
            <TouchableOpacity
                onPress={() => {
                    NavigationUtil.navigate(SCREEN_ROUTER.APPADD, {
                        screen: SCREEN_ROUTER_APP_ADD.CHATADD, params: {
                            data: item,
                            params: {
                                user: Studio
                            },
                        }
                    })
                    UpdateRead(item.key)
                    // alert(index)
                    // item.key ===item.key?alert("yes"):alert("no")
                    // item?setActive(!active):setActive(active)
                    // alert(item.name);
                }}
                style={[styles.HeaderPerson, { borderBottomWidth: 0.5, marginHorizontal: 20, width: width - 40, }]}>
                <Avatar
                    size={56}
                    avatarStyle={styles.AvatarStyle}
                    source={item.avatar ? { uri: item.avatar } : images.ic_User}>
                </Avatar>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.TextName}>
                        {item.name ? item.name : "Khách hàng đang tạo phòng"}
                    </Text>
                    <Text style={[styles.TextName, { fontSize: 14, color: item.RedStudio === "No" ? colors.black : colors.focus, marginVertical: 10 }]}>
                        {item.newMess === "0" ? item.messagesUser : "Bạn :" + " " + item.messagesStudio}
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
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={() => { checkRoomsStudio() }}
                    />}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleLoadMore}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                />
            </SafeAreaView>
        )
    }
    Reactotron.log("key", Zoom);
    Reactotron.log("User", User)
    Reactotron.log("Studio", Studio)
    // console.log("active",active);

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
                        {SearchUser(R.string.Search_User, handleSearch)}
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