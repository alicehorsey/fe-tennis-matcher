import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Text, View, Button } from 'react-native';
import firebase from '../constants/Firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';



function HomeScreen({ navigation }) {

    console.log('hello')

    const [image, setImage] = useState('')

    useEffect(() => {
        console.log('useEffect!')
        const ref = firebase
            .storage()
            .ref()
            .child('man_playing_tennis_1.jpg');
        ref.getDownloadURL().then(url => setImage(url))
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tennis Match NEW!!</Text>
            <Image source={{ uri: image }} style={{ width: 250, height: 250 }} />
            <Button
                title="Create Profile"
                onPress={() => navigation.navigate('CreateProfile')}
            />
        </View>
    );
}

export default HomeScreen;