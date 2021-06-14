import React, { useState } from 'react';
import {
    SafeAreaView,
    Text,
    View,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    RefreshControl,
    FlatList
} from 'react-native';
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import { Avatar, ListItem } from 'react-native-elements'
import Fire from '../../firebase/firebaseSvc';
import { ASYNC_STORAGE } from '../../constants/Constant';
import Reactotron from 'reactotron-react-native';
import { colors } from '../../constants/Theme';
import { firebase, database } from '../../firebase/firebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import {showMessages} from '../../utils/AlertHelper';
import R from '../../assets/R';
import { useEffect } from 'react';
import { SCREEN_ROUTER_APP } from '../../utils/Constant';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.History_PutCalender}</Text>
        </TouchableOpacity>
    );
};
const RenderItem = ({ index, item }) => {

    return (
        <SafeAreaView
            style={[styles.HeaderPerson, { borderBottomWidth: 0.5, marginHorizontal: 20, width: width - 40, }]}>
            <Avatar
                size={56}
                avatarStyle={styles.AvatarStyle}
                source={item.ImageStudio ? { uri: item.ImageStudio } : images.ic_User}>
            </Avatar>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={styles.TextName}>
                    {item.NameStudio}
                </Text>
                <Text style={[styles.TextName, { fontSize: 14, color: colors.focus, marginVertical: 10 }]}>
                    {item.PhoneStudio}
                </Text>

            </View>
        </SafeAreaView>
    );
}


const RenderListUser = (DataHistory, handleLoadMore, onMomentumScrollBegin,onRefresh) => {
    return (
        <SafeAreaView style={{ borderTopWidth: 0.5, flex: 1 }}>
            <FlatList
                data={DataHistory}
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
            />
        </SafeAreaView>
    )
}
const HistoryPutScree = () => {
    const [callHistory,setCallHistory]=useState([])
    const [isLoading,setisLoading]=useState(false)
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");

        // setNewList(DataHistory.slice(page.currentPage,page.newPage))
    }
    const newlist = callHistory.slice(page.currentPage, page.newPage) 
    const call =[];
    const db =database();
    const callPut =()=>{
        setisLoading(true)
        setTimeout(()=>{
            try {

                db
                .ref('/PutCaledar/')
                .on("value",snapot=>{
                    setisLoading(false)
                    snapot.forEach((snap)=>{
                        const {idUser,ImageUser,ImageStudio,NameStudio,NameUser,Price,Date,idStudio,PhoneStudio,PhoneUser} =snap.val();
                        if(Fire.uid===idUser){
                            call.push({
                                idUser:idUser,
                                ImageUser:ImageUser,
                                ImageStudio:ImageStudio,
                                NameStudio:NameStudio,
                                NameUser:NameUser,
                                Price:Price,
                                Date:Date,
                                idStudio:idStudio,
                                PhoneStudio:PhoneStudio,
                                PhoneUser:PhoneUser
                            })
                        }
                    })
                    setCallHistory(call)
                })
            } catch (error) {
                setisLoading(false)
                console.log(error);
            }
        },1000)
    }
    useEffect(() => {
        callPut()
    }, [])
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader} 
                children={
                    <SafeAreaView style={styles.Container}>
                        {RenderListUser(newlist,handleLoadMore,onMomentumScrollBegin,()=>{callPut()})}
                    </SafeAreaView>
                }
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    Container: { flex: 1, backgroundColor: R.color.colors.white },
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
    TextInfor: {
        fontSize: 15,
        fontFamily: R.fonts.bold
    },
    ImageChage: {
        height: 25,
        width: 30
    }
});
export default HistoryPutScree
