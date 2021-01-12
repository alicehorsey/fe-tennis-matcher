import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import 'react-native-gesture-handler';

import { LoginScreen, RegistrationScreen } from './src/logInScreens'
import CreateProfile from "./Components/CreateProfile";
import AddPreferences from "./Components/AddPreferences";
import DisplayMatches from './Components/DisplayMatches';

import { decode, encode } from 'base-64'
import DisplayTennisClubs from "./Components/DisplayTennisClubs";
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
// import firebase from './constants/Firebase'; <---- for loading (not implemented yet)



const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true) //<--- not implemented yet
  const [user, setUser] = useState(null)

  // This function will be used when loading is implemented --->
  // useEffect(() => {
  //   const usersRef = firebase.firestore().collection('users');
  //   firebase.auth().onAuthStateChanged(user => {
  //     console.log(user, "useEffect user")
  //     if (user) {
  //       usersRef
  //         .doc(user.uid)
  //         .get()
  //         .then((document) => {
  //           const userData = document.data()
  //           setLoading(false)
  //           setUser(userData)
  //         })
  //         .catch((error) => {
  //           console.log(error)
  //           setLoading(false)
  //         });
  //     } else {
  //       setLoading(false)
  //     }
  //   });
  // }, []);

  // if (loading) {
  return (
    <DisplayTennisClubs />
  );
}
