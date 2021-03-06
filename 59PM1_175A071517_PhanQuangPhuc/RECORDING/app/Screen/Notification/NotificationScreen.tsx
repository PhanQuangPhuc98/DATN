import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
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
import R from '../../assets/R';
import { firebase } from '../../firebase/firebaseSvc'
import Fire, { Auth, database, storage } from '../../firebase/firebaseSvc'
import ImagePicker from 'react-native-image-crop-picker'
import image from '../../assets/imagesAsset';
import Reactotron from 'reactotron-react-native';
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../constants/Constant'
import ScreenComponent from '../../components/ScreenComponent';
import {NotificationCustomer} from '../../redux/actions/index';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../constants/Theme';
import { DataNotification } from '../../constants/Mockup';
import NavigationUtil from '../../navigation/NavigationUtil';
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '../../utils/Constant';
import OneSignal from 'react-native-onesignal';
const { height, width } = Dimensions.get('window');
const left = () => {
    return (
        <View>
            <Text style={styles.Title}>{R.string.notification}</Text>
        </View>
    );
};

const NotificationScreen = ({...props}) => {
    //const {data, isLoading, error}=props.NotifiState;
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    const DB = database();
    const List = [];
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const [ListNotification, setListNotification] = useState({
        fullList: [],
        List: []
    })
    const [Loading, setisLoading] = useState(false);
    const [currentList, setCurrentList] = useState(DataNotification)
    const [newtList, setNewList] = useState([])
    const newlist = ListNotification.List.slice(page.currentPage, page.newPage)
    const CoutNotifi =()=>{
        let cout=0;
        ListNotification.List.map((item)=>{
            if(item.RedUser===DEFAULT_PARAMS.NO){
                cout++
            }
            props.NotificationCustomer(cout)
        })
    } 
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");

        // setNewList(DataHistory.slice(page.currentPage,page.newPage))
    }
    const UpdateRead = (roomKey) => {
        try {
            DB
                .ref(`Notification/${roomKey}/`)
                .update({
                    RedUser: DEFAULT_PARAMS.YES
                })
        } catch (error) {
            console.log(error);
        }
    }
    const RemoveNotification =()=>{
        OneSignal.clearOneSignalNotifications();
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
                            const { NameUser, IdUser, RedStudio, Date, Put, Messages, key, Data, Params,roomKey,RedUser } = snap.val()
                            if (IdUser === Fire.uid) {
                                List.push({
                                    NameUser: NameUser,
                                    IdUser: IdUser,
                                    RedStudio: RedStudio,
                                    RedUser:RedUser,
                                    Date: Date,
                                    Put: Put,
                                    Messages: Messages,
                                    key: key,
                                    Data: Data,
                                    Params: Params,
                                    roomKey:roomKey
                                })
                                setListNotification({
                                    ...ListNotification,
                                    fullList: List.reverse(),
                                    List: List.reverse()
                                })
                            }
                            else if (IdUser != Fire.uid) {
                                // setListNotification([])
                            }
                        })
                    })
            }, 500)
        } catch (error) {
            setisLoading(false)
            console.log(error);
        }
    }
    const RenderItem = ({ index, item }) => {

        return (
            
            <TouchableOpacity
                onPress={() => {
                    RemoveNotification()
                    UpdateRead(item.key)
                    NavigationUtil.navigate(SCREEN_ROUTER.APP, {
                        screen: SCREEN_ROUTER_APP.CHAT,
                        params: {
                            data: item.Data,
                            params: {
                                user: item.Params
                            },
                            Key:{
                                key:item.roomKey
                            },
                            navi:{
                                Put:DEFAULT_PARAMS.NO
                            }
                        }
                    }
                    )
                }}
                style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, paddingVertical: 5, backgroundColor: R.color.colors.white }}>
                <View style={{ marginRight: 10 }}>
                    <FastImage
                        source={R.images.ic_Notification}
                        style={styles.ImgScreen}
                        tintColor={R.color.colors.Sienna1}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View>
                    <Text style={[styles.TextName, { height: 45 }]}>
                        {item.Messages === DEFAULT_PARAMS.YES ? R.string.NotificationMessStudio + " " + item.NameUser : null}
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
                    // onRefresh={handleLoadMore}
                    onEndReached={handleLoadMore}
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                >

                </FlatList>
            </SafeAreaView>
        )
    }

    useEffect(() => {
        CoutNotifi()
    }, [ListNotification])
    useEffect(() => {
        CallNotification()
    }, [ListNotification.List])
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
        width: 200,
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


const mapStateToProps = (state) => ({
    NotifiState: state.notificationReducer
})

const mapDispatchToProps = {
    NotificationCustomer
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationScreen)
