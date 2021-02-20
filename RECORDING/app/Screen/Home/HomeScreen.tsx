import React, { useState } from 'react'
import { Text, View, Button } from 'react-native'

const HomeScreen = ({ navigation }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'green' }}>
            <Text>
                Hello
            </Text>

            <Button
                title="go to Setting"
                onPress={() => navigation.navigate("SettingsScreen")}
            >
            </Button>
        </View>
    );
}

export default HomeScreen;