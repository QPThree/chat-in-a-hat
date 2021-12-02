import React from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Picker } from 'react-native';

export default function InviteFriendsModal({displayInviteFriendsModal, setDisplayInviteFriendsModal, emailToInvite, setEmailToInvite, handleInviteFriends}) {

    return (
        <>
            {displayInviteFriendsModal &&
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={displayInviteFriendsModal}
                        onRequestClose={() => {
                            props.setDisplayInviteFriendsModal(!displayInviteFriendsModal);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Enter Email'
                                        value={emailToInvite}
                                        onChangeText={text => setEmailToInvite(text)}
                                        style={styles.input}
                                    />
                                </View>
                                <View style={{ marginTop: 10 }}>
                                <Button
                                        onPress={() => handleInviteFriends()}
                                        title="Send"
                                        color="#17c3b2"
                                    />
                                    <Button
                                        onPress={() => setDisplayInviteFriendsModal(!displayInviteFriendsModal)}
                                        title="Close"
                                        color="#780000"
                                    />
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>}

        </>
    )
}


const styles = StyleSheet.create({

    input: {
        borderWidth: 1,
        borderColor: '#777',
        padding: 8,
        margin: 10,
        width: 200,
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        width: '75%',
        borderRadius: 20,
        padding: 25,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 10,

    },
    centeredView: {
        flex: 0.5,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 10
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