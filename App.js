import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { LoginScreen, RegistrationScreen } from "./src/logInScreens";
import CreateProfile from "./Components/CreateProfile";
import AddPreferences from "./Components/AddPreferences";
import DisplayMatches from "./Components/DisplayMatches";
import MessageScreen from "./Components/MessageScreen";

import { decode, encode } from "base-64";
import DisplayTennisClubs from "./Components/DisplayTennisClubs";
import ChangePreferences from "./Components/ChangePreferences";
import MessagesList from "./Components/MessagesList";
if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}
import firebase from "./constants/Firebase";
import { getUser } from "./API";
import axios from "axios";

// const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [profileData, setProfileData] = useState(null);
  const [profileCreated, setProfileCreated] = useState(null);
  // const [profileLoading, setProfileLoading] = useState(true)

  const toggleDrawer = () => {
    //Props to open/close the drawer
    navigation.toggleDrawer();
  };

  useEffect(() => {
    console.log("hello");
    const usersRef = firebase.firestore().collection("users");

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            console.log(userData, "userData line 46");
            setUser(userData);

            if (userData !== undefined) {
              getUser(userData.email).then((data) => {
                // if (typeof data === "object") {
                //   setLoading(false)
                //   setProfileCreated(true)
                // }
                console.log(Object.keys(data).length, "profile data line 54");
                if (Object.keys(data).length > 0) {
                  setProfileData(data);
                  setProfileCreated(true);
                }
              });
            }
            setLoading(false);
          })
          .catch((error) => {
            console.log(error, "error");
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  //This is the beginning of the return function
  if (loading) {
    return <Text>Loading!</Text>;
  } else {
    return (
      <>
        <NavigationContainer>
          <Drawer.Navigator
            screenOptions={({ navigation }) => ({
              headerShown: true,
              headerStyle: {
                backgroundColor: "#f4511e",
              },
              headerTintColor: "#fff",
              headerTitleStyle: {
                fontWeight: "bold",
              },
              headerRight: () => (
                <TouchableOpacity onPress={
                  () => navigation.toggleDrawer()}>
                  <Image
                    source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                    style={{
                      width: 25,
                      height: 25,
                      marginLeft: 5
                    }}
                  />
                </TouchableOpacity>
              )
            })}
          >
            {user ? (
              profileCreated ? (
                <>
                  <Drawer.Screen name="Matches">
                    {(props) => (
                      <DisplayMatches
                        {...props}
                        extraData={user}
                        userProfile={profileData}
                      />
                    )}
                  </Drawer.Screen>
                  <Drawer.Screen name="Display Tennis Clubs">
                    {(props) => (
                      <DisplayTennisClubs {...props} extraData={user} />
                    )}
                  </Drawer.Screen>
                  <Drawer.Screen name="Change Preferences">
                    {(props) => (
                      <ChangePreferences {...props} extraData={user} />
                    )}
                  </Drawer.Screen>
                  <Drawer.Screen name="Messages List">
                    {(props) => <MessagesList {...props} extraData={user} />}
                  </Drawer.Screen>
                  <Drawer.Screen name="Message Player">
                    {(props) => <MessageScreen {...props} extraData={user} />}
                  </Drawer.Screen>
                </>
              ) : (
                  <>
                    <Drawer.Screen name="Create Profile">
                      {(props) => <CreateProfile {...props} extraData={user} />}
                    </Drawer.Screen>
                    <Drawer.Screen
                      name="AddPreferences"
                      component={AddPreferences}
                      options={{ title: "Preferences" }}
                    />
                    <Drawer.Screen name="Matches">
                      {(props) => <DisplayMatches {...props} extraData={user} />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Display Tennis Clubs">
                      {(props) => (
                        <DisplayTennisClubs {...props} extraData={user} />
                      )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Change Preferences">
                      {(props) => (
                        <ChangePreferences {...props} extraData={user} />
                      )}
                    </Drawer.Screen>
                    <Drawer.Screen name="Messages List">
                      {(props) => <MessagesList {...props} extraData={user} />}
                    </Drawer.Screen>
                    <Drawer.Screen name="Message Player">
                      {(props) => <MessageScreen {...props} extraData={user} />}
                    </Drawer.Screen>
                  </>
                )
            ) : (
                <>
                  <Drawer.Screen name="Login" component={LoginScreen} />
                  <Drawer.Screen
                    name="Registration"
                    component={RegistrationScreen}
                  />
                </>
              )}
          </Drawer.Navigator>
        </NavigationContainer>
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
