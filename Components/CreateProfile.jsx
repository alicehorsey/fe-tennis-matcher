import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function CreateProfile({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Create Profile Screen</Text>
            <Button
                title="Add Prefernces (/would be on submit)"
                onPress={() => navigation.navigate('AddPreferences')}
            />
        </View>
    );
}

export default CreateProfile;