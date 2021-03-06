import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, ScrollView, StatusBar, SafeAreaView, TouchableOpacity, Dimensions, FlatList,Platform } from 'react-native';
import { colors } from '../../constants/Theme';
import R from '../../assets/R';
import image from '../../assets/imagesAsset';
import {getCurrentDate} from '../../utils/FuncHelper';
import NavigationUtil from '../../navigation/NavigationUtil'
import {
  SCREEN_ROUTER_AUTH,
  SCREEN_ROUTER,
  SCREEN_ROUTER_APP,
} from '../../utils/Constant';
import AsyncStorage from '@react-native-community/async-storage';
import FastImage from 'react-native-fast-image';
import { showConfirm } from '../../utils/AlertHelper'
import { firebase, Auth } from '../../firebase/firebaseSvc'
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import {
  DataImageProduct,
  DataImage,
  DataPromotion,
} from '../../constants/Mockup';
import { ASYNC_STORAGE } from '../../constants/Constant'
import ButtonAnimation from '../../components/ButtonAnimation';
import Reactotron from 'reactotron-react-native';
import ModalDrop from '../../components/ModalDrop'
const { height, width } = Dimensions.get('window');
const Search = (onPress) => {
  return (
    <TouchableOpacity style={styles.SearchStyle} onPress={onPress}>
      <View style={styles.HeaderSearch}>
        <FastImage
          style={styles.ImageSearch}
          source={image.ic_Search}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
      <Text style={[styles.TextSearch, { marginVertical: 5 }]}>
        {R.string.search}
      </Text>
    </TouchableOpacity>
  );
};
const Information = (label, Add, onPress) => {
  return (
    <View style={styles.ContainerInfor}>
      <Text style={[styles.TextSearch, { fontSize: 15, fontFamily: R.fonts.bold, color: colors.Sienna1, width: 200, marginRight: Platform.Version==23?50:70 }]}>
        {label}
      </Text>
      <TouchableOpacity
        onPress={onPress}
      >
        <Text style={[styles.TextSearch, { fontSize: 15, fontFamily: R.fonts.bold, color: colors.focus }]}>
          {Add}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const RenderImage = ({ index, item }) => {
  return (
    <View>
      <FastImage
        style={styles.StyleList}
        source={item.img}
      />
    </View>
  )
}
const SliderBar = () => {
  return (
    <View style={styles.FontSlider}>
      <SwiperFlatList
        autoplay
        autoplayDelay={3}
        autoplayLoop
        data={DataImage}
        index={0}
        renderItem={RenderImage}
        showPagination={true}
        paginationActiveColor={colors.Sienna1}
        paginationStyleItem={styles.NormalDot}
        paginationStyleItemActive={[
          styles.NormalDot,
          { height: 16, width: 16 },
        ]}
        paginationStyleItemInactive={[
          styles.NormalDot,
          { backgroundColor: colors.Sienna1 },
        ]}
      />
    </View>
  );
}
const RenderItemProduct = ({ index, item }) => {
  return (
    <View style={[styles.StyleProduct, { height: 164, width: 121, backgroundColor: colors.Sienna1, marginHorizontal: 5, borderRadius: 7 }]}>
      <FastImage
        style={styles.ImgProduct}
        source={item.img}
      />
      <View style={styles.TextProduct}>
        <Text style={[styles.TextSearch, { fontSize: 14, fontFamily: R.fonts.bold, color: colors.black, height: 36 }]}>
          {item.name}
        </Text>
        <Text style={[styles.TextSearch, { fontSize: 12, fontFamily: R.fonts.bold, color: colors.Sienna1 }]}>
          {item.price}+{" "}+VND
            </Text>
      </View>
    </View>
  )
}
const RenderItemPromotion = ({ index, item }) => {
  return (
    <View style={styles.ViewPromotion}>
      <FastImage
        style={styles.imgPromotion}
        source={item.img}
      />
      <View>
        <View style={{ marginHorizontal: 5 }}>
          <Text style={styles.TextPromotion}>
            {item.name}
          </Text>
          <Text style={[styles.TextPromotion, { height: 32, width: 291, fontSize: 11, color: colors.focus }]}>
            {item.content}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <FastImage
            style={styles.imgDate}
            source={image.ic_Date}
          />
          <Text>
            {item.Date}
          </Text>
        </View>
      </View>
    </View>
  )
}
const ListImage = () => {
  return (
    <View>
      <FlatList
        data={DataImageProduct}
        keyExtractor={(item, index) => {
          item.ID;
        }}
        showsHorizontalScrollIndicator={false}
        renderItem={RenderItemProduct}
        horizontal={true}
      />
    </View>
  );
}
const ListPromotion = () => {
  return (
    <ScrollView
      style={{ backgroundColor: colors.white }}
      showsVerticalScrollIndicator={false}>
      <FlatList
        data={DataPromotion}
        keyExtractor={(index, item) => {
          index.ID;
        }}
        renderItem={RenderItemPromotion}
      />
    </ScrollView>
  );
}
const HomeScreen = ({ navigation }) => {
  const [token, setToken] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  const checkToken = async () => {
    const res = await AsyncStorage.getItem(ASYNC_STORAGE.TOKEN);
    Reactotron.log('res', res);
    if (res) {
      setToken(res);
    } else if (!res) {
      setToken(null);
    }
  };
  useEffect(() => {
    Auth().onAuthStateChanged(user => {
      if (user) {
        console.log("state = definitely signed in")
      }
      else {
        console.log("state = definitely signed out")
      }
    })
    const unsubscribe = navigation.addListener('focus', () => {
      checkToken();
      Auth().onAuthStateChanged(user => {
        if (user) {
          console.log("state = definitely signed in")
        }
        else {
          console.log("state = definitely signed out")
        }
      })
    });
    return unsubscribe;
  }, [navigation]);

  console.log("Time",getCurrentDate());
  Reactotron.log('setToken', token);

  return (
    <SafeAreaView style={styles.Container}>
      <View style={styles.Container}>
        <StatusBar barStyle="light-content" backgroundColor={colors.Sienna1} />
        <View
          style={{
            height: width / 3,
            backgroundColor: colors.Sienna1,
            paddingVertical: 35,
            paddingHorizontal: 25
          }}>
          {Search(() => {
            NavigationUtil.navigate(SCREEN_ROUTER.APP, {
              screen: SCREEN_ROUTER_APP.SEARCH,
            });
          })}
        </View>
        <ScrollView
        showsVerticalScrollIndicator={false}
        >
          {SliderBar()}
          {Information('SẢN PHẨM', 'Xem thêm >>')}
          {ListImage()}
          <View style={{ backgroundColor: colors.white, marginTop: 10 }}>
            {Information('KHUYẾN MẠI', 'Xem thêm >>')}
          </View>
          {ListPromotion()}
          {/* <View 
        style={styles.Animated}>
          <ButtonAnimation
            ButtonMess={() => {
              if (!token) {
                showConfirm(
                  R.string.notification,
                  'Vui lòng đăng nhập để thực hiện chức năng này',
                  () =>
                    NavigationUtil.navigate(SCREEN_ROUTER.AUTH, {
                      screen: SCREEN_ROUTER_AUTH.LOGIN,
                    }),
                  null,
                  'Đăng nhập',
                );
                return;
              } else {
                NavigationUtil.navigate(SCREEN_ROUTER.APP, {
                  screen: SCREEN_ROUTER_APP.LISTCHAT,
                  params:{user:"hello"}
                });
              }
            }}
            //ButtonPhone={toggleModal}
          />
        </View> */}
          <ModalDrop
            toggleModal={toggleModal}
            isModalVisible={isModalVisible}
            cancle={R.string.cancle}
            confirm={R.string.confirm}
            content={R.string.calladmin}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Container: { flex: 1, backgroundColor: colors.primary },
  HeaderStyle: { backgroundColor: colors.Sienna1 },
  SearchStyle: { width: width - 50, height: 44, backgroundColor: colors.white, flexDirection: "row", borderRadius: 10, marginVertical: 30 },
  TextSearch: { fontSize: 20, fontFamily: R.fonts.regular },
  HeaderSearch: { height: "100%", width: 30, alignItems: "center", justifyContent: "center" },
  ImageSearch: { height: 16, width: 16 },
  StyleList: { width: width - 10, height: 170, borderRadius: 7, marginHorizontal: 5 },
  FontSlider: { backgroundColor: colors.Sienna1, borderBottomRightRadius: 140, borderBottomLeftRadius: 140 },
  NormalDot: { height: 12, width: 12, borderRadius: 12, backgroundColor: colors.Sienna1, marginHorizontal: 4 },
  StyleProduct: { width: width - 10, height: 76, borderRadius: 5, backgroundColor: colors.white },
  ContainerInfor: { height: 30, flexDirection: "row", backgroundColor: colors.white, paddingHorizontal: Platform.Version==23?5:10, },
  ImgProduct: { height: 89, width: 121, borderTopRightRadius: 7, borderTopLeftRadius: 7 },
  TextProduct: { backgroundColor: colors.white, height: 76, padding: 5, borderBottomLeftRadius: 7, borderBottomRightRadius: 7 },
  ViewPromotion: { flexDirection: "row", marginHorizontal: 5, marginVertical: 5 },
  imgPromotion: { height: 88, width: 88, borderRadius: 5 },
  imgDate: { height: 11.74, width: 11.87, marginHorizontal: 5, marginTop: 5 },
  TextPromotion: { fontSize: 15, fontFamily: R.fonts.bold },
  Animated: { flex: 1, top: 40, position: "absolute", right: 30 }
})
export default HomeScreen;