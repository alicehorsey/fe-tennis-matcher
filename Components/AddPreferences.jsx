import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  ScrollView,
} from "react-native";
import { Slider, Icon, CheckBox, ButtonGroup } from "react-native-elements";
import { postNewUser } from "../API";

function AddPreferences({ route, navigation }) {
  const profileInfo = { ...route.params };
  // console.log(profileInfo);

  const [distance, setDistance] = useState(40);
  const opponentHandButtons = ["left-handed", "right-handed", "either"];
  const [opponentHand, setOpponentHand] = useState(2);
  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const [opponentAbility, setOppoenentAbility] = useState([0, 3]);

  const opponentGroupOptions = ["mens", "womens", "either"];
  const [group, setGroup] = useState(2);
  const [savedPreferences, setSavedPreferences] = useState(false);
  // current queries set up are gender / playing hand / min ability / max ability
  const addPreferences = (
    profileData,
    distance,
    opponentAbility,
    group,
    opponentHand
  ) => {
    profileData.distance = distance;
    if (opponentAbility.length === 0) {
      profileData.min_ability = 1;
      profileData.max_ability = 4;
    } else if (opponentAbility.length === 1) {
      profileData.min_ability = opponentAbility[0] + 1;
      profileData.max_ability = opponentAbility[0] + 1;
    } else {
      profileData.min_ability = opponentAbility.sort()[0] + 1;
      profileData.max_ability =
        opponentAbility.sort()[opponentAbility.length - 1] + 1;
    }
    if (group === 0) {
      profileData.gender_preference = "m";
    } else if (group === 1) {
      profileData.gender_preference = "f";
    } else {
      profileData.gender_preference = "";
    }
    if (opponentHand === 0) {
      profileData.hand_preference = "left-handed";
    } else if (opponentHand === 1) {
      profileData.hand_preference = "right-handed";
    } else {
      // this will not add anything could be removed
      profileData.hand_preference = "";
    }
    return profileData;
  };

  return (
    <ScrollView>
      <Text>User adding preferences screen</Text>
      <Text>Set your maximum distance:</Text>
      <Text>Distance: {distance}</Text>

      <Text>Should be false on refresh: {savedPreferences.toString()}</Text>
      <View>
        <Slider
          value={distance}
          onValueChange={setDistance}
          maximumValue={50}
          minimumValue={1}
          step={1}
          trackStyle={{ height: 10, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="tennisball-outline"
                type="ionicon"
                size={20}
                reverse
                containerStyle={{ bottom: 20, right: 20 }}
                color="#92a835"
              />
            ),
          }}
        />
      </View>
      <Text>***</Text>
      <Text>***</Text>
      <Text>Opponent hand</Text>
      <ButtonGroup
        selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
        onPress={(selected) => {
          setOpponentHand(selected);
        }}
        selectedIndex={opponentHand}
        buttons={opponentHandButtons}
      ></ButtonGroup>
      <Text>Opponent hand is {opponentHandButtons[opponentHand]}</Text>
      <Text>***</Text>
      <Text>***</Text>
      <Text>Choose your range of opponent ability levels</Text>
      <ButtonGroup
        selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
        onPress={(selected) => setOppoenentAbility(selected)}
        selectMultiple={true}
        selectedIndexes={opponentAbility}
        buttons={abilityLevelButtons}
      ></ButtonGroup>
      <Text>***</Text>
      <Text>***</Text>
      <Text>What group do you want to play in?</Text>
      <ButtonGroup
        selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
        onPress={(selected) => {
          setGroup(selected);
        }}
        selectedIndex={group}
        buttons={opponentGroupOptions}
      ></ButtonGroup>
      <Text>Your preferred group: {opponentGroupOptions[group]}</Text>
      <Button
        color='#55008c'
        title="Save Preferences"
        onPress={() => {
          addPreferences(
            profileInfo,
            distance,
            opponentAbility,
            group,
            opponentHand
          );

          console.log(profileInfo, Object.keys(profileInfo).length);
          postNewUser(profileInfo);
          navigation.navigate("Matches", profileInfo);
        }}
      />

      {/* this button first needs to send post request then navigate to matches */}
    </ScrollView>
  );
}
// have a submit button with disabled until preferences saved ??? ternary ???
export default AddPreferences;

/* <Button
       title="Submit Profile"
       disabled={!savedPreferences}
       onPress={() => {
         // PROBLEM : READ THE CONSOLE.LOG --> Only on second click of the submit button are matches posted
         console.log(
           "Here is the final object to post",
           profileInfo,
           Object.keys(profileInfo).length
         );
       }}
     /> */