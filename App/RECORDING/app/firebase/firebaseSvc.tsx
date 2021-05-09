import * as Firebase from "firebase"
// import  'firebase/app'
// import  'firebase/auth'
// import  'firebase/database'
class FirebaseSvc {
  constructor() {
    if (!Firebase.default.apps.length) {
      Firebase.default.initializeApp({
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
    return (Firebase.default.auth().currentUser || {}).uid;
  }
  get name(){
    return(Firebase.default.auth().currentUser||{}).displayName;
  }
  get ref(){
    const currentUser =Firebase.default.auth().currentUser.uid;
    if(currentUser!=null){
      return Firebase.default.database().ref('messages')
    }
  }
  get email(){
    return(Firebase.default.auth().currentUser||{}).email;
  }
  parse = snapshot => {
    const { timestamp: numberStamp, text, user } = snapshot.val();
    const { key: _id } = snapshot;
    const timestamp = new Date(numberStamp);
    const message = {_id, timestamp, text, user};
    return message;
  };
  on =callback=>{
    this.ref
    .limitToLast(100)
    .on('child_added', snapshot => callback(this.parse(snapshot)));
  }
  get timestamp(){
    return Firebase.default.database.ServerValue.TIMESTAMP;
  }

  send = (messages=[]) => {
    for (let i = 0; i < messages.length; i++) {
      const { text, user } = messages[i];
      const message = {text, user, createdAt: this.timestamp, };
      this.append(message);
    }
  };
  append = message => this.ref.push(message);

  off(){
    this.ref.off();
  }
}
const firebaseSvc = new FirebaseSvc();
export default firebaseSvc;