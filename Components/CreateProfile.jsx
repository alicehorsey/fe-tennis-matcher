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
- ❌ "username: string" --> will need to be authentication or added to the form as a field if authen needs passing via props
- ✅ first_name": string" - passing through
- ✅ last_name": string" - passing through
- ❌"latitude": 53.802177,
- ❌ "longitude": -1.558265, --> ask Alice how this is being made
- date_of_birth": "string",
- ✅ DOB": string" - uses Alices format date function to get to the correct format 
- ❓✅"gender: string" --> change to Do you want to play mens, womens or mixed? does this avoid the issue? 
- ❓✅ability: index **Backend isn't stored as zero-index have added formatter
- ❓✅ "playing_hand": "left-handed", needs button removal or formatter
-❓"club_membership": "Pudsey Lawn Tennis Club", double check if required think not :)
-❓✅✅✅ Availability: boolean changing to checkboxes
 "weekday_daytime": true, boolean
    "weekday_evening": false,
    "weekends": false,
 ✅"description":
*/
import { ButtonGroup, CheckBox } from "react-native-elements";
import Constants from "expo-constants";
import SelectAndAddPhoto from "./SelectAndAddPhoto";

function CreateProfile({ navigation }) {
  const [firstName, onChangeFirstNameText] = React.useState("");
  const [lastName, onChangeLastNameText] = React.useState("");
  const [address, onChangeAddressText] = React.useState("");
  const [postcode, onChangePostCode] = React.useState("");
  // NEED TO STORE PHOTO URL
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(4);
  const [userAbility, setAbility] = useState(0);
  const [hand, setHand] = useState(1);
  const [weekdayDaytime, setWeekdayDaytime] = useState(true);
  const [weekdayEvening, setWeekdayEvening] = useState(true);
  const [weekends, setWeekends] = useState(true);
  const [description, onChangeDescriptionText] = React.useState("");

  const genderOptions = [
    "male",
    "female",
    "non-binary",
    "other",
    "I prefer not to say",
  ];

  const handOptions = ["left-handed", "right-handed", "either"];

  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];

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
  // getting gender into m /f / other for the backend
  const formatGender = (choice, array) => {
    //console.log(choice);
    //console.log(array[choice]);
    if (array[choice] == "male") {
      return "m";
    } else if (array[choice] == "female") {
      return "f";
    } else {
      return "other";
    }
  };

  const formatAbilityIndex = (abilityIndex) => {
    return abilityIndex + 1;
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
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

        <CheckBox
          center
          title="weekday daytime"
          checkedIcon="check-circle"
          uncheckedIcon="times-circle"
          onPress={() => {
            //   if (weekdayDaytime === false) {
            setWeekdayDaytime(!weekdayDaytime);
            //  setWeekdayEvening(weekdayDaytime);
            //  setWeekends(weekdayDaytime);
            //   }
            // else {
            //   setWeekdayDaytime(false);
            // }
          }}
          checked={weekdayDaytime}
        />
        <CheckBox
          center
          title="weekday evening"
          checkedIcon="check-circle"
          uncheckedIcon="times-circle"
          onPress={() => {
            // if (weekdayEvening === false) {
            setWeekdayEvening(!weekdayEvening);
            // setWeekdayDaytime(false);
            // setWeekends(false);
            //  }
            // else {
            //   setWeekdayEvening(false);
            // }
          }}
          checked={weekdayEvening}
        />
        <CheckBox
          center
          title="weekends"
          checkedIcon="check-circle"
          uncheckedIcon="times-circle"
          onPress={() => {
            //  if (weekends === false) {
            setWeekends(!weekends);
            //  setWeekdayDaytime(false);
            // setWeekdayEvening(false);
            //  }
            //  else {
            //   setWeekends(false);
            // }
          }}
          checked={weekends}
        />

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
              gender: formatGender(gender, genderOptions),
              ability: formatAbilityIndex(userAbility),
              playing_hand: handOptions[hand],
              weekday_daytime: weekdayDaytime,
              weekday_evening: weekdayEvening,
              weekends: weekends,
              description: description,
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

/*
Old availability button group
  const availabilityButtons = [
    "weekday daytime",
    "weekday evenings",
    "weekends",
  ];
  const [userAvailability, setAvailability] = useState();
  <ButtonGroup
          onPress={(selected) => setAvailability(selected)}
          selectMultiple={true}
          selectedIndexes={userAvailability}
          buttons={availabilityButtons}
        ></ButtonGroup>

*/
