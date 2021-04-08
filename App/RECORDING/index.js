/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import firebaseConfig from './app/firebase/firebaseConfig'
AppRegistry.registerComponent(appName, () => App);
if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}