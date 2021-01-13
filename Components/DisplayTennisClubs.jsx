import * as React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
const clubsData = require("../assets/tennis.clubs.js");

export default function DisplayTennisClubs() {
    console.log(clubsData)
    return (
        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: 53.796305,
                    longitude: -1.564126,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={styles.map}
            >
                {clubsData.map((club, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: +club.latitude, longitude: +club.longitude }}
                        title={club.club_name}
                        pinColor='green'
                        image={require('../assets/tennis-racket.png')}
                        description={club.phone_number}
                    />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
});