import firebase from '@react-native-firebase/app';
import Auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import firestore from '@react-native-firebase/firestore';
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
  get uid(){
    return (firebase.auth().currentUser || {}).uid;
  }
  get name(){
    return(firebase.auth().currentUser||{}).displayName;
  }
  get ref(){
    const currentUser =firebase.auth().currentUser.uid;
    if(currentUser!=null){
      return firebase.database().ref('messages')
    }
  }
  get email(){
    return(firebase.auth().currentUser||{}).email;
  }
  creatZoom =(me,friend)=>{
    const db = firebase.database();
    const roomKey = db.ref(`rooms`).push().key;
    const update = {};
    /**
     * update room
     */
    update[`rooms/${roomKey}/me`] = me._id;
    update[`rooms/${roomKey}/friend`] = friend._id;
    update[`rooms/${roomKey}/key`] = roomKey;
    db.ref().update(update).catch(error => console.log('registerRoomError', error));
    return roomKey;
  }
  parse = snapshot => {
    const { createdAt: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const createdAt = new Date(numberStamp);
    const message = {_id, createdAt, text, user};
    return message;
  };
  on =callback=>{
    this.ref
    .limitToLast(100)
    .on('child_added', snapshot => callback(this.parse(snapshot)));
  }
  get timestamp(){
    return firebase.database.ServerValue.TIMESTAMP;
  }
  OnSend =(me,friend,text,user,roomKey)=>{
    const db = firebase.database();
    if(roomKey ===null){
      roomKey=this.creatZoom(me,friend)
      console.log(roomKey);
    }
    db.ref(`messages/${roomKey}/rooms`).push({
      text,
      user,
      createdAt: this.timestamp
  });
  }
  send = (messages=[]) => {
      // for(let i =0;i<messages.length;i++){
      //   const { text, user } = messages[i];
      //   const message = {text, user, createdAt: this.timestamp};
      //   this.append(message);
      // }
      console.log("mess",messages);
      
  };
  append = message => this.ref.push(message);

  off(){
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