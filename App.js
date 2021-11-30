import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from '@react-navigation/drawer';
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";
import ChatRoom from "./screens/ChatRoom";

import { auth, onAuthStateChanged } from "./firebase";

import RegisterScreen from "./screens/RegisterScreen";


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();




export default function App() {

  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log("AUTH:", auth)
  console.log(auth.currentUser)

  useEffect( () => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user){
        setIsSignedIn(true);
      } else{
        setIsSignedIn(false)
      }
    } )
    return unsubscribe
  }, [])

  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Group>
          {isSignedIn ?
            <>
              <Drawer.Screen name='Home' component={HomeScreen} />
              <Drawer.Screen name='ChatRoom' component={ChatRoom} />
            </>
            :
            <>
              <Drawer.Screen name='Login' component={LoginScreen} />
              <Drawer.Screen name='Register' component={RegisterScreen} />
            </>

          }
        </Drawer.Group>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
