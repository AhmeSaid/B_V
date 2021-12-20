import React from 'react'
import { Button, Image, ScrollView, View } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions'
import PaymentModal from '../../components/paymentModal'
import styles from './styles'
import { Car } from '../../assets/images'

const HomeView = ({
  handlePayPress,
  loading,
  latitude,
  longitude,
  randomLocation,
  isPaymentOpen,
  handleStart,
  isStart
}) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={styles.container}>

      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      >

        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
        >
          <View style={styles.markerContainer}>
            <Image
              style={styles.markerImage}
              source={Car}
            />
          </View>
        </Marker>

        <MapViewDirections
          origin={{ latitude: latitude, longitude: longitude }}
          destination={randomLocation}
          apikey={"AIzaSyCyureG5llGuYWxcCE7_RGJNk4l8G3Z7NE"}
          strokeWidth={4}
          strokeColor="#111111"
        />

      </MapView>



      {isStart && <View style={styles.start} >
        <Button title="Start" onPress={handleStart} />
      </View>}

      {isPaymentOpen && <PaymentModal handlePayPress={handlePayPress} loading={loading} />}
    </ScrollView>
  )
}


export default HomeView;