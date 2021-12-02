import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Card, ListItem, Button, Chip, ButtonGroup } from "react-native-elements";
import Icon from 'react-native-vector-icons/FontAwesome';


export default function ChatCard({ userName, collection, description, isPublic, handleShowInviteFriendsModal, handleAddFavorite }) {
  const navigation = useNavigation();

  const FavoriteButton = () => <Button type="solid" icon={{ name: "star", color: "gold"}} buttonStyle={{backgroundColor: '#FFF'}} onPress={() => { handleAddFavorite(collection) }} />
  const InviteButton = () => <Button type="solid" icon={{ name: "add", color: "green"}} buttonStyle={{backgroundColor: '#FFF'}} onPress={() => { handleShowInviteFriendsModal(collection) }} />


  const buttons = [{element:FavoriteButton}, {element: InviteButton}]
  const publicRoomButtons=[{element:FavoriteButton},]
  return (
    <View>
      <Card>

        <Card.Title >
          <Text styles={styles.title}>{collection}</Text>
        </Card.Title>

        <Card.Divider />

        <Text style={{ marginBottom: 10 }}>
          {description}
        </Text>
        <ButtonGroup buttons={isPublic? publicRoomButtons: buttons} />
        <Button
          raised
          icon={<Icon name='code' color='#ffffff' />}
          onPress={() =>
            navigation.navigate("ChatRoom", { collection: collection })
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
    </View >
  );
}

const styles = StyleSheet.create({
  title: {
    marginRight: 20,
  },
  cardButton: {
    marginRight: 10,
  }
});
