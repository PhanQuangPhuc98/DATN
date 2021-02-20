/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import AppNavigatior from './app/navigation/AppNavigatior';
import NavigationUtil from './app/navigation/NavigationUtil'
const App= () => {
  return (
        <AppNavigatior>
        </AppNavigatior>
  )
};

const styles = StyleSheet.create({
 
});

export default App;
