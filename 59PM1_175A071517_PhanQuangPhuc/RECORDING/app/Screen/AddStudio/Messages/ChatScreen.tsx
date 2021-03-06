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
} from 'react-native';
import R from '../../../assets/R';
import { firebase } from '../../../firebase/firebaseSvc'
import Fire, { Auth, database, storage } from '../../../firebase/firebaseSvc'
import ImagePicker from 'react-native-image-crop-picker'
import image from '../../../assets/imagesAsset';
import Reactotron from 'reactotron-react-native';
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';
import OneSignal from 'react-native-onesignal';
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../../constants/Constant'
import ScreenComponent from '../../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../../constants/Theme';
import NavigationUtil from '../../../navigation/NavigationUtil';
const { height, width } = Dimensions.get('window');
const Back = (onPress, lable) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={image.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{R.string.ChatWithUser + " " + lable}</Text>
    </TouchableOpacity>
  );
};
const renderSend = (props) => {
  return (
    <Send {...props}>
      <View style={styles.Send}>
        <FastImage
          style={styles.ImgAction}
          resizeMode="contain"
          source={image.ic_SendMess}
          tintColor={colors.Sienna1}></FastImage>
      </View>
    </Send>
  );
};
const renderIsloading = () => {
  return (
    <SafeAreaView style={styles.containerLoading}>
      <Text style={styles.TextLoading}>
        {R.string.loadingMesse}
      </Text>
    </SafeAreaView>
  )
}
const ChatScreen = ({ route, navigation, ...props }) => {
  const { data, params } = route.params;
  const [loaData, setLoadata] = useState(false)
  const [customer, setCustomer] = useState({
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
  });
  const [uploading, setUploading] = useState(false);
  const [userOnesignal, setUserOnesignal] = useState(null)
  const [image, setImage] = useState(null);
  const Data = database()
  const [imageMessages, setImageMessages] = useState(null);
  const [OnlineUser, setOnlineUser] = useState(DEFAULT_PARAMS.NO)
  const [isLoading, setLoading] = useState(false);
  let MessagesStudio = [];
  const roomKey = database().ref().push().key;
  const [messagesStudio, setMessagesStudio] = useState([]);
  const [category, setCategory] = useState({
    id: ''
  })
  const callUserOnesignal = () => {
    try {
      Data
        .ref(`/UserIdOneSignal/${data.me}`)
        .on("value", snapot => {
          const { userId } = snapot.val()
          setUserOnesignal(userId)
        })
    } catch (error) {

    }
  }
  const Notification = async () => {
    // const { userId,pushToken } = await OneSignal.getDeviceState();
    // console.log("userId",userId);

    const notificationObj = {
      contents: { en: R.string.NotificationMessStudio + " " + params.user.Name },
      include_player_ids: [userOnesignal]
    };
    const jsonString = JSON.stringify(notificationObj);
    OneSignal.postNotification(jsonString, (success) => {
      console.log("Success:", success);
    }, (error) => {
      console.log("Error:", error);
    });
  }
  const DB = async () => {
    let Category = await AsyncStorage.getItem(ASYNC_STORAGE.CATEGORY);
    setCategory({
      ...category,
      id: Category
    })
  }
  const uploadImage = async (image) => {
    if (image == null) {
      return null;
    }
    setUploading(true)
    const update = await firebase.storage()
      .ref('imageMessages/' + Fire.uid)
      .putFile(image)
      .then(() => {
        setUploading(false)
        console.log('Image Upload Successfully');
        storage()
          .ref('imageMessages/' + Fire.uid)
          .getDownloadURL()
          .then((downloadURL) => {
            setImageMessages(downloadURL)
            Fire.OnSend(roomKey, "", "", data.key, downloadURL)
          })
      })

  };
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
      uploadImage(imageUri)
    });

  };
  const CallBackMess = (key) => {
    setLoading(true)
    setTimeout(async () => {
      const db = await database().ref(`Messages/${key}/`)
      if (!db) {
        console.log("not network");
        alert("not network")
      }
      db.limitToLast(100)
        .on('child_added', snapshot => {
          setLoading(false)
          const { _id, createdAt: numberStamp, text, user, image } = snapshot.val()
          const createdAt = new Date(numberStamp);
          const message = { _id, createdAt, text, user, image };
          if (_id != 1) {
            MessagesStudio.push(message)

            MessagesStudio.sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setMessagesStudio(() => {
              return GiftedChat.append(messagesStudio, MessagesStudio)
            })
          }
        });
    }, 200);
  }
  const Send = (Messages = []) => {
    if (OnlineUser === DEFAULT_PARAMS.NO) {
      Notification()
    }
    Fire.OnSend(roomKey, Messages[0].text, Messages[0].user, data.key, null, category.id, data.me, null, data.RedUser, null, null, OnlineUser, params.user,customer)
    setLoadata(true)
  }
  const UpdateRead = (roomKey) => {
    try {
      Data
        .ref(`Rooms/${roomKey}/`)
        .update({
          RedStudio: DEFAULT_PARAMS.NO,
          newMessStudio: DEFAULT_PARAMS.NO
        })
    } catch (error) {
      console.log(error);
    }
  }
  const CheckOnlineUser = (token) => {
    try {
      Data
        .ref(`/Online/${token}/`)
        .on("value", snapot => {
          const { OnlineUser } = snapot.val();
          setOnlineUser(OnlineUser)
        })
    } catch (error) {

    }
  }
  const CallCustomer = () => {
    setTimeout(() => {
      try {
        Data
          .ref(`/Users/${data.me}`)
          .once("value", snaphot => {
            setCustomer({
              ...customer,
              _id: snaphot.val()._id,
              Image: snaphot.val().Image,
              Name: snaphot.val().Name,
              Category: snaphot.val().Category,
              Email: snaphot.val().email,
              Phone: snaphot.val().Phone,
              Sex: snaphot.val().Sex,
              Birth_Day: snaphot.val().Birth_Day,
              City: snaphot.val().City,
              District: snaphot.val().District,
              Address: snaphot.val().Address,
            })
          })
      } catch (error) {
        console.log(error);
      }
    },1000)
  }
  useEffect(() => {
    callUserOnesignal()
    DB()
    CallCustomer()
    CheckOnlineUser(data.me)
    setTimeout(() => {
      CallBackMess(data.key)
    }, 500);
  }, []);
  console.log("customer",customer); 
  // console.log("Data",data);
  const renderActions = () => {
    return (
      <TouchableOpacity
        onPress={() => { takePhotoFromCamera() }}
        style={styles.Action}>
        <FastImage
          style={styles.ImgAction}
          source={R.images.ic_ios_camera}
          resizeMode="contain"></FastImage>
      </TouchableOpacity>
    );
  };
  const Infor = (onSend, User, messages) => {
    return (
      <GiftedChat
        textInputStyle={styles.TextInputStyle}
        timeFormat="HH:mm:ss"
        dateFormat="DD/MM/YYYY"
        placeholder={R.string.messenger}
        // showUserAvatar ={true}
        // showAvatarForEveryMessage={true}
        primaryStyle={{ backgroundColor: 'white', marginHorizontal: 5, borderRadius: 20, marginTop: Platform.OS == 'android' ? 5 : 0 }}
        renderSend={renderSend}
        alwaysShowSend={true}
        renderActions={renderActions}
        messages={messages}
        onSend={onSend}
        user={User}
      />
    );
  };
  console.log("Acout", data.RedUser)
  // Reactotron.log("Me",params.user.Image)
  // console.log("Category",category.id);

  //   console.log('key2', Key.key);
  // console.log("key1", key);
  // console.log("Zooomid", ZoomId);
  // console.log("messseuser", messagesUser);
  // Reactotron.log("messseStudio", messagesStudio);
  // console.log("image",image);
  // console.log("imageMess",imageMessages);
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        leftComponent={Back(() => {
          NavigationUtil.goBack();
          UpdateRead(data.key)
        }, data.name)}
        leftContainerStyle={{ width: 200 }}
        children={
          isLoading === true ? renderIsloading() :
            Infor(
              Send,
              {
                _id: Fire.uid,
                name: Fire.name,
                avatar: params.user.Image,
                createdAt: new Date().getTime()
              },
              messagesStudio
            )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: { flex: 1 },
  CantainerInfor: {
    flexDirection: 'row',
    paddingHorizontal: 5,
    borderTopWidth: 0.5,
    borderColor: colors.focus,
  },
  TextInputStyle: {
    borderWidth: 0.5,
    paddingHorizontal: 5,
    marginRight: 7,
    borderRadius: 5,
  },
  Action: { justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  ImgAction: { width: 25, aspectRatio: 1, marginLeft: 5 },
  HeaderImg: { paddingTop: 10 },
  Send: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 5,
  },
  ImageSearch: { height: 19, width: 37 },
  ContainerHeader: { backgroundColor: colors.Sienna1 },
  ic_Back: { height: 16, width: 10, marginTop: 10, marginRight: 15 },
  HeaderBack: { flexDirection: 'row', width: width },
  TextHeader: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    marginTop: 5,
  },
  containerLoading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  TextLoading: {
    textAlign: "center",
    color: R.color.colors.Sienna1,
    fontFamily: R.fonts.bold,
    fontSize: 18
  }
});
export default ChatScreen;
