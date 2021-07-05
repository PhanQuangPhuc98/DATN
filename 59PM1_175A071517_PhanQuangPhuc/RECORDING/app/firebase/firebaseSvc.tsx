import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
import { getCurrentDate } from '../utils/FuncHelper';
import { DEFAULT_PARAMS } from '../constants/Constant';
import R from '../assets/R';
import storage from '@react-native-firebase/storage';
class FirebaseSvc {
  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp({
        apiKey: "AIzaSyDNdbvZCWA9socHS0nt8ulJ3bfoOiJXRVE",
        authDomain: "recording-c2188.firebaseapp.com",
        databaseURL: "https://recording-c2188-default-rtdb.firebaseio.com",
        projectId: "recording-c2188",
        storageBucket: "recording-c2188.appspot.com",
        messagingSenderId: "657095121114",
        appId: "1:657095121114:web:e7f1238acb0d92cad16de3",
        measurementId: "G-Q10VBB5K7D"
      })
    }
  }
  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
  get name() {
    return (firebase.auth().currentUser || {}).displayName;
  }
  get ref() {
    const currentUser = firebase.auth().currentUser.uid;
    if (currentUser != null) {
      return firebase.database().ref('Messages')
    }
  }
  get email() {
    return (firebase.auth().currentUser || {}).email;
  }
  creatZoom = async (me, friend, data) => {
    const db = await firebase.database();
    const roomKey = db.ref(`Rooms`).push().key;
    const update = {};
    /**
     * update room
     */
    update[`Rooms/${roomKey}/me`] = me._id;
    update[`Rooms/${roomKey}/friend`] = friend._id;
    update[`Rooms/${roomKey}/key`] = roomKey;
    db.ref().update(update).catch(error => console.log('registerRoomError', error));
    db.ref(`Messages/${roomKey}/`).push({
      _id: 1,
      text: R.string.help,
      createdAt: new Date().getTime(),
      user: {
        _id: 2,
        name: data.Name,
        avatar: data.Image,
      },
    })
    return roomKey;
  }
  get timestamp() {
    return firebase.database.ServerValue.TIMESTAMP;
  }
  OnSend = (_id, text, user, roomKey, image, Category, friend, RedStudio, RedUser,newMessStudio,OnlineStudio,OnlineUser,data,params) => {
    const db = firebase.database();
    const NotificationKey = db.ref().push().key;
    // console.log("helloPhuc", Category);
    // console.log("RedStudio", RedStudio);
    // console.log("RedUser", RedUser);
    console.log("Online",OnlineStudio);
    console.log("OnlineUser",OnlineUser);
    const updateUser = {};
    if (Category != "1" || Category != 1) {
      /**Update Room */
      updateUser[`Rooms/${roomKey}/messagesUser`] = text;
      updateUser[`Rooms/${roomKey}/name`] = user.name;
      updateUser[`Rooms/${roomKey}/avatar`] = user.avatar;
      updateUser[`Rooms/${roomKey}/newCategory`] = DEFAULT_PARAMS.USER;
      if(newMessStudio===DEFAULT_PARAMS.NO||newMessStudio===DEFAULT_PARAMS.UNDEFINED){
        updateUser[`Rooms/${roomKey}/newMessUser`] = DEFAULT_PARAMS.YES;
      }
    //  ` updateUser[`Rooms/${roomKey}/Read`] = DEFAULT_PARAMS.NO;`
    if (RedStudio === DEFAULT_PARAMS.NO||RedStudio === DEFAULT_PARAMS.UNDEFINED) {
      updateUser[`Rooms/${roomKey}/RedStudio`] = DEFAULT_PARAMS.NO;
    }
      updateUser[`Rooms/${roomKey}/RedUser`] = DEFAULT_PARAMS.YES;
      /** Update Notification */
      if (OnlineStudio === DEFAULT_PARAMS.NO) {
      updateUser[`Notification/${NotificationKey}/NameUser`] = user.name;
      // updateUser[`Notification/${NotificatoinKey}/IdUser`] = user._id;
      updateUser[`Notification/${NotificationKey}/IdStudio`] = friend._id;
      updateUser[`Notification/${NotificationKey}/RedStudio`] = DEFAULT_PARAMS.NO;
      updateUser[`Notification/${NotificationKey}/RedUser`] = DEFAULT_PARAMS.YES;
      updateUser[`Notification/${NotificationKey}/key`] = NotificationKey;
      updateUser[`Notification/${NotificationKey}/Date`] = getCurrentDate();
      updateUser[`Notification/${NotificationKey}/Put`] = DEFAULT_PARAMS.NO;
      updateUser[`Notification/${NotificationKey}/Messages`] = DEFAULT_PARAMS.YES;
      updateUser[`Notification/${NotificationKey}/Data`] = data;
      updateUser[`Notification/${NotificationKey}/Params`] = params;
      updateUser[`Notification/${NotificationKey}/roomKey`] = roomKey;
      }
    }
    if (Category === "1" || Category === 1) {
      /**Update Room */
      updateUser[`Rooms/${roomKey}/newCategory`] = DEFAULT_PARAMS.STUDIO;
      updateUser[`Rooms/${roomKey}/newMessStudio`] = DEFAULT_PARAMS.YES;
      updateUser[`Rooms/${roomKey}/messagesStudio`] = text;
      // updateUser[`Rooms/${roomKey}/Read`] = DEFAULT_PARAMS.YES;
      if (RedUser === DEFAULT_PARAMS.NO||RedStudio === DEFAULT_PARAMS.UNDEFINED){
        updateUser[`Rooms/${roomKey}/RedUser`] = DEFAULT_PARAMS.NO;
      }
      updateUser[`Rooms/${roomKey}/RedStudio`] = DEFAULT_PARAMS.YES;
      /** Update Notification */
      if (OnlineUser === DEFAULT_PARAMS.NO) {
      updateUser[`Notification/${NotificationKey}/NameUser`] = user.name;
      updateUser[`Notification/${NotificationKey}/IdUser`] = friend;
      updateUser[`Notification/${NotificationKey}/key`] = NotificationKey;
      // updateUser[`Notification/${NotificatoinKey}/IdStudio`] =user._id ;
      // updateUser[`Notification/${NotificationKey}/Red`] = DEFAULT_PARAMS.NO;
      updateUser[`Notification/${NotificationKey}/Date`] = getCurrentDate();
      updateUser[`Notification/${NotificationKey}/Put`] = DEFAULT_PARAMS.NO;
      updateUser[`Notification/${NotificationKey}/RedStudio`] = DEFAULT_PARAMS.YES;
      updateUser[`Notification/${NotificationKey}/RedUser`] = DEFAULT_PARAMS.NO;
      updateUser[`Notification/${NotificationKey}/Messages`] = DEFAULT_PARAMS.YES;
      updateUser[`Notification/${NotificationKey}/Data`] = data;
      updateUser[`Notification/${NotificationKey}/Params`] = params;
      updateUser[`Notification/${NotificationKey}/roomKey`] = roomKey;
      }
    }
    db.ref().update(updateUser).catch(error => console.log('registerRoomError', error));
    db.ref(`Messages/${roomKey}/`).push({
      _id,
      text,
      user,
      createdAt: this.timestamp,
      image
    });
  }
  append = message => this.ref.push(message);

  off() {
    this.ref.off();
  }
}

const firebaseSvc = new FirebaseSvc();
export {
  firebase,
  Auth,
  database,
  firestore,
  storage,
}
export default firebaseSvc;