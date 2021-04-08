import React from 'react';
import firebase from '@react-native-firebase/app';
import auth from '@react-native-firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDNdbvZCWA9socHS0nt8ulJ3bfoOiJXRVE',
  authDomain: 'recording-c2188.firebaseapp.com',
  projectId: 'recording-c2188',
  storageBucket: 'recording-c2188.appspot.com',
  messagingSenderId: '657095121114',
  appId: '1:657095121114:web:e7f1238acb0d92cad16de3',
  measurementId: 'G-Q10VBB5K7D',
};
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export default () => {
  return {firebase};
};
