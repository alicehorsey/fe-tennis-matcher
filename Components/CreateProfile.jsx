import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
/*
Data to pass through :
- ❌ "username: string" --> will need to be authentication or added to the form as a field
- ✅ first_name": string" - passing through
- ✅ last_name": string" - passing through
- ❌"latitude": 53.802177,
- ❌ "longitude": -1.558265, --> ask Alice how this is being made
- date_of_birth": "string",
- ✅ DOB": string" - uses Alices format date function to get to the correct format 
- ❓"gender: string" --> change to Do you want to play mens, womens or mixed? does this avoid the issue? 
- ❌ability: index **Backend isn't stored as zero-index!!!!! will format to backend setup
- ✅ "playing_hand": "left-handed",
-❓"club_membership": "Pudsey Lawn Tennis Club", -is this required?? - can we unrequire it if so/ get the picker organised? 
❌"weekday_daytime": true,
❌"weekday_evening": false,
❌"weekends": false,
❌"description":
*/
import { ButtonGroup } from "react-native-elements";
import Constants from "expo-constants";
import SelectAndAddPhoto from "./SelectAndAddPhoto";

function CreateProfile({ navigation }) {
  const [firstName, onChangeFirstNameText] = React.useState("");
  const [lastName, onChangeLastNameText] = React.useState("");
  const [address, onChangeAddressText] = React.useState("");
  const [postcode, onChangePostCode] = React.useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const genderOptions = [
    "male",
    "female",
    "non-binary",
    "other",
    "I prefer not to say",
  ];
  const [gender, setGender] = useState(4);

  const handOptions = ["left-handed", "right-handed", "either"];
  const [hand, setHand] = useState(2);

  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const [userAbility, setAbility] = useState(0);

  const availabilityButtons = [
    "weekday daytime",
    "weekday evenings",
    "weekends",
  ];
  const [userAvailability, setAvailability] = useState();

  const [description, onChangeDescriptionText] = React.useState("");

  //Date stored in the state as a timestamp
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  //This function works for changing a date timestamp coming back from the calendar date picker into the format of YYYYMMDD
  //We can use this function to format the date from the state before sending it to the backend
  const formatDate = (timestring) => {
    var formattedDate = new Date(
      Date.UTC(
        timestring.getFullYear(),
        timestring.getMonth(),
        timestring.getDate()
      )
    );
    return formattedDate.toISOString().slice(0, 10).replace(/-/g, "");
  };
  // getting gender into m /f / mixed
  const formatGender = (choice) => {
    if ((choice = "male")) {
      return "m";
    } else if ((choice = "female")) {
      return "f";
    } else {
      return "mixed";
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* <View style={styles.container}> */}
        <Text style={styles.title}>Create Profile</Text>
        <TextInput
          style={styles.inputFields}
          onChangeText={(text) => onChangeFirstNameText(text)}
          value={firstName}
          placeholder="First Name"
          autoCompleteType="name"
        />
        <TextInput
          style={styles.inputFields}
          onChangeText={(text) => onChangeLastNameText(text)}
          value={lastName}
          placeholder="Last Name"
          autoCompleteType="name"
        />
        <TextInput
          style={styles.inputFields}
          onChangeText={(text) => onChangeAddressText(text)}
          value={address}
          placeholder="Address"
          autoCompleteType="street-address"
        />
        <TextInput
          style={styles.inputFields}
          onChangeText={(text) => onChangePostCode(text)}
          value={postcode}
          placeholder="Post Code"
          autoCompleteType="postal-code"
        />
        <Text>What is your Date of Birth?</Text>
        <View>
          <Button onPress={showDatepicker} title="Choose Date" />
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

        <Text>What is your gender?</Text>
        <ButtonGroup
          onPress={(selected) => setGender(selected)}
          selectedIndex={gender}
          buttons={genderOptions}
        ></ButtonGroup>

        <Text>What hand do you play?</Text>
        <ButtonGroup
          onPress={(selected) => {
            setHand(selected);
          }}
          selectedIndex={hand}
          buttons={handOptions}
        ></ButtonGroup>

        <Text>What is your ability level?</Text>
        <ButtonGroup
          onPress={(selected) => setAbility(selected)}
          selectedIndex={userAbility}
          buttons={abilityLevelButtons}
        ></ButtonGroup>

        <SelectAndAddPhoto />

        <Text>What is your availabilty?</Text>
        <ButtonGroup
          onPress={(selected) => setAvailability(selected)}
          selectMultiple={true}
          selectedIndexes={userAvailability}
          buttons={availabilityButtons}
        ></ButtonGroup>

        <Text>
          Please write a brief description of what you are looking for.
        </Text>
        <TextInput
          style={styles.inputFields_description}
          onChangeText={(text) => onChangeDescriptionText(text)}
          value={description}
          placeholder="New friends to play tennis with in the Leeds area!"
        />

        <Button
          title="Add Preferences"
          onPress={() =>
            navigation.navigate("AddPreferences", {
              first_name: firstName,
              last_name: lastName,
              date_of_birth: formatDate(date),
              gender: formatGender(gender),
              playing_hand: handOptions[hand],
            })
          }
        />

        {/* </View> */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    marginHorizontal: 10,
  },
  title: {
    marginTop: 50,
    fontSize: 40,
    marginBottom: 20,
    alignSelf: "center",
  },
  inputFields: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  inputFields_description: {
    borderBottomWidth: 1,
    marginBottom: 20,
  },
});

export default CreateProfile;
