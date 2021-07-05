import React, { Component } from 'react'
import { Text, View } from 'react-native'
import OneSignal from 'react-native-onesignal';
export default class AppContainer extends Component {
    constructor(properties) {
        super(properties);
         //Remove this method to stop OneSignal Debugging 
         OneSignal.setLogLevel(6, 0);
        
         // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
         OneSignal.setAppId("60b86870-551c-4dd1-9bdd-23ef1d247672");
      }
        componentWillUnmount() {
        }

}
