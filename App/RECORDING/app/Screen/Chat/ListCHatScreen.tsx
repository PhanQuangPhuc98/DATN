import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import ScreenComponent from '../../components/ScreenComponent'
import R from '../../assets/R'
import { colors } from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
import {
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '../../utils/Constant';
import Reactotron from 'reactotron-react-native';
import FastImage from 'react-native-fast-image';
import Fire from '../../firebase/firebaseSvc'
import firebase from 'firebase'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
            <FastImage
                style={styles.ic_Back}
                source={R.images.ic_back}
                resizeMode={FastImage.resizeMode.contain}></FastImage>
            <Text style={styles.TextHeader}>{R.string.ListChat}</Text>
        </TouchableOpacity>
    );
};
const renderList = ({ index, item }) => {
    if (item._id != Fire.uid&&item.Category==1){  
      return (
        <TouchableOpacity 
        style={{flex: 1, backgroundColor: 'green'}}
        onPress={()=>{NavigationUtil.navigate(SCREEN_ROUTER_APP.CHAT, {data: item});}}>
          <View>
            <Text>{item.name}</Text>
          </View>
        </TouchableOpacity>
      );
    }
}
const ListChatScreen = () => {
    const [allUsers, setAllUsers] = useState([]);
    const uuid = "";
    const [userDetail, setUserDetail] = useState({
        _id: '',
        name: '',
        Category: '',
    });
    useEffect(() => {
        const onValueChange = firebase.database()
            .ref(`/users`)
            .on('value', (snapshot) => {
                let users = [];
                let currentUser = {
                    _id: "",
                    name: "",
                    Category: ""
                };
                snapshot.forEach((child) => {
                    if (uuid === child.val()._id) {
                        currentUser._id = uuid;
                        currentUser.name = child.val().name;
                        currentUser.Category = child.val().Category;
                    }
                    else {
                        users.push({
                            _id: child.val()._id,
                            name: child.val().name,
                            Category: child.val().Category,
                        });
                    }
                });
                setUserDetail(currentUser);
                setAllUsers(users);
            });
    }, [])
    Reactotron.log('data', allUsers);
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
                children={
                    <FlatList
                        data={allUsers}
                        keyExtractor={(index, item) => {
                            index._id;
                        }}
                        renderItem={renderList}
                    />
                }
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    Container: { flex: 1 },
    ContainerHeader: { backgroundColor: colors.Sienna1 },
    ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
    HeaderBack: { flexDirection: 'row', width: width },
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: colors.white,
        marginTop: 5,
    },
})

export default ListChatScreen