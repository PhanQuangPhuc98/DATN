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
const Back = () => {
  return (
    <TouchableOpacity style={styles.HeaderBack}>
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
        source={image.ic_IMG}
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
          source={image.ic_SendMess}></FastImage>
      </View>
    </Send>
  );
};
const Infor = () => {
  return (
    // <View style={styles.CantainerInfor}>
    //   <TouchableOpacity style={styles.HeaderImg}>
    //     <FastImage
    //       style={styles.ImageSearch}
    //       source={image.ic_IMG}
    //       resizeMode={FastImage.resizeMode.contain}></FastImage>
    //   </TouchableOpacity>
    //   <TextInput
    //     style={styles.TextInputStyle}
    //     onChangeText={onChangeText}
    //     placeholder={placeholder}
    //     placeholderTextColor={colors.focus}
    //     value={value}
    //     secureTextEntry={secureTextEntry}
    //     autoCompleteType={'off'}
    //   />
    //   <TouchableOpacity style={styles.HeaderImg}>
    //     <FastImage
    //       style={[styles.ImageSearch, {height: 26, width: 26}]}
    //       source={image.ic_Send}
    //       resizeMode={FastImage.resizeMode.contain}></FastImage>
    //   </TouchableOpacity>
    // </View>
    <GiftedChat
      textInputStyle={styles.TextInputStyle}
      timeFormat="HH:mm:ss"
      dateFormat="DD/MM/YYYY"
      placeholder={R.string.messenger}
      renderSend={renderSend}
      renderActions={renderActions}
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
  return (
    <SafeAreaView style={styles.Container}>
      <ScreenComponent
        containerStyle={styles.ContainerHeader}
        statusBarProps={styles.ContainerHeader}
        leftComponent={Back()}
        leftContainerStyle={{width: 200}}
        children={<View style={styles.Container}>{Infor()}</View>}
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
  ImgAction: {width: 20, aspectRatio: 1},
  HeaderImg: {paddingTop: 10},
  Send: {justifyContent: 'center', alignItems: 'center', marginBottom: 12},
  ImageSearch: {height: 19, width: 37},
  ContainerHeader: {backgroundColor: colors.Sienna1},
  ic_Back: {height: 16, width: 10, marginTop: 10, marginRight: 15},
  HeaderBack: {flexDirection: 'row', width: width},
  TextHeader: {fontSize: 23, fontFamily: R.fonts.bold, color: colors.white},
});
export default ChatScreen;
