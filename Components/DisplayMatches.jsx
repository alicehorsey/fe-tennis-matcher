import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Image,
  Button,
  ScrollView,
  Dimensions,
  StyleSheet,
  Alert,
} from "react-native";
import firebase from "../constants/Firebase";
import { getUsers } from "../API.js";
const { width } = Dimensions.get("window");
const height = width * 1.3;

const DisplayMatches = () => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [active, setActive] = useState(0);
  const [user, setUser] = useState({
    user_id: "1",
    username: "martina.hingis@yahoo.co.uk",
    first_name: "Martina",
    last_name: "Hingis",
    latitude: "53.796305",
    longitude: "-1.564126",
    date_of_birth: "19800930",
    gender: "m",
    ability: "1",
    playing_hand: "right-handed",
    club_membership: "Kirkstall Abbey Tennis Club",
    weekday_daytime: "",
    weekday_evening: "",
    weekends: "",
    description:
      "Tennis is mostly mental. Of course you must have a lot of physical skill but you can't play tennis well and not be a good thinker. You win or lose the match before you even go out there. Venus Williams",
    distance: "10",
    min_ability: "1",
    max_ability: "3",
    hand_preference: "",
    min_age: "18",
    max_age: "100",
    gender_preference: "f",
  });
  const DisplayMatches = (props) => {
    console.log(props.route.params.user, "display matches screen");

    const abilityStrings = {
      1: "Beginner",
      2: "Intermediate",
      3: "Advanced",
      4: "Expert",
    };

    useEffect(() => {
      getUsers(user).then((matchingUsers) => {
        console.log(matchingUsers[0], matchingUsers.length);
        setIsLoading(false);
        setMatchedUsers(matchingUsers);
      });
    }, []);

    const changeActive = ({ nativeEvent }) => {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
      );
      if (slide != active) setActive(slide);
    };

    const handleClick = () => {
      const newMatchedUsers = [...matchedUsers];
      newMatchedUsers.splice(active, 1);
      setMatchedUsers(newMatchedUsers);
    };

    const style = StyleSheet.create({
      container: { marginTop: 0, width, height },
      scroll: { width, height },
      image: { width, height, resizeMode: "cover", flex: 1 },
      userInfo: {
        width,
        paddingLeft: 5,
        paddingRight: 5,
        alignItems: "center",
      },
      pagination: {
        flexDirection: "row",
        position: "absolute",
        bottom: -30,
        alignSelf: "center",
      },
      pagingText: { fontSize: width / 35, color: "green", margin: 3 },
      pagingActiveText: { fontSize: width / 35, color: "black", margin: 3 },
    });
  };
};
export default DisplayMatches;
