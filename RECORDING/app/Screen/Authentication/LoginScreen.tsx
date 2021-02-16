import React from 'react'
import { Text, SafeAreaView, StyleSheet, TextInput, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Header } from "react-native-elements";
import Imgae from '../../assets/imagesAsset';
const LoginScreen = () => {
    const onPress = () => {

    };
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header
                containerStyle={{ backgroundColor: "#C47B49" }}
                leftContainerStyle={{ justifyContent: 'center', paddingTop: 5 }}
                centerComponent={
                    <Text
                        style={{
                            fontSize: 18,
                        }}>
                        Login
                  </Text>
                }
                leftComponent={
                    <TouchableOpacity

                    >
                        <Image
                            style={{
                                width: 14,
                                height: 14,
                                resizeMode: "contain",
                            }}
                            source={Imgae.ic_back}>
                        </Image>
                    </TouchableOpacity>
                }
                statusBarProps={{ backgroundColor: "#C47B49" }}
            />
            <ImageBackground
                style={{
                    flex: 1,
                }}
                source={Imgae.ic_Music}
            >
                <View style={{
                    marginVertical: 100,
                    marginHorizontal: 50,
                    width: 300,
                    height: 250,
                    backgroundColor: "#C47B49",
                    borderRadius: 10,
                    alignItems: 'center'
                }}>
                    <View style={{
                        width: 300,
                        height: 80,
                        alignItems: "center",
                        justifyContent: 'center',
                    }}>
                        <Text
                            style={{
                                fontSize: 18,
                            }}
                        >
                            Đăng Nhập
                    </Text>
                    </View>
                    <View style={{
                        width: 250,
                        height: 250,
                    }}>
                        <TextInput
                            style={{
                                marginVertical: 5,
                                backgroundColor: "white",
                                borderRadius: 5
                            }}
                            placeholder={"Tài Khoản"}
                        >
                        </TextInput>
                        <TextInput
                            style={{ backgroundColor: "white", borderRadius: 5 }}
                            placeholder={"Mật Khẩu"}
                        >
                        </TextInput>
                    </View>
                </View>
                <TouchableOpacity
                    onPress={onPress}
                    style={{
                        backgroundColor: "#C47B49",
                        width: 350,
                        height: 70,
                        alignItems: "center",
                        justifyContent: 'center',
                        marginHorizontal: 30,
                        borderRadius: 20
                    }}
                >
                    <Text
                        style={{
                            fontSize: 18
                        }}
                    >
                        Đăng Nhập
                    </Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "green"
    }
});
export default LoginScreen;