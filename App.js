import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";

import { LoginScreen, RegistrationScreen } from "./src/logInScreens";
import CreateProfile from "./Components/CreateProfile";
import AddPreferences from "./Components/AddPreferences";
import DisplayMatches from './Components/DisplayMatches';
import MessageScreen from "./Components/MessageScreen";

import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
import firebase from './constants/Firebase';
import { getUser } from './API';
import axios from "axios";

const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [profileCreated, setProfileCreated] = useState(false)


  useEffect(() => {
    console.log("hello")
    const usersRef = firebase.firestore().collection('users');

    firebase.auth().onAuthStateChanged(user => {

      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data()
            console.log(userData, "userData line 53")
            setLoading(false)
            setUser(userData)
          })
          .catch((error) => {
            console.log(error)
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);


  //This is the beginning of the return function
  if (loading) {
    return (
      <Text>Loading!</Text>
    )
  } else {
    //Need to add a mini "loading" here while get request to back end happens
    if (user) {
      getUser(user.email).then(data => {
        if (typeof data === "object") {
          setProfileCreated(true)
        }
      })
    }

    return (
      <>
        < NavigationContainer >
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
            }}>

            {user ? (profileCreated ? (<><Stack.Screen name="Matches" >
              {props => <DisplayMatches {...props} extraData={user} />}
            </Stack.Screen>
              <Stack.Screen
                name="Message Player"
                component={MessageScreen}
                options={{
                  title: 'Chat!',
                }}
              /></>) : (
                <>
                  <Stack.Screen name="Create Profile">
                    {props => <CreateProfile {...props} extraData={user} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="AddPreferences"
                    component={AddPreferences}
                    options={{ title: "Preferences" }}
                  />
                  <Stack.Screen name="Matches" >
                    {props => <DisplayMatches {...props} extraData={user} />}
                  </Stack.Screen>
                  <Stack.Screen
                    name="Message Player"
                    component={MessageScreen}
                    options={{
                      title: 'Chat!',
                    }}
                  />
                </>
              )
            ) : (
                <>
                  <Stack.Screen name="Login" component={LoginScreen} />
                  <Stack.Screen name="Registration" component={RegistrationScreen} />

                </>
              )}
          </Stack.Navigator>
        </NavigationContainer >
      </>
    );
  }

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
