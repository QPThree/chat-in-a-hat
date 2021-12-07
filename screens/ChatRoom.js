import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useEffect,
} from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import {
  auth,
  db,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "../firebase";

import io from "socket.io-client";
import axios from 'axios'


const getColor = (username) => {
  let sumChars = 0;
  for (let i = 0; i < username.length; i++) {
    sumChars += username.charCodeAt(i);
  }

  const colors = [
    "#e67e22", // carrot
    "#2ecc71", // emerald
    "#3498db", // peter river
    "#8e44ad", // wisteria
    "#e74c3c", // alizarin
    "#1abc9c", // turquoise
    "#2c3e50", // midnight blue
  ];
  return colors[sumChars % colors.length];
};

const ChatRoom = ({ route }) => {
  let socket;
 
  const [messages, setMessages] = useState([]);
  const [test, setTest] = useState("");
  

  

  useLayoutEffect(() => {
    console.log("ID BEGINNING OF LAYOUT EFFECT",route.params._id)
    socket = io(`http://10.135.209.204:8000/`, {query:{"chatROOM": route.params._id}});

   

    axios.get(`http://10.135.209.204:8000/room/${route.params._id}`).then(result => setMessages(result.data.messages))
    // const q = query(
    //   collection(db, "rooms", route.params.collection, "messages"),
    //   orderBy("createdAt", "desc")
    // );

    socket?.on('new message', (message) => {
      console.log("NEW MESSAGE HIT")
      setMessages([...messages, message])
    })

    // const unsubscribe = onSnapshot(q, (querySnapShot) => {
    //   setMessages(
    //     querySnapShot.docs.map((chat) => {
    //       let doc = {
    //         _id: chat.data()._id,
    //         createdAt: chat.data().createdAt.toDate(),
    //         text: chat.data().text,
    //         user: chat.data().user,
    //       };
    //       return doc;
    //     })
    //   );
    // });
    // return unsubscribe;
  }, [route.params._id]);

  // useEffect(() => {

  // }, []);
 

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "rooms", route.params.collection, "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
    console.log("ROUTEPARAMSID", route.params._id)
    socket.emit("chat message", { "ChatRoomID": route.params._id, _id, createdAt, text, user });
  }, []);

  // if (messages.length < 1) {xs
  //   return <Text>LOADING</Text>;
  // }

  const renderBubble = (props) => {
    let username = props.currentMessage.user.name;
    let color = getColor(username ? username : "gray");
    return (
      <Bubble
        {...props}
        userNameStyle={{
          left: {
            color: "white",
          },
        }}
        timeTextStyle={{
          left: {
            color: "white",
          },
        }}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "white",
          },
          username: {
            color: "black",
          },
        }}
        wrapperStyle={{
          left: {
            backgroundColor: color,
          },
        }}
      />
    );
  };

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      renderBubble={renderBubble}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        email: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
