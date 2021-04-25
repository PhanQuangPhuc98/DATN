import React, {useState, useEffect, useCallback} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import {GiftedChat, Send, Actions} from 'react-native-gifted-chat';
import FastImage from 'react-native-fast-image';
import ScreenComponent from '../../components/ScreenComponent';
import {colors} from '../../constants/Theme';
import NavigationUtil from '../../navigation/NavigationUtil';
const {height, width} = Dimensions.get('window');
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
      renderSend={renderSend}
      renderActions={renderActions}
      messages={messages}
      onSend={onSend}
      user={User}
    />
  );
};
const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        leftComponent={Back(() => {
          NavigationUtil.goBack();
        })}
        leftContainerStyle={{width: 200}}
        children={Infor(
          (messages) => {
            onSend(messages);
          },
          {
            _id: 1,
          },
          messages,
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: {flex: 1},
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
  Action: {justifyContent: 'center', alignItems: 'center', marginBottom: 12},
  ImgAction: {width: 25, aspectRatio: 1, marginLeft: 5},
  HeaderImg: {paddingTop: 10},
  Send: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    marginRight: 5,
  },
  ImageSearch: {height: 19, width: 37},
  ContainerHeader: {backgroundColor: colors.Sienna1},
  ic_Back: {height: 16, width: 10, marginTop: 10, marginRight: 15},
  HeaderBack: {flexDirection: 'row', width: width},
  TextHeader: {
    fontSize: 18,
    fontFamily: R.fonts.bold,
    color: colors.white,
    marginTop: 5,
  },
});
export default ChatScreen;
