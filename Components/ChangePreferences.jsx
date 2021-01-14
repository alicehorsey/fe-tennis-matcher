import React, { useState, useEffect } from "react";
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
  // const profileInfo = { ...route.params };
  // // console.log(profileInfo);

  // const [distance, setDistance] = useState(profileInfo.distance);
  // const opponentHandButtons = ["left-handed", "right-handed", "either"];
  // const [opponentHand, setOpponentHand] = useState(opponentHandButtons.indexOf(profileInfo.gender_preference));
  // const abilityLevelButtons = [
  //   "beginner",
  //   "intermediate",
  //   "advanced",
  //   "expert",
  // ];
  // const [opponentAbility, setOpponentAbility] = useState([profileInfo.min_ability, profileInfo.max_ability]);

  // const opponentGroupOptions = ["mens", "womens", "either"];
  // const [group, setGroup] = useState(opponentGroupOptions.indexOf(profileInfo.gender_preference));
  // const [savedPreferences, setSavedPreferences] = useState(false);
  // // current queries set up are gender / playing hand / min ability / max ability
  // const addPreferences = (
  //   profileData,
  //   distance,
  //   opponentAbility,
  //   group,
  //   opponentHand
  // ) => {
  //   profileData.distance = distance;
  //   if (opponentAbility.length === 0) {
  //     profileData.min_ability = 1;
  //     profileData.max_ability = 4;
  //   } else if (opponentAbility.length === 1) {
  //     profileData.min_ability = opponentAbility[0] + 1;
  //     profileData.max_ability = opponentAbility[0] + 1;
  //   } else {
  //     profileData.min_ability = opponentAbility.sort()[0] + 1;
  //     profileData.max_ability =
  //       opponentAbility.sort()[opponentAbility.length - 1] + 1;
  //   }
  //   if (group === 0) {
  //     profileData.gender_preference = "m";
  //   } else if (group === 1) {
  //     profileData.gender_preference = "f";
  //   } else {
  //     profileData.gender_preference = "";
  //   }
  //   if (opponentHand === 0) {
  //     profileData.hand_preference = "left-handed";
  //   } else if (opponentHand === 1) {
  //     profileData.hand_preference = "right-handed";
  //   } else {
  //     // this will not add anything could be removed
  //     profileData.hand_preference = "";
  //   }
  //   return profileData;
  // };

  console.log(props, "Change Preferences Screen")

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
    return <Text style={{ fontSize: 50 }}>🎾 Loading 🎾</Text>;
  } else {
    return (

      <ScrollView>
        <View>

          <Text style={styles.questions}>How far are you willing to travel?</Text>
          <Text style={styles.questions}>Distance chosen: {distance} miles</Text>

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

          <Text style={styles.questions}>What would you like your opponent hand to be?</Text>
          <ButtonGroup
            selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
            onPress={(selected) => {
              setOpponentHand(selected);
            }}
            selectedIndex={opponentHand}
            buttons={opponentHandButtons}
          ></ButtonGroup>
          <Text style={styles.questions}>What ability would you like your opponent to be?</Text>

          <ButtonGroup
            selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
            onPress={(selected) => setOppoenentAbility(selected)}
            selectMultiple={true}
            selectedIndexes={opponentAbility}
            buttons={abilityLevelButtons}
          ></ButtonGroup>

          <Text style={styles.questions}>What group do you want to play in?</Text>
          <ButtonGroup
            selectedButtonStyle={{ backgroundColor: '#55008c', color: 'white' }}
            onPress={(selected) => {
              setGroup(selected);
            }}
            selectedIndex={group}
            buttons={opponentGroupOptions}
          ></ButtonGroup>
          <Text style={styles.questions}>Hope you find your match!</Text>
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
              updateUser(profileInfo);
              props.navigation.navigate("Matches", profileInfo)
            }}
          />
        </View>
      </ScrollView>

    );
  }
}
export default ChangePreferences;

const styles = StyleSheet.create({
  questions: {
    margin: 10,
    fontSize: 18
  }
})