import React, { useEffect, useState } from 'react'
import { SafeAreaView, Text, View, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Reactotron from 'reactotron-react-native';
import R from '../assets/R'
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from 'react-native-geolocation-service';
const MapComponent = (props) => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyCZ9tRoSUG6V05BUlBCOOQR8UG9EqVqoiw';
  const [isLoading, setLoading] = useState(false);
  const { Studio } = props
  const adress = {
    latitude: Studio.latitude,
    longitude: Studio.longitude
  }
  const [current_position, setcurrent_position] = useState({
    latitude: null,
    longitude: null
  })
  const location = () => {
    setLoading(true)
    try {
      Geolocation.getCurrentPosition(data => {
        setcurrent_position({
          ...current_position,
          latitude: data ? data.coords.latitude : 21.0031167,
          longitude: data ? data.coords.longitude : 105.82014
        })
        setLoading(false)
        Reactotron.log(data)
      })
    } catch (error) {
      setLoading(false)
      Reactotron.log(error)
    }
  }
  useEffect(() => {
    location()
  }, [])
  Reactotron.log('current_position', current_position)
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {isLoading ? <ActivityIndicator size="large" color={R.color.colors.Sienna1} style={{flex:1,justifyContent:'center',alignContent:"center"}} /> :
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
          provider={PROVIDER_GOOGLE}
        >
          <Marker
            coordinate={adress}
            title={Studio.Name}
          >
          </Marker>
          <MapViewDirections
            origin={current_position}
            destination={adress}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            region={'Vietnam'}
            language={'vn'}
          >
          </MapViewDirections>
        </MapView>
      }
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