import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Tennis Match!</Text>
            <Button
                title="Create Profile"
                onPress={() => navigation.navigate('CreateProfile')}
            />
        </View>
    );
}

export default HomeScreen;