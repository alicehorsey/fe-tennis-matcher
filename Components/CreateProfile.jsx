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
import { getCoords } from "../API";
import { ButtonGroup, CheckBox } from "react-native-elements";
import Constants from "expo-constants";
import SelectAndAddPhoto from "./SelectAndAddPhoto";

function CreateProfile({ route, navigation }) {
  // const userLoginDetails = { ...route.params.user };
  // const username = userLoginDetails.email;
  //Above is working :)
  //Username should come from the route from Registration
  const testUsername = "wileycoyote@roadrunner.com";
  const [firstName, onChangeFirstNameText] = React.useState("");
  const [lastName, onChangeLastNameText] = React.useState("");
  // NEED TO STORE PHOTO URL
  const [postcode, onChangePostCode] = React.useState("");
  // lat and long are added directly to userDetails
  const [image, setImage] = useState("");
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [gender, setGender] = useState(4);
  const [userAbility, setAbility] = useState(0);
  const [hand, setHand] = useState(1);
  const [weekdayDaytime, setWeekdayDaytime] = useState(true);
  const [weekdayEvening, setWeekdayEvening] = useState(true);
  const [weekends, setWeekends] = useState(true);
  const [description, onChangeDescriptionText] = React.useState("");
  // create an object of all the details to pass through
  // userComplete is set when all the detailChecker criteria are met i.e. all fields are filled
  const [userDetails, setUserDetails] = useState({});
  const [userComplete, setUserComplete] = useState(true);
  const genderOptions = [
    "male",
    "female",
    "non-binary",
    "other",
    "I prefer not to say",
  ];

  const handOptions = ["left-handed", "right-handed"];

  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  // Date-picker functionality
  // Date stored in the state as a timestamp
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
  // Need to add 1 because using zero-index (0-3) and need (1-4)
  const formatAbilityIndex = (abilityIndex) => {
    return abilityIndex + 1;
  };
  // returns boolean true or false for the disabled feature of the go to preferences button
  // accesses the props directly
  const detailsChecker = () => {
    // console.log(firstName.length === 0 || lastName.length === 0);
    /*
    Everything else at least has a pre-set state --> could still alter so there is none and check if equal ro "" or undefined
    TESTED : First Name, Last Name, Postcode (lat and long??) Description
    NOT TESTED: Lat/long, Photo Url, DOB (need to be at least 18)
    */

    const is18 = (dateString) => {
      const today = new Date();
      const year = dateString.slice(0, 4);
      const month = dateString.slice(4, 6) - 1;
      const day = dateString.slice(6);
      let age = today.getFullYear() - year;
      let m = today.getMonth() - month;
      if (m < 0 || (m === 0 && today.getDay() < day)) {
        age--;
      }
      return age >= 18;
    };

    const correctDate = formatDate(date);
    //console.log(correctDate, is18(correctDate));

    if (
      firstName.length === 0 ||
      lastName.length === 0 ||
      postcode.length === 0 ||
      description.length === 0 ||
      is18(correctDate) === false
    ) {
      setUserComplete(true);
    } else {
      setUserComplete(false);
    }
  };

  const copyURL = (url) => {
    const copyOfUrl = url;
    console.log("in copyURL in CreateProfile", url, copyOfUrl);
    setImage(copyOfUrl);
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
        {/* Uncomment to see what date is selected if required! */}
        <Text>{date.toString()}</Text>
        <Text>{formatDate(date)}</Text>

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
        {/*
        need to pass username down on the props
        */}
        <SelectAndAddPhoto username={testUsername} copyURL={copyURL} />

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
            setWeekends(!weekends);
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
          title="Save your details"
          onPress={() => {
            // LAT LONG REQUEST
            getCoords(postcode).then((coords) => {
              //console.log(coords.latitude);
              setUserDetails({
                // need to hard code the user and photo to test upload
                // username: username,
                first_name: firstName,
                last_name: lastName,
                image_url: image,
                latitude: coords.latitude,
                longitude: coords.longitude,
                date_of_birth: formatDate(date),
                gender: formatGender(gender, genderOptions),
                ability: formatAbilityIndex(userAbility),
                playing_hand: handOptions[hand],
                weekday_daytime: weekdayDaytime,
                weekday_evening: weekdayEvening,
                weekends: weekends,
                description: description,
              });
              console.log("testing the image", image, userDetails.image_url);
              detailsChecker();
            });
          }}
        />
        <Button
          title="Go To Preferences"
          onPress={() => {
            console.log(userDetails, "Here are the passing details");
            navigation.navigate("AddPreferences", userDetails);
          }}
          disabled={userComplete}
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

/*
here are API funcs
import axios from "axios"; const tennisAPI = axios.create({ baseURL: "http://tennis-match-app.herokuapp.com" }) const postcodeAPI = axios.create({ baseURL: "https://api.postcodes.io/postcodes" })
export const postNewUser = (newUser) => { return tennisAPI .post(`/users/${newUser.username}`, newUser) .then(({data}) => { console.log(data) return data }) } export const getLongitude = (postcode) => { return postcodeAPI .get(`/${postcode}`) .then(({ data }) => console.log(data.result.longitude)) } export const getLatitude = (postcode) => { return postcodeAPI .get(`/${postcode}`) .then(({ data }) => console.log(data.result.latitude)) }
*/
