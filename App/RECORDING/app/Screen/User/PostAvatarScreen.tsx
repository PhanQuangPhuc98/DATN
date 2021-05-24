import React, { useEffect, useState } from 'react'
import RNFetchBlob from 'react-native-fetch-blob';
import ImagePicker from 'react-native-image-crop-picker'
import Reactotron from 'reactotron-react-native';
import R from '../../assets/R'
import { Text, View, SafeAreaView, Dimensions, Platform, StyleSheet,ActivityIndicator, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import ScreenComponent from '../../components/ScreenComponent';
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
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

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
            database().ref(`/users/${Fire.uid}`).update({
              Image: downloadURL
            })
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
              setTimeout(() => {
                NavigationUtil.goBack()
              }, 2000);
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