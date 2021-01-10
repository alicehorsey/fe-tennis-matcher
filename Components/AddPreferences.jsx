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

function AddPreferences({ route, navigation }) {
  const profileInfo = { ...route.params };
  const {
    first_name,
    last_name,
    latitude,
    longitude,
    date_of_birth,
    gender,
    ability,
    playing_hand,
    weekday_daytime,
    weekday_evening,
    weekends,
    description,
  } = profileInfo;
  const [distance, setDistance] = useState(40);
  const opponentHandButtons = ["left-handed", "right-handed", "either"];
  const [opponentHand, setOpponentHand] = useState(2);
  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const [opponentAbility, setOppoenentAbility] = useState();
  const opponentGroupOptions = ["mens", "womens", "either"];
  const [group, setGroup] = useState(2);
  // current queries set up are gender / playing hand / min ability / max ability
  const addPreferences = (
    profileData,
    distance,
    opponentAbility,
    abilityLevelButtons,
    opponentHand,
    opponentHandButtons,
    group,
    opponentGroupOptions
  ) => {
    profileData.distance = distance;
    profileData.min_ability =
      opponentHandButtons[opponentHand] === "left-handed" || "right-handed"
        ? (profileData.hand_preference = opponentHandButtons[opponentHand])
        : (profileData.hand_preference = "");
    return profileData;
  };

  return (
    <ScrollView>
      <Text>This list shows the data needed in its k:v pairs</Text>
      <Text>First_name: {first_name}</Text>
      <Text>Last Name: {last_name}</Text>
      <Text>LATITUDE TO GO HERE</Text>
      <Text>LONGITUDE TO GO HERE</Text>
      <Text>date_of_birth: {date_of_birth}</Text>
      <Text>gender: {gender}</Text>
      <Text>playing_hand: {playing_hand}</Text>
      <Text>gender= {ability}</Text>
      <Text>weekday_daytime: {weekday_daytime.toString()}</Text>
      <Text>weekday_evening: {weekday_evening.toString()}</Text>
      <Text>weekends: {weekends.toString()}</Text>
      <Text>description: {description}</Text>
      <Text>
        distance: (typeof-- {typeof distance}) total -- {distance}
      </Text>
      <Text>User adding preferences screen</Text>
      <Text>Availability</Text>
      <Text>Set your maximim distance:</Text>
      <Text>Distance: {distance}</Text>
      <Text>Distance: {Object.entries(profileInfo)}</Text>
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
      <Text>Opponent Hand</Text>
      <ButtonGroup
        onPress={(selected) => {
          setOpponentHand(selected);
        }}
        selectedIndex={opponentHand}
        buttons={opponentHandButtons}
      ></ButtonGroup>
      <Text>Opponent Hand is {opponentHandButtons[opponentHand]}</Text>
      <Text>***</Text>
      <Text>***</Text>
      <Text>Choose opponent ability levels</Text>
      <ButtonGroup
        onPress={(selected) => setOppoenentAbility(selected)}
        selectMultiple={true}
        selectedIndexes={opponentAbility}
        buttons={abilityLevelButtons}
      ></ButtonGroup>
      <Text>***</Text>
      <Text>***</Text>
      <Text>What group do you want to play in?</Text>
      <ButtonGroup
        onPress={(selected) => {
          setGroup(selected);
        }}
        selectedIndex={group}
        buttons={opponentGroupOptions}
      ></ButtonGroup>
      <Text>Your preferred group: {opponentGroupOptions[group]}</Text>
      <Button
        title="Save Preferences"
        onPress={() => navigation.navigate("AddPreferences")}
      />
      {/* Add Preferences button will take us to full users list */}
    </ScrollView>
  );
}
// have a submit button with disabled until preferences saved ??? ternary ???
export default AddPreferences;
