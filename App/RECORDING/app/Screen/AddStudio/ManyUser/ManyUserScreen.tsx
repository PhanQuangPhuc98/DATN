import React, { useState, useEffect } from 'react'
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator,RefreshControl, Dimensions, TextInput, Platform, FlatList } from 'react-native'
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
import Fire, { database, Auth } from '../../../firebase/firebaseSvc';
import Reactotron from 'reactotron-react-native';
import { DataHistory } from '../../../constants/Mockup';
import ScreenComponent from '../../../components/ScreenComponent'
import { useFocusEffect } from '@react-navigation/native';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <View style={styles.HeaderBack}>
            <Text style={styles.TextHeader}>{R.string.User}</Text>
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
const RenderResultSearch = (cout) => {
    return (
        <SafeAreaView style={{ flexDirection: 'row', paddingHorizontal: 15 }}>
            <Text style={styles.TextSearch}>
                {R.string.Result_Search}: <Text style={[styles.TextSearch, { color: R.color.colors.Sienna1 }]}>{cout ? cout : 0}</Text>
            </Text>
        </SafeAreaView>
    )
}


const ManyUserScreen = () => {
    var count = 0;
    const [Count, setCount] = useState({
        result: count
    })
    let studio = [];
    let users = [];
    const [Studio, setStudio] = useState({
        fulldata: studio,
        data: studio
    });
    const [User, setUser] = useState({
        FulldataUsers: users,
        DataUsers: []
    })
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
    const CallUser = () => {
        Auth().onAuthStateChanged(user => {
            if (user) {
                const onValueChange = database()
                    .ref('/ListCustomer/')
                    .on('child_added', (snapshot) => {
                        const {Name, IdStudio,IdUser, Image, Phone, Email, City, District, Address } = snapshot.val()
                         if (IdStudio=== Fire.uid) {
                            users.push({
                                IdStudio: IdStudio,
                                IdUser:IdUser,
                                Image: Image,
                                Name: Name,
                                Email: Email,
                                Phone: Phone,
                                City: City,
                                District: District,
                                Address: Address,
                            })
                        } 
                        console.log("users",users);
                        setUser({
                            ...User,
                            FulldataUsers: users,
                        })
                    });
            }
        })
    }
    const handleSearch = (search) => {
        const formatText = search.toLowerCase();
        console.log('search', search);
        console.log('formatText', formatText);
        setTimeout(() => {
            setUser({
                FulldataUsers: User.FulldataUsers,
                DataUsers: formatText.length > 0 ? User.FulldataUsers.filter(item =>
                    item ? item.Name.toLowerCase().includes(formatText) : []
                ) : []
            }
            )
            if (User.DataUsers.length > 0) {
                for (let i = 0; i < User.DataUsers.length; i++) {
                    count++;
                    console.log("For1", count);

                    setCount({
                        ...Count,
                        result: count
                    })

                }
            }
            if (User.DataUsers.length < 0) {
                for (let i = 0; i < User.DataUsers.length; i++) {
                    count -2;
                    console.log("For2", count);
                    setCount({
                        result: 0
                    })
                }
            }
        }, 500);
    }
    const [page, setPage] = useState({
        currentPage: 0,
        newPage: 9
    })
    var onEndReachedCalledDuringMomentum = true;
    const onMomentumScrollBegin = () => {
        onEndReachedCalledDuringMomentum = false;
    };
    const [currentList, setCurrentList] = useState(DataHistory)
    const [newtList, setNewList] = useState([])
    const newlist = User.DataUsers.length <= 0 ? User.FulldataUsers.slice(page.currentPage, page.newPage) : User.DataUsers.slice(page.currentPage, page.newPage)
    const handleLoadMore = () => {
        setPage({
            ...page,
            newPage: page.newPage + 1
        })
        onEndReachedCalledDuringMomentum = true;
        console.log("hello");

        // setNewList(DataHistory.slice(page.currentPage,page.newPage))
    }
    useEffect(() => {
        CallUser()
    }, [])
    const RenderItem = ({ index, item }) => {

        return (
            <TouchableOpacity
                onPress={() => { NavigationUtil.navigate(SCREEN_ROUTER.APPADD, { screen: SCREEN_ROUTER_APP_ADD.DETAILUSER,params:{data:item} }) }}
                style={[styles.HeaderPerson, { borderBottomWidth: 0.5, marginHorizontal: 20, width: width - 40, }]}>
                <Avatar
                    size={56}
                    avatarStyle={styles.AvatarStyle}
                    source={item.Image ? { uri: item.Image } : images.ic_User}>
                </Avatar>
                <View style={{ paddingHorizontal: 10 }}>
                    <Text style={styles.TextName}>
                        {item.Name}
                    </Text>
                    <Text style={[styles.TextName, { fontSize: 14, color: colors.focus, marginVertical: 10 }]}>
                        {item.Phone}
                    </Text>
    
                </View>
            </TouchableOpacity>
        );
    }
    
    
    const RenderListUser = (DataHistory, handleLoadMore, onMomentumScrollBegin, cout) => {
        return (
            <SafeAreaView style={{ borderTopWidth: 0.5, flex: 1 }}>
                {/* {RenderResultSearch(cout)} */}
                <FlatList
                    data={DataHistory}
                    renderItem={RenderItem}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id}
                    onEndReachedThreshold={0.1}
                    refreshControl={<RefreshControl
                        refreshing={false}
                        onRefresh={()=>{CallUser()}}
                    />}
                    onEndReached={handleLoadMore}
                    onMomentumScrollBegin={onMomentumScrollBegin}
                // onRefresh={Refes}
                />
            </SafeAreaView>
        )
    }
    console.log("UserData", User.FulldataUsers);
    console.log("coutTT", Count.result);
    console.log("coutDD", 1+9);

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
                        {RenderListUser(newlist, handleLoadMore, onMomentumScrollBegin, Count.result)}
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

export default ManyUserScreen
