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
import OneSignal from 'react-native-onesignal';
import { colors } from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
import { log } from 'react-native-reanimated';
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '../../utils/Constant';
const { height, width } = Dimensions.get('window');
const Back = (onPress, lable) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={image.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{lable}</Text>
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
  const { data, params,Key,navi } = route.params;
  const [loaData, setLoadata] = useState(false)
  const [studioOnesignal, setStudioOnesignal] = useState(null)
  const [uploading, setUploading] = useState(false);
  const Data = database()
  const [key, setKey] = useState(null)
  
  const Notification = async () => {
    const notificationObj = {
      contents: { en: R.string.NotificationMess + " " + params.user.Name },
      include_player_ids: [studioOnesignal]
    };
    const jsonString = JSON.stringify(notificationObj);
    OneSignal.postNotification(jsonString, (success) => {
      console.log("Success:", success);
    }, (error) => {
      console.log("Error:", error);
    });
  }
  const [readStudio, setReadStudio] = useState(DEFAULT_PARAMS.NO)
  const [newMessStudio, setnewMessStudio] = useState(DEFAULT_PARAMS.NO)
  const [image, setImage] = useState(null);
  const [ischeck,setIsCheck] =useState(true)
  const [imageMessages, setImageMessages] = useState(null);
  const [isLoading, setLoading] = useState(false);
  let MessagesUser = [];
  const roomKey = database().ref().push().key;
  const [OnlineStudio, setOnlineStudio] = useState(DEFAULT_PARAMS.NO)
  const [messagesUser, setMessagesUser] = useState([]);
  const [messagesStudio, setMessagesStudio] = useState([]);
  const callUserOnesignal = () => {
    try {
      Data
        .ref(`/UserIdOneSignal/${data._id}`)
        .on("value", snapot => {
          const { userId } = snapot.val()
          setStudioOnesignal(userId)
        })
    } catch (error) {

    }
  }
  const checkRoomsUSer = async () => {
    setLoading(true)
    setIsCheck(true)
    const check = await database().ref("Rooms").on('value', (snal) => {
      setLoading(false)
      snal ? snal.forEach(keyroom => {
        if (params.user.Category === "0" && keyroom.val().friend === data._id) {
          if (keyroom.val().me === params.user._id) {
            setKey(keyroom.val().key)
            setReadStudio(keyroom.val().RedStudio)
            setIsCheck(false)
            setnewMessStudio(keyroom.val().newMessStudio)
          }
        }
      }) : setReadStudio(DEFAULT_PARAMS.NO)
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
            Fire.OnSend(roomKey, "", "", key, downloadURL)
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
  const FirtMess = () => {
    if (key === null&&Key.key===null) {
      return Fire.creatZoom(params.user, data, data)
    }

  }
  const CallBackMess = (key) => {
    setLoading(true)
    setTimeout(async () => {
      const db = database().ref(`Messages/${key}/`)
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
          if (data.Category == DEFAULT_PARAMS.STUDIO) {
            MessagesUser.push(message)
            MessagesUser.sort((a, b) => {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            });
            setMessagesUser(() => {
              return GiftedChat.append(messagesUser, MessagesUser)
            })
          }
          setLoading(false)
        });
    }, 200);
  }
  const CheckOnlineStudio = (token) => {
    try {
      Data
        .ref(`/Online/${token}/`)
        .on("value", snapot => {
          const { OnlineStudio } = snapot.val();
          setOnlineStudio(OnlineStudio)
        })
    } catch (error) {

    }
  }
  const Send = (Messages = []) => {
    if (OnlineStudio === DEFAULT_PARAMS.NO) {
      Notification()
    }
    Fire.OnSend(roomKey, Messages[0].text, Messages[0].user, key, null, null, data, readStudio, null, newMessStudio, OnlineStudio, null,params.user, data)
    setLoadata(true)
  }
  useEffect(() => {
    callUserOnesignal()
    FirtMess()
    CheckOnlineStudio(data._id)
    checkRoomsUSer()
    setTimeout(() => {
      loaData === false ? CallBackMess(key) : null
    }, 500);
  }, [key]);
  console.log("key", key);

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

  console.log("data", data._id);
  console.log("params", params.user._id);
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        leftComponent={Back(() =>
          {
            navi.Put===DEFAULT_PARAMS.YES?NavigationUtil.navigate(SCREEN_ROUTER_APP.DETAILPUTCALENDAR):NavigationUtil.navigate(SCREEN_ROUTER.MAIN,{screen:SCREEN_ROUTER_APP.NOTIFY})
          } 
        , R.string.ChatWith + ' ' + data.Name)}
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
              params.user.Category === DEFAULT_PARAMS.USER ? messagesUser : messagesStudio
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
