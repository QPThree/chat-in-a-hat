

import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Touchable } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default function ChatCard({ userName}) {
    return (
        <View>
            <Card>
                <Card.Title>ROOM TITLE</Card.Title>
                <Card.Divider />

                <Text style={{ marginBottom: 10 }}>
                    Description of chat room. Name will be passed as prop into room: {userName}
                </Text>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    onPress={() => console.log('Enter room')}
                    buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                    title='VIEW NOW' />

            </Card>

        </View>
    )
}

const styles = StyleSheet.create({
})
