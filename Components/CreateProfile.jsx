import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

function CreateProfile({ navigation }) {

    const [firstName, onChangeFirstNameText] = React.useState('');
    const [lastName, onChangeLastNameText] = React.useState('');
    const [address, onChangeAddressText] = React.useState('');
    const [postcode, onChangePostCode] = React.useState('');
    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    //Date stored in the state as a timestamp
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    //This function works for changing a date timestamp coming back from the calendar date picker into the format of YYYYMMDD
    //We can use this function to format the date from the state before sending it to the backend
    const formatDate = (timestring) => {
        var formattedDate = new Date(Date.UTC(timestring.getFullYear(), timestring.getMonth(), timestring.getDate()));
        return formattedDate.toISOString().slice(0, 10).replace(/-/g, "");
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Profile</Text>
            <TextInput
                style={styles.inputFields}
                onChangeText={text => onChangeFirstNameText(text)}
                value={firstName}
                placeholder="First Name"
                autoCompleteType="name"
            />
            <TextInput
                style={styles.inputFields}
                onChangeText={text => onChangeLastNameText(text)}
                value={lastName}
                placeholder="Last Name"
                autoCompleteType='name'
            />
            <TextInput
                style={styles.inputFields}
                onChangeText={text => onChangeAddressText(text)}
                value={address}
                placeholder="Address"
                autoCompleteType="street-address"
            />
            <TextInput
                style={styles.inputFields}
                onChangeText={text => onChangePostCode(text)}
                value={postcode}
                placeholder="Post Code"
                autoCompleteType="postal-code"
            />

            <View>
                <Button onPress={showDatepicker} title="Enter Date of Birth" />
            </View>

            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                />
            )}
            {/* Uncomment to see what date is selected if required!
            <Text>{date.toString()}</Text>
            <Text>{formatDate(date)}</Text> */}

            <Button
                title="Add Prefernces (/would be on submit)"
                onPress={() => navigation.navigate('AddPreferences')}
            />

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    title: {
        marginTop: 50,
        fontSize: 40,
        marginBottom: 20
    },
    inputFields: {
        borderBottomWidth: 1,
        marginBottom: 20
    }
});



export default CreateProfile;