import React from 'react';
import {
  StyleSheet,
} from 'react-native';
import AppNavigatior from './app/navigation/AppNavigatior';
import { Provider } from "react-redux";
import store from './app/redux/store'
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigatior>
      </AppNavigatior>
    </Provider>
  )
};
export default App;
