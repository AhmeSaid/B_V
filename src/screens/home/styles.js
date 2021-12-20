import { Dimensions, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    container: {
        height: '100%',
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    start: {
        position: 'absolute',
        width: '100%',
        bottom: 40,
    },
    markerContainer: {
        width: 30,
        height: 30
    },
    markerImage: {
        width: '100%',
        height: '100%'
    }

})

export default styles