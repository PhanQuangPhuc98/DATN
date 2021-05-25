import React, { useState } from 'react'
import { Text, View } from 'react-native'
import MapView from 'react-native-maps';
const MapComponent =()=>  {
        return (
            <MapView
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
        )
}
export default  MapComponent