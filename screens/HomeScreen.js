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
import CreateChatRoomModal from '../components/CreateChatRoomModal'



import { FloatingMenu } from 'react-native-floating-action-menu';


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
  const [displayModal, setDisplayModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');
  const [displayMenu, setDisplayMenu] = useState(false);
  const menuItems = [
    { label: 'New Room', onPress: () =>handleShowModal() },
  {label: "Private Chats", onPress: ()=> console.log("Show private chat rooms")}];

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
          let obj = {
            description: doc.data().description,
            id: doc.id,
          }
          return obj;
        })
      );

    };
    fetchCollections();

  }, []);

  const handleCreateChat = async () => {
    try {
      await setDoc(doc(db, "rooms", chatName), {
        users: [auth.currentUser?.email],
        public: isPublic,
        description: description,
        createdAt: new Date(),
      });
      setRooms([...rooms, { description: description }]);

      setChatName("");
      navigation.navigate("ChatRoom", { collection: chatName });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleShowModal = () => {
    setDisplayModal(true)
    setDisplayMenu(false)
  }


  return (
    <>
    {/* from https://www.npmjs.com/package/react-native-floating-action-menu */}
     <FloatingMenu
          items={menuItems}
          isOpen={displayMenu}
          onMenuToggle={()=> setDisplayMenu(!displayMenu)}
          onItemPress={(item) => item.onPress}
          position="bottom-left"
          primaryColor="#403d39"
          
        />
      <View>
       
        <View style={styles.inputContainer}>
          {displayModal &&
            <CreateChatRoomModal
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
              handleShowModal={handleShowModal}
              chatName={chatName}
              setChatName={setChatName}
              setDescription={setDescription}
              setIsPublic={setIsPublic}
              handleCreateChat={handleCreateChat} />
          }
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {rooms.map((obj) => (
            <Card key={obj.id} userName={auth.currentUser?.email} collection={obj.id} description={obj.description} />
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
