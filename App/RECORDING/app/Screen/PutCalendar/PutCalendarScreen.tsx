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
    RefreshControl
} from 'react-native'
import images from '../../assets/imagesAsset';
import FastImage from 'react-native-fast-image';
import Fire from '../../firebase/firebaseSvc';
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../constants/Constant';
import Reactotron from 'reactotron-react-native';
import { colors } from '../../constants/Theme';
import { firebase, database, Auth } from '../../firebase/firebaseSvc';
import AsyncStorage from '@react-native-community/async-storage';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import R from '../../assets/R';
import { DataMoney } from '../../constants/Mockup'
import { SCREEN_ROUTER_APP, SCREEN_ROUTER } from '../../utils/Constant';
const { height, width } = Dimensions.get('window');
const Search = (onChangeText, placeholder) => {
    return (
        <View
            style={styles.SearchStyle}
        >
            <View style={styles.HeaderSearch}>
                <FastImage
                    style={styles.ImageSearch}
                    source={R.images.ic_Search}
                    resizeMode="contain"
                />
            </View>
            <TextInput
                textAlign="center"
                style={[styles.TextSearch]}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.focus}
            >
            </TextInput>
        </View>
    )
}

const PutCalendarScreen = () => {
    let studio = [];
    let users = [];
    const [searchStudio, setSearchStudio] = useState(false)
    const [Studio, setStudio] = useState({
        fulldata: studio,
        data: studio
    });
    const [User, setUser] = useState({
        FulldataUsers: users,
        DataUsers: users
    })
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
    }
    const [Categoty, setCategory] = useState({
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
    const CallUser =()=>{
        Auth().onAuthStateChanged(user => {
            if (user) {
                // console.log("state = definitely signed in")
                const onValueChange = database()
                    .ref('/Users/')
                    .once('value', (snapshot) => {
                        snapshot.forEach((snap)=>{
                            const {_id,Image,Name,Category,email,Phone,Sex,Birth_Day,City,District,Address,newPrice,oldPrice,latitude,longitude}= snap.val()
                            if (Category == "1" && _id != Fire.uid) {
                                studio.push({
                                    _id: _id,
                                    Image: Image,
                                    Name: Name,
                                    Category: Category,
                                    Email: email,
                                    Phone: Phone,
                                    Sex: Sex,
                                    Birth_Day: Birth_Day,
                                    City: City,
                                    District: District,
                                    Address: Address,
                                    newPrice:newPrice,
                                    oldPrice:oldPrice,
                                    latitude:latitude,
                                    longitude:longitude
                                })
                            } else if (Category != "1" && _id != Fire.uid) {
                                users.push({
                                    _id: _id,
                                    Image: Image,
                                    Name: Name,
                                    Category: Category,
                                    Email: email,
                                    Phone: Phone,
                                    Sex: Sex,
                                    Birth_Day: Birth_Day,
                                    City: City,
                                    District: District,
                                    Address: Address,
                                })
                            } else if (_id == Fire.uid) {
                                setCategory({
                                    ...Categoty,
                                    _id: _id,
                                    Image: Image,
                                    Name: Name,
                                    Category: Category,
                                    Email: email,
                                    Phone: Phone,
                                    Sex: Sex,
                                    Birth_Day: Birth_Day,
                                    City: City,
                                    District: District,
                                    Address: Address,
                                })
                            }
                        })
                        setStudio({
                            ...Studio,
                            fulldata: studio,
                            data: studio
                        });
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
        if(searchStudio===false){
            return CallUser()
        }
    }, [Studio.fulldata,setSearchStudio])
    const handleSearch = (search) => {
        const formatText = search.toLowerCase();
        if (formatText != '') {
            setSearchStudio(true)
        }
        else {
            setSearchStudio(false)
        }
        console.log(formatText);
        setTimeout(() => {
            setStudio({
                ...Studio,
                data: Studio.fulldata.filter(item =>
                    item.Name ? item.Name.toLowerCase().includes(formatText) : item
                )
            }
            )
        }, 500);
    }
    const Item = ({ index, item }) => {
        return (
            <TouchableOpacity
                onPress={() => {
                    NavigationUtil.navigate(SCREEN_ROUTER.APP, {
                        screen: SCREEN_ROUTER_APP.DETAILPUTCALENDAR,
                        params: { 
                            data: item,
                            params:{user:Categoty}
                        }
                    })
                }}
                style={styles.ContainerItem}>
                <FastImage
                    source={item.Image?{ uri: item.Image }:R.images.ic_IMG}
                    style={styles.ImgItem}
                    resizeMode={FastImage.resizeMode.contain}
                />
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={[styles.StyleTextItem, { color: colors.black }]}>
                        {item.Name}
                    </Text>
                    <Text style={{ fontSize: 14, fontFamily: R.fonts.bold, color: colors.Sienna1, textDecorationLine: 'line-through' }}  >{item.oldPrice}VND</Text>
                    <Text style={[styles.StyleTextItem, { color: colors.Sienna1 }]}>
                        {item.newPrice} VND
                </Text>
                </View>
            </TouchableOpacity>
        )
    }
    const RenderItem = (Data,onRefresh) => {
        return (
            <View>
                <FlatList
                    data={Data}
                    keyExtractor={item => { item._id }}
                    showsVerticalScrollIndicator={true}
                    renderItem={Item}
                    horizontal={false}
                    numColumns={2}
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={onRefresh}
                    />}
                    onEndReachedThreshold={0.1}
                    onEndReached={handleLoadMore}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                />
            </View>
        )
    }
    //console.log('studio', Studio.data)
    // Reactotron.log('user', User.DataUsers)
    // Reactotron.log('Categoty', Categoty)
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                centerComponent={Search(handleSearch, R.string.searchCalendar)}
                containerStyle={styles.ContainerHeader}
                backgroundColor={colors.backgroundColor}
                statusBarProps={styles.ContainerHeader}
                chilStyle={{paddingHorizontal:10}}
                children={
                    RenderItem(Studio.data,CallUser)
                }
            />
        </SafeAreaView>
    )
}
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
    TextSearch: { height: 40, width: width - 120 },
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
        width: 165,
        borderRadius: 10,
        marginVertical: 5,
        //paddingHorizontal:5,
        marginRight:30,
        marginHorizontal: 5
    },
    ImgItem: { height: 146, width: 165 },
    StyleTextItem: { fontSize: 16, fontFamily: R.fonts.bold, color: colors.black },
});
export default PutCalendarScreen;