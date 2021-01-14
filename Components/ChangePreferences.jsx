import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Animated,
  ScrollView,
} from "react-native";
import { Slider, Icon, CheckBox, ButtonGroup } from "react-native-elements";
import { updateUser, getUser } from "../API";

function ChangePreferences(props) {

  // console.log(props.userData, "Change Preferences Screen")


  //console.log(profileInfo);

  const [loading, setLoading] = useState(true);
  const [profileInfo, setProfileInfo] = useState(null);

  const [distance, setDistance] = useState(null);
  const opponentHandButtons = ["left-handed", "right-handed", "either"];
  const [opponentHand, setOpponentHand] = useState(null);
  const abilityLevelButtons = [
    "beginner",
    "intermediate",
    "advanced",
    "expert",
  ];
  const [opponentAbility, setOppoenentAbility] = useState([]);

  const opponentGroupOptions = ["mens", "womens", "either"];
  const [group, setGroup] = useState(null);
  const [savedPreferences, setSavedPreferences] = useState(false);

  useEffect(() => {
    getUser(props.extraData.email).then((data) => {
      console.log(data)
      setLoading(false);
      setProfileInfo(data);
      setDistance(data.distance);
      setOpponentHand(opponentHandButtons.indexOf(data.gender_preference));
      setOppoenentAbility([data.min_ability, data.max_ability]);
      setGroup(opponentGroupOptions.indexOf(data.gender_preference));
    });
  }, [])

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

  if (loading) {
    return <Text>Loading!</Text>;
  } else {
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
        <Text>Choose your range of opponent ability levels</Text>
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
          onPress={() => {
            addPreferences(
              profileInfo,
              distance,
              opponentAbility,
              group,
              opponentHand
            );

            console.log(profileInfo, Object.keys(profileInfo).length);
            updateUser(profileInfo);
            props.navigation.navigate("Matches", profileInfo)
          }}
        />

      </ScrollView>
    );
  }
}
export default ChangePreferences;

