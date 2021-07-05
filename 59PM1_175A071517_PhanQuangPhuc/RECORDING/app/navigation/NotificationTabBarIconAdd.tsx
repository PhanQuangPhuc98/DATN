import React from 'react';
import { View, StyleSheet, Text, Platform } from 'react-native';
import { connect } from 'react-redux';
import R from '../assets/R';

const NotificationTabBarIconAdd = (props) => {
    return (
        props.NotifiState.dataAdd>0?
        <View
            style={[styles.containerLengthCart]}
            children={
                <Text
                    style={{
                        fontFamily: R.fonts.bold,
                        fontSize: 12,
                        lineHeight: 11,
                        paddingHorizontal: 5,
                        paddingVertical: 3,
                        color: 'white'
                    }}
                >
                    {props.NotifiState.dataAdd}
                </Text>
            }
        />:null
    )
}

const mapStateToProps = state => ({
    NotifiState: state.notificationReducer
});

const mapDispatchToProps = {};

const styles = StyleSheet.create({
    containerLengthCart: {
        backgroundColor: R.color.colors.Red,
        borderRadius: 26,
        width: 28,
        height: 28,
        position: 'absolute',
        left: 15,
        top: Platform.OS == 'ios' ? -3 : Platform.Version < 24 ? -4 : -5,
        alignItems: 'center',
        justifyContent: "center"
    }
})

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationTabBarIconAdd);
