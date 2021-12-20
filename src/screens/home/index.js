import React, { useEffect, useState } from 'react'
import HomeView from './view';
import { useConfirmPayment, PaymentMethodCreateParams } from '@stripe/stripe-react-native'
import { Keyboard, PermissionsAndroid } from 'react-native'
import Geolocation from '@react-native-community/geolocation';

const Home = () => {

    const randomLocationApi = "https://api.3geonames.org/?randomland=EG&json=1"

    const [name, setName] = useState('ahmed');
    const { confirmPayment, loading } = useConfirmPayment();
    const [latitude, setLatitude] = useState(0);
    const [longitude, setLongitude] = useState(0);
    const [randomLocation, setRandomLocation] = useState({ latitude: 0, longitude: 0 });
    const [isPaymentOpen, setIsPaymentOpen] = useState(true)
    const [isStart, setIsStart] = useState(true)

    let watchID;


    const getRandomLocation = () => {
        fetch(randomLocationApi)
            .then((response) => response.json())
            .then((json) => {
                setRandomLocation({ latitude: parseFloat(json.major.latt), longitude: parseFloat(json.major.longt) })
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const fetchPaymentIntentClientSecret = async () => {
        const response = await fetch('https://api.stripe.com/v1/payment_intents', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
                "Authorization": "Bearer sk_test_z4N8mZoFvnpQY1tZgxSCQGl1"
            },
            body: "amount=2000&currency=usd",
        });
        const { client_secret } = await response.json();

        return client_secret;
    };

    const handlePayPress = async () => {

        Keyboard.dismiss()
        const clientSecret = await fetchPaymentIntentClientSecret();
        const billingDetails: PaymentMethodCreateParams.BillingDetails = {
            name,
        };

        const { error, paymentIntent } = await confirmPayment(clientSecret, {
            type: 'Card',
            billingDetails,
        });

        if (error) {
            console.log(`Error code: ${error.code}`, error.message);
            alert('Payment confirmation error', error.message);
        } else if (paymentIntent) {
            console.log(
                'Success',
                `The payment was confirmed successfully! currency: ${paymentIntent.currency}`
            );
            console.log('Success from promise', paymentIntent);
            setIsPaymentOpen(false)
        }

    };

    const handleCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setLatitude(info.coords.latitude)
            setLongitude(info.coords.longitude)
        })

    }

    const handleStart = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                watchID = Geolocation.watchPosition(
                    info => {
                        setLatitude(info.coords.latitude)
                        setLongitude(info.coords.longitude)
                        setIsStart(false)
                    },
                    error => alert('error', error)
                );
            } else {
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err)
        }


    }

    useEffect(() => {
        handleCurrentLocation()

        getRandomLocation()

        return (
            () => {
                Geolocation.clearWatch(watchID)
                Geolocation.stopObserving()
            })
    }, []);

    return (
        <HomeView
            handlePayPress={handlePayPress}
            loading={loading}
            latitude={latitude}
            longitude={longitude}
            randomLocation={randomLocation}
            isPaymentOpen={isPaymentOpen}
            handleStart={handleStart}
            isStart={isStart}
        />
    )
}

export default Home;