import React, { useState } from 'react'
import ImagePicker from 'react-native-image-crop-picker'
import Reactotron from 'reactotron-react-native';
import R from '../../assets/R'
import { Text, View,SafeAreaView, Dimensions, Platform,StyleSheet, TouchableOpacity } from 'react-native'
import FastImage from 'react-native-fast-image';
import ScreenComponent from '../../components/ScreenComponent';
import NavigationUtil from '../../navigation/NavigationUtil';
import ButtonAnimation from '../../components/ButtonAnimation'
import Fire from '../../firebase/firebaseSvc'
import * as Firebase from 'firebase'
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
const renderAvatar =(image,onPress)=>{
    return(
        <TouchableOpacity
         onPress={onPress}
         style={styles.ContainerImage}
        >
             <FastImage
                 style={styles.ImagePhoto}
                 source={image?{uri:image}:R.images.ic_IMG}
                 resizeMode={FastImage.resizeMode.contain}
                /> 
        </TouchableOpacity> 
    )
}
const renderCamera =(onPress)=>{
    return(
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
const Confirm =(onPress)=>{
    return(
        <TouchableOpacity
        onPress={onPress}
        style={{marginLeft:50}}
        >
             <FastImage
                 style={styles.ImageCamera}
                 source={R.images.ic_Send}
                 resizeMode={FastImage.resizeMode.contain}
                /> 
        </TouchableOpacity>
    )
}
const PostAvatarScreen =()=> {
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
          width: 400,
          height: 400,
          cropping: true,
        }).then((image) => {
          console.log(image);
          const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
          setImage(imageUri);
        });
      };
      // const submitPost = async () => {
      //   const imageUrl = await uploadImage();
      //   console.log('Image Url: ', imageUrl);
      //   console.log('Post: ', post);
    
      //   firestore()
      //   .collection('post')
      //   .add({
      //     userId: Fire.uid,
      //     post: post,
      //     postImg: imageUrl,
      //   })
      //   .then(() => {
      //     console.log('Post Added!');
      //     alert(
      //       'Post published!Your post has been published Successfully!',
      //     );
      //     setPost(null);
      //   })
      //   .catch((error) => {
      //     console.log('Something went wrong with added post to firestore.', error);
      //   });
      // }
    
      const uploadImage = async () => {
        if( image == null ) {
          return null;
        }
        const uploadUri = image;
        let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
        setUploading(true);
        setTransferred(0);
    
        const storageRef = Firebase.default.storage().ref().child(new Date().toLocaleDateString());
        const task = storageRef.put(uploadUri);
    
        try {
          await task;
    
          const url = await storageRef.getDownloadURL();
    
          setUploading(false);
          setImage(null);
    
          alert(
            'Image uploaded!Your image has been uploaded to the Firebase Cloud Storage Successfully!',
          );
          return url;
    
        } catch (e) {
          console.log(e);
          return null;
        }
      };
      // const filename = image.substring(image.lastIndexOf('/') + 1);
      // Reactotron.log("file",filename)
        return (
            <ScreenComponent 
            leftComponent={Back(() => {
                NavigationUtil.goBack();
              })}
              containerStyle={styles.ContainerHeader}
              statusBarProps={styles.ContainerHeader}
             children={
            <SafeAreaView style={styles.Container}>
                {renderAvatar(image,choosePhotoFromLibrary)}
                <View style={{flexDirection:"row"}}>
                {renderCamera(takePhotoFromCamera)}
                {Confirm(uploadImage)}
                </View>
            </SafeAreaView>
            }
            />
        )
}
const styles=StyleSheet.create({
    Container:{
        flex:1,
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:R.color.colors.white
    },
    ContainerImage:{
        alignItems: "center",
        justifyContent:"center",
        backgroundColor:R.color.colors.line
    },
    ImagePhoto:{
        height:height/3,
        width:width-50,
    },
    ImageCamera:{
        height:height/8,
        width:width/8,
    },
    HeaderBack: {flexDirection: 'row', width: width},
    TextHeader: {
        fontSize: 18,
        fontFamily: R.fonts.bold,
        color: R.color.colors.white,
        marginTop: 5,
      },
    ic_Back: {height: 16, width: 10, marginTop: 10, marginRight: 15},
    ContainerHeader: {backgroundColor: R.color.colors.Sienna1},
})
export default PostAvatarScreen;