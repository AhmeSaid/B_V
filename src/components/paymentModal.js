import React from 'react'
import { View, StyleSheet, Modal, Button } from 'react-native';
import { CardField } from '@stripe/stripe-react-native';

const PaymentModal = ({ handlePayPress, loading }) => {

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={true}
        >
            <View style={styles.cardContainer}>
                <CardField
                    postalCodeEnabled={false}
                    placeholder={{
                        number: '4242 4242 4242 4242',
                    }}
                    style={styles.cardField}
                />

                <Button onPress={handlePayPress} title="Pay" disabled={loading} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: 'white',
        height: '100%'
    },
    cardField: {
        width: '100%',
        height: 50,
        marginVertical: 30,
    },
})

export default PaymentModal;
