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
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../constants/Theme';
import { DataNotification } from '../../constants/Mockup';
import NavigationUtil from '../../navigation/NavigationUtil';
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
    const DB = database();
    const List =[];
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const [ListNotification, setListNotification] = useState([])
    const [isLoading,setisLoading]= useState(false);
    const [currentList, setCurrentList] = useState(DataNotification)
    const [newtList, setNewList] = useState([])
    const newlist = ListNotification.slice(page.currentPage, page.newPage)
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");

        // setNewList(DataHistory.slice(page.currentPage,page.newPage))
    }
    const CallNotification =()=>{
        setisLoading(true)
        try {
            DB
            .ref('Notification')
            .on("value",snapot=>{
                snapot.forEach((snap)=>{
                    setisLoading(false)
                    const {NameUser,IdUser,Red,Date,Put,Messages,key}=snap.val()
                    if(IdUser===Fire.uid){
                        List.push({
                            NameUser:NameUser,
                            IdUser:IdUser,
                            Red:Red,
                            Date:Date,
                            Put:Put,
                            Messages:Messages,
                            key:key
                        })
                        setListNotification(List.reverse())
                    }
                    else if(IdUser!=Fire.uid){
                        // setListNotification([])
                    }
                })
            })
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
    const RenderItem = ({ index, item }) => {
        return (
            <SafeAreaView style={{ flexDirection: 'row', borderBottomWidth: 0.5, paddingHorizontal: 10, paddingVertical: 5,backgroundColor:R.color.colors.white }}>
                <View style={{marginRight:10}}>
                    <FastImage
                        source={R.images.ic_Notification}
                        style={styles.ImgScreen}
                        tintColor={R.color.colors.Sienna1}
                        resizeMode={FastImage.resizeMode.contain}
                    />
                </View>
                <View>
                    <Text style={[styles.TextName,{height:45}]}>
                        {item.Messages===DEFAULT_PARAMS.YES?R.string.NotificationMessStudio+" "+item.NameUser:null}
                    </Text>
                    <Text style={[styles.TextName, { color: R.color.colors.focus }]}>
                        {item.Date}
                    </Text>
                </View>
            </SafeAreaView>
        )
    }
    const RenderNotifi = (data, handleLoadMore, onMomentumScrollBegin,onRefresh) => {
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
    console.log("list",ListNotification);
    
    useEffect(() => {
        CallNotification()
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={left()}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                children={
                    <SafeAreaView style={[styles.Container,{paddingHorizontal:15}]}>
                        {RenderNotifi(newlist, handleLoadMore, onMomentumScrollBegin,()=>{CallNotification()})}
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
