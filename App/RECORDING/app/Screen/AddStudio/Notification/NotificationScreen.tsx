import React, { useState, useEffect, useCallback } from 'react';
import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    TextInput,
    Dimensions,
    TouchableOpacity,
    StatusBar,
    Platform,
    FlatList,
    RefreshControl
} from 'react-native';
import R from '../../../assets/R';
import { firebase } from '../../../firebase/firebaseSvc'
import Fire, { Auth, database, storage } from '../../../firebase/firebaseSvc'
import ImagePicker from 'react-native-image-crop-picker'
import image from '../../../assets/imagesAsset';
import Reactotron from 'reactotron-react-native';
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../../constants/Constant'
import ScreenComponent from '../../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../../constants/Theme';
import { DataNotification } from '../../../constants/Mockup';
import NavigationUtil from '../../../navigation/NavigationUtil';
import { SCREEN_ROUTER, SCREEN_ROUTER_APP_ADD } from '../../../utils/Constant';
const { height, width } = Dimensions.get('window');
const left = () => {
    return (
        <View>
            <Text style={styles.Title}>{R.string.notification}</Text>
        </View>
    );
};

const NotificationScreen = () => {
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const DB = database();
    const List = [];
    const [ListNotification, setListNotification] = useState({
        fullList:[],
        List:[]
    })
    const [isLoading, setisLoading] = useState(false);
    const [newtList, setNewList] = useState([])
    const newlist = ListNotification.List.slice(page.currentPage, page.newPage)
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");

        // setNewList(DataHistory.slice(page.currentPage,page.newPage))
    }
    const RenderItem = ({ index, item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    UpdateRead(item.key)
                    item.Messages === DEFAULT_PARAMS.YES ? NavigationUtil.navigate(SCREEN_ROUTER.MAIN_ADMIN, { screen: SCREEN_ROUTER_APP_ADD.LISTCHATADD }) :
                        NavigationUtil.navigate(SCREEN_ROUTER.APPADD, { screen: SCREEN_ROUTER_APP_ADD.REVENUEADD })
                }}
                style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, paddingVertical: 5 }}>
                <View style={{ marginRight: 10 }}>
                    <FastImage
                        source={R.images.ic_Notification}
                        style={styles.ImgScreen}
                        tintColor={R.color.colors.Sienna1}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View>
                    <Text style={[styles.TextName, { height: 45,width:width-80 }]}>
                        {item.Messages === DEFAULT_PARAMS.YES ? R.string.NotificationMess + " " + item.NameUser : R.string.NotificationPut + " " + item.NameUser}
                    </Text>
                    <Text style={[styles.TextName, { color: R.color.colors.focus }]}>
                        {item.Date}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    const RenderNotifi = (data, handleLoadMore, onMomentumScrollBegin, onRefresh) => {
        return (
            <SafeAreaView>
                <FlatList
                    data={data}
                    renderItem={RenderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />}
                    onEndReached={handleLoadMore}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                >

                </FlatList>
            </SafeAreaView>
        )
    }
    const CallNotification = () => {
        setisLoading(true)
        try {
            setTimeout(() => {
                DB
                    .ref('Notification')
                    .once("value", snapot => {
                        snapot.forEach((snap) => {
                            setisLoading(false)
                            const { NameUser, IdUser, IdStudio, Red, Date, Put, Messages, key } = snap.val()
                            if (IdStudio === Fire.uid) {
                                List.push({
                                    NameUser: NameUser,
                                    IdStudio: IdStudio,
                                    Red: Red,
                                    Date: Date,
                                    Put: Put,
                                    Messages: Messages,
                                    key: key
                                })
                                setListNotification({
                                    ...ListNotification,
                                    fullList:List.reverse(),
                                    List:List.reverse()
                                })
                            }
                        })
                    })
            },500)
        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    }
    const UpdateRead = (roomKey) => {
        try {
            DB
                .ref(`Notification/${roomKey}/`)
                .update({
                    Read: DEFAULT_PARAMS.YES
                })
        } catch (error) {
            console.log(error);
        }
    }
    //console.log("list", ListNotification);

    useEffect(() => {
        CallNotification()
    }, [ListNotification.fullList])
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={left()}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <SafeAreaView style={[styles.Container, { paddingHorizontal: 15 }]}>
                        {RenderNotifi(newlist, handleLoadMore, onMomentumScrollBegin, () => { CallNotification() })}
                    </SafeAreaView>
                }
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        backgroundColor: colors.white
    },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
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
        marginBottom: 5
    },
    TextName: { fontSize: 16, fontFamily: R.fonts.bold },
    ImgScreen: { height: 35, width: 35 },
    ContainerScreen: {
        backgroundColor: colors.white,
        flexDirection: 'row',
        height: 55,
        paddingHorizontal: 24,
        paddingVertical: 10,
    },
    ContainerLine: { borderWidth: 0.65, marginHorizontal: 24, borderColor: colors.line }
});
export default NotificationScreen
