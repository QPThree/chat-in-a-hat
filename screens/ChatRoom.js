import React, { useLayoutEffect, useState, useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { GiftedChat } from "react-native-gifted-chat";
import {
  auth,
  db,
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
} from "../firebase";

const ChatRoom = ({ route }) => {
  const [messages, setMessages] = useState([]);


  useLayoutEffect(() => {
    setMessages([]);

    const q = query(
      collection(db, "rooms", route.params.collection, "messages"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      setMessages(
        querySnapShot.docs.map((chat) => {
          let doc = {
            _id: chat.data()._id,
            createdAt: chat.data().createdAt.toDate(),
            text: chat.data().text,
            user: chat.data().user,
          };
          return doc;
        })
      );
    });
    return unsubscribe;
  }, [route.params.collection]);

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
  }, []);

  // if (messages.length < 1) {
  //   return <Text>LOADING</Text>;
  // }

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.displayName,
        avatar: auth?.currentUser?.photoURL,
      }}
    />

  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
