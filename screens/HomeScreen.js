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
  updateDoc,
  where,
  orderBy,
  collectionGroup,
} from "../firebase";
import { setStatusBarBackgroundColor } from "expo-status-bar";
import InviteFriendsModal from "../components/InviteFriendsModal";
import { arrayUnion } from "@firebase/firestore";

const HomeScreen = () => {
  const [rooms, setRooms] = useState([]);
  const [allRooms, setAllRooms] = useState([])
  const [privateRooms, setPrivateRooms] = useState([])
  const [usersFavorites, setUsersFavorites] = useState([])
  const [chatName, setChatName] = useState("")
  const [displayModal, setDisplayModal] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [description, setDescription] = useState("");
  const [displayMenu, setDisplayMenu] = useState(false);
  const [displayInviteFriendsModal, setDisplayInviteFriendsModal] = useState(false);
  const [emailToInvite, setEmailToInvite] = useState('')
  const [roomToInviteTo, setRoomToInviteTo] = useState('')
  const menuItems = [

    { label: 'New Room', onPress: () => handleShowModal() },
    { label: "Private Chats", onPress: () => displayPrivateRooms() },
    { label: "All Chats", onPress: () => displayAllRooms() },
    { label: "Favorites", onPress: () => displayFavoriteRooms() },];

  const navigation = useNavigation();

  useEffect(() => {
    const privateChats = query(
      collection(db, "rooms"),
      where("public", "==", "False"),
      where("users", "array-contains", auth.currentUser?.email)
    );
    const publicChats = query(
      collection(db, "rooms"),
      where("public", "==", true)
    );
    const favoriteChats = query(
      collection(db, "rooms"),
      where("favoritedBy", "array-contains", auth.currentUser?.email)
    );

    const fetchCollections = async () => {
      const queryPrivate = await getDocs(privateChats);
      const queryPublic = await getDocs(publicChats);
      const queryFavorites = await getDocs(publicChats);

      const privateRooms = queryPrivate.docs.map((doc) => {
        let obj = {
          description: doc.data().description,
          id: doc.id,
          isPublic: false,
        };
        return obj;
      });

      const publicRooms = queryPublic.docs.map((doc) => {
        let obj = {
          description: doc.data().description,
          id: doc.id,
          isPublic: true,
        };
        return obj;
      });
      const favoriteRooms = queryFavorites.docs.map((doc) => {
        let obj = {
          description: doc.data().description,
          id: doc.id,
          isPublic: true,
        };
        return obj;
      })

      setRooms([...privateRooms, ...publicRooms]);
      setAllRooms([...privateRooms, ...publicRooms])
      setPrivateRooms(privateRooms)
      setUsersFavorites(favoriteRooms)

    };
    fetchCollections();
  }, []);



  const handleCreateChat = async () => {
    try {
      await setDoc(doc(db, "rooms", chatName), {
        users: [auth.currentUser?.email],
        favoritedBy: [],
        public: isPublic,
        description: description,
        createdAt: new Date(),
      });

      setRooms([...rooms, { isPublic: isPublic, collection: chatName, description: description, id: chatName }]);

      navigation.navigate("ChatRoom", { collection: chatName });
      setChatName("");
    } catch (e) {
      console.log(e.message);
    }
  };

  const handleShowModal = () => {
    setDisplayModal(true)
    setDisplayMenu(false)
  }

  const handleInviteFriends = () => {
    setDisplayInviteFriendsModal(false)
    addEmailToPrivateChat()
    setEmailToInvite('')
  }
  const handleShowInviteFriendsModal = (room) => {
    console.log(room)
    setRoomToInviteTo(room)
    handleInviteFriends()
    setDisplayInviteFriendsModal(true)
    setDisplayMenu(false)
  }

  const addEmailToPrivateChat = async () => {
    try {
      await updateDoc(doc(db, "rooms", roomToInviteTo), {
        users: arrayUnion(emailToInvite),
      });
      setEmailToInvite('')
      setRoomToInviteTo('')
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleAddFavorite = async (collection) => {
    try {
      await updateDoc(doc(db, "rooms", collection), {
        favoritedBy: arrayUnion(auth.currentUser?.email),
      });
      setEmailToInvite('')
      setRoomToInviteTo('')
    } catch (e) {
      console.log(e.message);
    }
  }

  const displayPrivateRooms = () => {
    setRooms(privateRooms)
    setDisplayMenu(false)
  }
  const displayAllRooms = () => {
    setRooms(allRooms)
    setDisplayMenu(false)
  }
  const displayFavoriteRooms = async () => {
    setRooms(usersFavorites)
    setDisplayMenu(false)
  }


  return (
    <>
      {/* from https://www.npmjs.com/package/react-native-floating-action-menu */}
      <FloatingMenu
        items={menuItems}
        isOpen={displayMenu}
        onMenuToggle={() => setDisplayMenu(!displayMenu)}
        onItemPress={(item) => item.onPress}
        position='bottom-left'
        primaryColor='#403d39'
      />
      <View>

        <View style={styles.inputContainer}>
          {displayModal && (
            <CreateChatRoomModal
              displayModal={displayModal}
              setDisplayModal={setDisplayModal}
              handleShowModal={handleShowModal}
              chatName={chatName}
              setChatName={setChatName}
              setDescription={setDescription}
              setIsPublic={setIsPublic}
              handleCreateChat={handleCreateChat} />
          )
          }
          {displayInviteFriendsModal &&
            <InviteFriendsModal
              displayInviteFriendsModal={displayInviteFriendsModal}
              setDisplayInviteFriendsModal={setDisplayInviteFriendsModal}
              emailToInvite={emailToInvite}
              setEmailToInvite={setEmailToInvite}
              handleInviteFriends={handleInviteFriends} />}
        </View>
      </View>
      <View style={styles.container}>
        <ScrollView>
          {rooms.map((obj) => (
            <Card
              key={obj.id}
              userName={auth.currentUser?.email}
              collection={obj.id}
              description={obj.description}
              isPublic={obj.isPublic}
              handleShowInviteFriendsModal={handleShowInviteFriendsModal}
              handleAddFavorite={handleAddFavorite} />
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
