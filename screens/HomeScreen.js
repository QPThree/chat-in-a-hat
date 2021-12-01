import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import Card from "../components/ChatCard";

import {
  auth,
  db,
  collection,
  query,
  getDocs,
  setDoc,
  doc,
  where,
  orderBy,
} from "../firebase";
import { setStatusBarBackgroundColor } from "expo-status-bar";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [chatName, setChatName] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const roomsRef = query(
      collection(db, "rooms"),
      where("users", "array-contains", auth.currentUser?.email)
    );
    const fetchCollections = async () => {
      const querySnapShot = await getDocs(roomsRef);

      setRooms(
        querySnapShot.docs.map((doc) => {
          return doc.id;
        })
      );
    };
    fetchCollections();
  }, []);

  const handleCreateChat = async () => {
    try {
      await setDoc(doc(db, "rooms", chatName), {
        users: [auth.currentUser?.email],
        createdAt: new Date(),
      });
      setRooms([chatName, ...rooms]);
      setChatName("");
      navigation.navigate("ChatRoom", { collection: chatName });
    } catch (e) {
      console.log(e.message);
    }
  };

  return (
    <>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder='Chat Name'
            value={chatName}
            onChangeText={setChatName}
            style={styles.input}
          />
        </View>
        <TouchableOpacity onPress={handleCreateChat} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {rooms.map((id) => (
            <Card key={id} userName={auth.currentUser?.email} collection={id} />
          ))}
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
    flex: 0.5,
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
