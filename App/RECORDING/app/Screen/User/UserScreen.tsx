import React, { useState } from 'react'
import { Text, View, Button } from 'react-native';
import auth from '@react-native-firebase/auth';
import Reactotron from 'reactotron-react-native';
const logout = async () => {
      const res = await auth().signOut();
      try {
        Reactotron.log('res', res);
      } catch (error) {
        Reactotron.log('error', error);
      }
    //alert("hello")
};
const UserScreen = () => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
            <Button
                title={"Logout"}
                onPress={() => logout()}>
            </Button>

        </View>
    );
};

export default UserScreen;