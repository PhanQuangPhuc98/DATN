import React, { useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
const MapComponent = (props) => {
  const {location}=props
  const adress = {
    latitude: 21.00899,
    longitude: 105.79693
  }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 21.027763,
          longitude: 105.834160,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={'google'}
      >
        <Marker
          coordinate={adress}
          title={location}
        >
        </Marker>
      </MapView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  map: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
export default MapComponent