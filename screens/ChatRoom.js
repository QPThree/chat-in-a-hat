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

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);

  // useEffect(() => {
  //   setMessages([
  //     {
  //       _id: 1,
  //       text: "Hello developer",
  //       createdAt: new Date(),
  //       user: {
  //         _id: 2,
  //         name: "React Native",
  //         avatar: "https://placeimg.com/140/140/any",
  //       },
  //     },
  //   ]);
  // }, []);
  useLayoutEffect(() => {
    const q = query(collection(db, "chats"));
    const unsubscribe = onSnapshot(
      q,
      orderBy("createdAt", "desc"),
      (querySnapShot) => {
        querySnapShot.forEach((chat) => {
          console.log(chat.data());
          const chats = [];
          let doc = {
            _id: chat.data()._id,
            createdAt: chat.data().createdAt.toDate(),
            text: chat.data().text,
            user: chat.data().user,
          };
          // console.log(doc);
          chats.push(doc);
          // setMessages(chats);
        });
      }
    );
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), {
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
