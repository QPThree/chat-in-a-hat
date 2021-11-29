import { useNavigation } from "@react-navigation/native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { getAuth } from "../firebase";

const HomeScreen = () => {
  const auth = getAuth();
  const navigation = useNavigation();

  const handleSigOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login");
      })
      .catch((e) => alert(e.message));
  };

  return (
    <View style={styles.container}>
      <Text>Email:{auth.currentUser?.email} </Text>
      <TouchableOpacity style={styles.button} onPress={handleSigOut}>
        <Text style={styles.buttonText}> Sign Out </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  button: {
    backgroundColor: "powderblue",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 40,
  },
});
