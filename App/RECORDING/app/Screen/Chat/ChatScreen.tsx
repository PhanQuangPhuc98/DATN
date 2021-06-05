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
import {CutOneArrayObject} from '../../utils/FuncHelper';
import Fire, { Auth, database } from '../../firebase/firebaseSvc'
import image from '../../assets/imagesAsset';
import Reactotron from 'reactotron-react-native';
import { GiftedChat, Send, Actions } from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';
import { ASYNC_STORAGE, DEFAULT_PARAMS } from '../../constants/Constant'
import ScreenComponent from '../../components/ScreenComponent';
import AsyncStorage from '@react-native-community/async-storage';
import { colors } from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
const { height, width } = Dimensions.get('window');
const Back = (onPress) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.HeaderBack}>
      <FastImage
        style={styles.ic_Back}
        source={image.ic_back}
        resizeMode={FastImage.resizeMode.contain}></FastImage>
      <Text style={styles.TextHeader}>{R.string.Chat}</Text>
    </TouchableOpacity>
  );
};
const renderActions = () => {
  return (
    <TouchableOpacity style={styles.Action}>
      <FastImage
        style={styles.ImgAction}
        source={image.ic_ios_camera}
        resizeMode="contain"></FastImage>
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
  const { data, params, Key } = route.params;
  const [loaData,setLoadata]=useState(false)
  const [key, setKey] = useState(null)
  const [ZoomId,setZoomId]=useState(null)
  const [isLoading, setLoading] = useState(false);
  let Messages = [];
  const [messages, setMessages] = useState([]);

  const checkRoomsUSer = async () => {
    setLoading(true)
    const check = await database().ref("rooms").on('value', (snal) => {
      setLoading(false)
      snal ? snal.forEach(keyroom => {
        if (params.user.Category === "0" && keyroom.val().friend === data._id) {
          if (keyroom.val().me === params.user._id) {
            setKey(keyroom.val().key)
            setZoomId(keyroom.val().key)
          }
        }
      }) : null
    })
  }
  const checkRoomsStudio = async () => {
    setLoading(true)
    const check = await database().ref("rooms").on('value', (snal) => {
      setLoading(false)
      snal ? snal.forEach(keyroom => {
        if (params.user.Category === "1" && keyroom.val().me === data._id) {
          if (keyroom.val().friend === params.user._id) {
            setKey(keyroom.val().key)
            setZoomId(keyroom.val().key)
          }
        }
      }) : null
    })
  }
  const FirtMess = () => {
    if (key === null && Key.key === null) {
    return Fire.creatZoom(params.user, data, data)
    } 

  }
 

  const getZooomID =()=>{
    if(key===null){
         setZoomId(Key.key)
      }
    else if(Key.key===null){
       setZoomId(key)
    }
    else if(key){
      setZoomId(key)
    }
    else if(Key.key!=null)
    {
      setZoomId(Key.key)
    }
  }
  const CallBackMess = (ZoomId) => {
    //setLoading(true)
    setTimeout(async () => {
      const db = await database().ref(`messages/${ZoomId}/rooms/`)
      if (!db) {
        console.log("not network");
        alert("not network")
      }
      db.limitToLast(100)
        .on('child_added', snapshot => {
          setLoading(false)
          const { _id, createdAt: numberStamp, text, user } = snapshot.val()
          const createdAt = new Date(numberStamp);
          const message = { _id, createdAt, text, user };

          Messages.push(message)

          Messages.sort((a, b) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          });
          setLoading(false)
          setMessages(Messages)
        });
    }, 1000);
  }
  const Send = (Messages = []) => {
    const roomKey = database().ref().push().key;
    CallBackMess(key)
    Fire.OnSend(roomKey,Messages[0].text, Messages[0].user, key)
    setLoadata(true)
  }
  useEffect(() => {
    FirtMess()
    params.user.Category === "0" ? checkRoomsUSer() : params.user.Category === "1" ? checkRoomsStudio() : null
    getZooomID()
    setTimeout(() => {
      loaData ===false?CallBackMess(key):null
    }, 300);
  }, [key]);
  data.Category == DEFAULT_PARAMS.USER ? messages.shift():messages
  console.log('key2', Key.key);
  console.log("key1", key);
  console.log("Zooomid",ZoomId)
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
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
              messages,
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
