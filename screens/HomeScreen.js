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

import { auth, db, collection, query, getDocs, setDoc, doc } from "../firebase";
import { addDoc } from "@firebase/firestore";


const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [chatName, setChatName] = useState("");
  const [displayModal, setDisplayModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  console.log(auth.currentUser);

  useEffect(() => {
    const roomsRef = query(collection(db, "rooms"));
    const fetchCollections = async () => {
      const querySnapShot = await getDocs(roomsRef);

      setRooms(
        querySnapShot.docs.map((doc) => {
          let obj ={
            description: doc.data().description,
            id: doc.id,
          }
          return obj;
        })
      );
      
    };
    fetchCollections();
    console.log("ROOMS:", rooms)
    
   
  }, []);

  const handleCreateChat = async () => {
    try {
      await setDoc(doc(db, "rooms", chatName), {
        users: [auth.currentUser?.email],
        public: isPublic,
        description: description,
      });
      setRooms([...rooms, {description: description}]);
      setChatName("");
      navigation.navigate("ChatRoom", { collection: chatName });
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleShowModal = () => {
    setDisplayModal(true)
  }

  return (
    <>
      <View style={styles.header}>
        <View style={styles.inputContainer}>
          
       
        <TouchableOpacity onPress={handleShowModal} style={styles.button}>
          <Text style={styles.buttonText}>Create Room</Text>
        </TouchableOpacity>
        {displayModal && 
          <CreateChatRoomModal 
            displayModal={displayModal}
            setDisplayModal={setDisplayModal}
            handleShowModal={handleShowModal}
            chatName={chatName}
            setChatName={setChatName} 
            setDescription={setDescription}
            setIsPublic={setIsPublic}
            handleCreateChat={handleCreateChat}/>
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
  header: {
    flex: 0.3,
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
