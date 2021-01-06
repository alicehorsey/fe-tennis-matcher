import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function AddPreferences({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>User adding preferences screen</Text>
            <Button
                title="Add Preferences"
                onPress={() => navigation.navigate('AddPreferences')}
            />
            {/* Add Preferences button will take us to full users list */}
        </View>
    );
}

export default AddPreferences;