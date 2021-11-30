import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../components/ChatCard";

import { auth, db } from "../firebase";

const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <>
      <View style={styles.header}>
        <Text>Email:{auth.currentUser?.email} </Text>
      </View>
      <View style={styles.container}>
        <ScrollView>
          <Card userName={auth.currentUser?.email} />
          <Card userName={auth.currentUser?.email} />
          <Card userName={auth.currentUser?.email} />
          <Card userName={auth.currentUser?.email} />
        </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 5,
  },
  header: {
    flex: 0.1,
    justifyContent: "flex-start",
    padding: 4,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
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
