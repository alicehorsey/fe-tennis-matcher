import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
// import TennisHomeScreen from "./Components/TennisHomeScreen";
// import CreateProfile from "./Components/CreateProfile";
// import AddPreferences from "./Components/AddPreferences";

import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react'
import { LoginScreen, HomeScreen, RegistrationScreen } from './src/screens'
import { decode, encode } from 'base-64'
if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }


const Stack = createStackNavigator();

export default function App() {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  return (

    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen name="Home">
            {props => <HomeScreen {...props} extraData={user} />}
          </Stack.Screen>
        ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Registration" component={RegistrationScreen} />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>

    // <NavigationContainer>
    //   <Stack.Navigator
    //     screenOptions={{
    //       headerStyle: {
    //         backgroundColor: "#f4511e",
    //       },
    //       headerTintColor: "#fff",
    //       headerTitleStyle: {
    //         fontWeight: "bold",
    //       },
    //     }}
    //   >
    //     <Stack.Screen
    //       name="Home"
    //       component={TennisHomeScreen}
    //       options={{ title: "Home" }}
    //     />
    //     <Stack.Screen
    //       name="CreateProfile"
    //       component={CreateProfile}
    //       options={{ title: "Profile" }}
    //     />
    //     <Stack.Screen
    //       name="AddPreferences"
    //       component={AddPreferences}
    //       options={{ title: "Preferences" }}
    //     />
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
