import React,{useEffect} from 'react';
import AppNavigatior from './app/navigation/AppNavigatior';
import OneSignal from 'react-native-onesignal';
import { Provider } from "react-redux";
import store from './app/redux/store'
const App = ({...props}) => {
  useEffect(() => {
    OneSignal.setLogLevel(6, 0);
    OneSignal.setAppId("60b86870-551c-4dd1-9bdd-23ef1d247672");
    OneSignal.requiresUserPrivacyConsent(()=>{
      
    })
  }, [])
  return (
    <Provider store={store}>
       {/* <AppContainer/> */}
       <AppNavigatior/>
    </Provider>
  )
};
export default App;
