import React, { useState, useEffect } from 'react'
import { SafeAreaView, Text, View, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native'
import ScreenComponent from '../../components/ScreenComponent'
import R from '../../assets/R'
import { colors } from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
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
    return (
        <TouchableOpacity style={{ flex: 1, backgroundColor: "green" }}>
            <View>
                <Text>
                    {item.name}
                </Text>
            </View>
        </TouchableOpacity>
    )
}
const ListChatScreen = () => {
    const [allUsers, setAllUsers] = useState([]);
      const [userDetail, setUserDetail] = useState({
    id: "",
    name: "",
    profileImg: "",
  });
    useEffect(() => {
        const onValueChange = firebase.database()
            .ref(`/users`)
            .on('value', (snapshot) => {
                let users = [];
                let currentUser = {
                    id: "",
                    name: "",
                    Category:""
                };
                // snapshot.forEach((child)=>{
                //     if(uuid==)
                // })
            });

    }, [])
    // alert(JSON.stringify(payload))
    // payload.map(item=>{Reactotron.log(item.name)})
    return (
        <SafeAreaView style={styles.Container}>
            <ScreenComponent
                containerStyle={styles.ContainerHeader}
                statusBarProps={styles.ContainerHeader}
                leftComponent={Back(() => {
                    NavigationUtil.goBack();
                })}
            // children={
            //     <FlatList
            //       data={payload}
            //       keyExtractor={(index, item) => {
            //         index._id;
            //       }}
            //       renderItem={renderList}
            //     />
            // }
            />
        </SafeAreaView>
    )
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