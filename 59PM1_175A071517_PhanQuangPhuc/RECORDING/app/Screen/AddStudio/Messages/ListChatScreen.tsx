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
import { DEFAULT_PARAMS } from '../../../constants/Constant';
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
    let users = [];
    const [Search, setSearch] = useState(false)
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
        console.log("text", search);
        const formatText = search.toLowerCase();
        if (formatText != '') {
            setSearch(true)
        }
        else {
            setSearch(false)
        }
        console.log("formatText",formatText);
        setTimeout(() => {
            setKey({
                ...Zoom,
                dataZoom: Zoom.fullZoom.filter(item =>
                    item.name ? item.name.toLowerCase().includes(formatText) : item
                )
            }
            )
        }, 100);
    }
    const Zoomkey = []
    const [Zoom, setKey] = useState({
        fullZoom: [],
        dataZoom: []
    })
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    const DB = database()
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
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
                .ref(`Rooms/${roomKey}/`)
                .update({
                    RedStudio: DEFAULT_PARAMS.YES,
                    newMessUser: DEFAULT_PARAMS.NO
                })
        } catch (error) {
            console.log(error);
        }
    }
    const checkRoomsStudio = () => {
        setTimeout(() => {
            const check = DB.ref("Rooms")
                .once('value', (snal) => {
                    snal.forEach(keyroom => {
                        const { friend, key, me, avatar, messagesUser, name, newMessStudio, newMessUser, messagesStudio, newCategory, RedStudio, RedUser } = keyroom.val();
                        if (friend === Fire.uid) {
                            Zoomkey.push({
                                friend: friend,
                                key: key,
                                me: me,
                                avatar: avatar,
                                messagesUser: messagesUser,
                                name: name,
                                messagesStudio: messagesStudio,
                                newCategory: newCategory,
                                RedStudio: RedStudio,
                                RedUser: RedUser,
                                newMessUser: newMessUser,
                                newMessStudio: newMessStudio
                            })

                        }
                    })
                    setKey({
                        ...Zoom,
                        fullZoom: Zoomkey.reverse(),
                        dataZoom: Zoomkey.reverse()
                    })
                })
        }, 1000)

    }
    const CallAcout = () => {
        Auth().onAuthStateChanged(user => {
            if (user) {
                // console.log("state = definitely signed in")
                const onValueChange = database()
                    .ref('/Users/')
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
        if(Search===false){
            return checkRoomsStudio()
        }
    }, [Zoom.fullZoom,Search])
    useEffect(() => {
        CallAcout()
    }, [])
    const RenderItem = ({ index, item }) => {
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
                }}
                style={[styles.HeaderPerson, { borderBottomWidth: 0.5, width: width - 40, height: 80, marginHorizontal: 20 }]}>
                <Avatar
                    size={56}
                    avatarStyle={styles.AvatarStyle}
                    source={item.avatar ? { uri: item.avatar } : images.ic_User}>
                </Avatar>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.TextName}>
                        {item.name ? item.name : "Khách hàng đang tạo phòng"}
                    </Text>
                    {item.newCategory === "0" ?
                        <Text
                            numberOfLines={5}
                            ellipsizeMode={"tail"}
                            style={[styles.TextName, { fontSize: 14, color: item.RedStudio === DEFAULT_PARAMS.NO && item.newMessUser === DEFAULT_PARAMS.YES ? colors.black : colors.focus, marginVertical: 10, height: 60 }]}>
                            {item.messagesUser}
                        </Text> :
                        <Text
                            numberOfLines={5}
                            ellipsizeMode={"tail"}
                            style={[styles.TextName, { fontSize: 14, color: colors.focus, marginVertical: 10, height: 60 }]}>
                            {item.messagesStudio?"Bạn :" + " " + item.messagesStudio:null}
                        </Text>
                    }
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
    // console.log("Zoom", Zoom.dataZoom);
    // Reactotron.log("User", User)
    // Reactotron.log("Studio", Studio)
    console.log("search", Search);

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