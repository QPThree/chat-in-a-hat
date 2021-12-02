import React, { Component } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { Card, ListItem, Button, Icon } from "react-native-elements";

export default function ChatCard({ userName, collection, description }) {
  const navigation = useNavigation();
  return (
    <View>
      <Card>
        <Card.Title>{collection}</Card.Title>
        <Card.Divider />

        <Text style={{ marginBottom: 10 }}>
          {description}
          
        </Text>
        <Button
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
    </View>
  );
}

const styles = StyleSheet.create({});
