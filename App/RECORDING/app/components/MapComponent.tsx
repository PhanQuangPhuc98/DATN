import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet } from 'react-native'
import MapView, { Marker,PROVIDER_GOOGLE  } from 'react-native-maps'; 
import Reactotron from 'reactotron-react-native';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
const MapComponent = (props) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCZ9tRoSUG6V05BUlBCOOQR8UG9EqVqoiw';
  const { name } = props
  const adress = {
    latitude: 21.00899,
    longitude: 105.79693
  }
  const [current_position, setcurrent_position] = useState({
    latitude: null,
    longitude: null
  })
  const location = () => {
    Geolocation.getCurrentPosition(data => {
      setcurrent_position({
        ...current_position,
        latitude: data.coords.latitude,
        longitude: data.coords.longitude
      })
      Reactotron.log(data)
    })
  }
  useEffect(() => {
    location()
  }, [])
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: current_position.latitude,
          longitude: current_position.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        provider={PROVIDER_GOOGLE }
      >
        <Marker
          coordinate={adress}
          title={name}
        >
        </Marker>
        <Marker
          coordinate={current_position}
          title={"i am to me"}
        >
        </Marker>
        <MapViewDirections
         origin={current_position}
         destination={adress}
         apikey={GOOGLE_MAPS_APIKEY}
         strokeWidth={3}
         strokeColor="hotpink"
        >

        </MapViewDirections>
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