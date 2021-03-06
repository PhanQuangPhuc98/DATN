import React, { useEffect, useState } from 'react'
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker'
import Reactotron from 'reactotron-react-native';
import R from '../../assets/R'
import { Text, View, SafeAreaView, Dimensions, Platform, StyleSheet,ActivityIndicator, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import ScreenComponent from '../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import {ASYNC_STORAGE}from '../../constants/Constant';
import {SCREEN_ROUTER,SCREEN_ROUTER_APP,SCREEN_ROUTER_APP_ADD} from '../../utils/Constant';
import NavigationUtil from '../../navigation/NavigationUtil';
import Fire from '../../firebase/firebaseSvc';
import { firebase, storage, database } from '../../firebase/firebaseSvc'
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={R.images.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{R.string.update_avatar}</Text>
    </TouchableOpacity>
  );
};
const renderAvatar = (image, onPress) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.ContainerImage}
    >
      <FastImage
        style={styles.ImagePhoto}
        source={image ? { uri: image } : R.images.ic_IMG}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  )
}
const renderCamera = (onPress) => {
  return (
    <TouchableOpacity
      onPress={onPress}
    >
      <FastImage
        style={styles.ImageCamera}
        source={R.images.ic_ios_camera}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  )
}
const Confirm = (onPress) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ marginLeft: 50 }}
    >
      <FastImage
        style={styles.ImageCamera}
        source={R.images.ic_Send}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  )
}
const PostAvatarScreen = () => {
  const [category,setCategory]=useState({
    id:''
  })
  const DB = async()=>{
    let Category =await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
    setCategory({
      ...category,
      id:Category
    })
  }

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);
  const [Zoom, setKey] = useState([])

  const checkRoomsStudio =  () => {
    const check = database().ref("Rooms").on('value', (snal) => {
        const Zoomkey = []
        snal.forEach(keyroom => {
            const { friend, key, me,avatar,messagesUser,name } = keyroom.val();
            if(Fire.uid===me){
              Zoomkey.push({
                key: key,
            })
            setKey(Zoomkey)
            }
        })
    })
}
Reactotron.log("category",category.id)
useEffect(() => {
  DB()
  checkRoomsStudio()
}, [])
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: width - 30,
      height:  height / 3,
      cropping: true,
    }).then((image) => {
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    setUploading(true)
    const update = await firebase.storage()
      .ref('image/' + Fire.uid)
      .putFile(image)
      .then(() => {
        setUploading(false)
        console.log('Image Upload Successfully');
        storage()
          .ref('image/' + Fire.uid)
          .getDownloadURL()
          .then((downloadURL) => {
            database().ref(`/Users/${Fire.uid}`).update({
              Image: downloadURL
            })
            category.id==="0"?Zoom.map((item)=>{
              database().ref(`/Rooms/${item.key}`).update({
                avatar:downloadURL
              })
            }):null
          })
      })
  };
  Reactotron.log('imgae', image)
  return (
    <ScreenComponent
      leftComponent={Back(() => {
        NavigationUtil.goBack();
      })}
      containerStyle={styles.ContainerHeader}
      statusBarProps={styles.ContainerHeader}
      children={
        <SafeAreaView style={styles.Container}>
          {renderAvatar(image, choosePhotoFromLibrary)}
          <View style={{ flexDirection: "row" }}>
            {renderCamera(takePhotoFromCamera)}
            {
            uploading?<ActivityIndicator size="small" color={R.color.colors.Sienna1} />:
            Confirm(()=>{
              uploadImage(),
              category.id==="0"?
              setTimeout(() => {
                NavigationUtil.navigate(SCREEN_ROUTER.MAIN,{screen:SCREEN_ROUTER_APP.USER})
              }, 2000):
              setTimeout(() => {
                NavigationUtil.navigate(SCREEN_ROUTER.MAIN_ADMIN,{screen:SCREEN_ROUTER_APP_ADD.USERADD})
              }, 2000)
            })
            
            }
           
          </View>
        </SafeAreaView>
      }
    />
  )
}
const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: R.color.colors.white
  },
  ContainerImage: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: R.color.colors.line
  },
  ImagePhoto: {
    height: height / 3,
    width: width - 50,
  },
  ImageCamera: {
    height: height / 8,
    width: width / 8,
  },
  HeaderBack: { flexDirection: 'row', width: width },
  TextHeader: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: R.color.colors.white,
    marginTop: 5,
  },
  ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
  ContainerHeader: { backgroundColor: R.color.colors.Sienna1 },
})
export default PostAvatarScreen;