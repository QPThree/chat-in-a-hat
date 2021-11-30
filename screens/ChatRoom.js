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
  doc
} from "../firebase";


const ChatRoom = () => {
  const [messages, setMessages] = useState([]);


  useLayoutEffect(() => {
    const q = query(collection(db, "rooms", "roomA", "messages"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      setMessages(
        querySnapShot.docs.map((chat) => {
          // console.log(chat.data());

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
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "rooms", "roomA", "messages"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
        name: auth?.currentUser?.name || "mark",
        avatar: auth?.currentUser?.photoURL || "fake",
      }}
    />
  );
};

export default ChatRoom;

const styles = StyleSheet.create({});
