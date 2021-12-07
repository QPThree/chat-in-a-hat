import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Touchable,
} from "react-native";
import {
  Card,
  ListItem,
  Button,
  Chip,
  ButtonGroup,
} from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ChatCard({
  userName,
  _id,
  collection,
  description,
  isPublic,
  handleShowInviteFriendsModal,
  handleAddFavorite,
  handleChatMemberModal,
}) {
  const navigation = useNavigation();

  const FavoriteButton = () => (
    <Button
      type='solid'
      icon={<Icon name='thumbs-up' color='orange' size={20} />}
      buttonStyle={{ backgroundColor: "#FFF" }}
      onPress={() => {
        handleAddFavorite(collection);
      }}
    />
  );
  const InviteButton = () => (
    <Button
      type='solid'
      icon={<Icon name='user-plus' color='green' size={20} />}
      buttonStyle={{ backgroundColor: "#FFF" }}
      onPress={() => {
        handleShowInviteFriendsModal(collection);
      }}
    />
  );
  const MembersButton = () => (
    <Button
      type='solid'
      icon={<Icon name='users' color='blue' size={20} />}
      buttonStyle={{ backgroundColor: "#FFF" }}
      onPress={() => {
        handleChatMemberModal(collection);
      }}
    />
  );

  const buttons = [
    { element: FavoriteButton },
    { element: InviteButton },
    { element: MembersButton },
  ];
  const publicRoomButtons = [{ element: FavoriteButton }];
  return (
    <View>
      <Card>
        <Card.Title>
          <Text styles={styles.title}>{collection}</Text>
        </Card.Title>

        <Card.Divider />

        <Text style={{ marginBottom: 10 }}>{description}</Text>
        <ButtonGroup buttons={isPublic ? publicRoomButtons : buttons} />
        <Button
          raised
          icon={<Icon name='code' color='#ffffff' />}
          onPress={() =>
            navigation.navigate("ChatRoom", { collection: collection, _id: _id})
          }
          buttonStyle={{
            borderRadius: 0,
            marginLeft: 0,
            marginRight: 0,
            marginBottom: 0,
          }}
          title='Enter Chat'
        />
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginRight: 20,
  },
  cardButton: {
    marginRight: 10,
  },
});
