import React from 'react'
import { Button, StyleSheet, Text, View, Modal, TextInput, TouchableOpacity, Picker } from 'react-native';

export default function CreateChatRoomModal({ displayModal, setDisplayModal, chatName, setChatName, handleCreateChat, handleShowModal, setIsPublic, setDescription }) {


    return (
        <>
            {displayModal &&
                <View style={styles.centeredView}>
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={displayModal}
                        onRequestClose={() => {
                            props.setDisplayModal(!displayModal);
                        }}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder='Room Name'
                                        value={chatName}
                                        onChangeText={text => setChatName(text)}
                                        style={styles.input}
                                    />
                                    <TextInput
                                        placeholder="Description.."
                                        onChangeText={text => setDescription(text)}
                                        multiline={true}
                                        underlineColorAndroid='transparent'
                                        style={styles.input}
                                    />

                                    <Picker
                                        style={{ height: 50, width: 150 }}
                                        onValueChange={(itemValue) => setIsPublic(itemValue)}>
                                        <Picker.Item label="Public" value={true} />
                                        <Picker.Item label="Private" value={false} />
                                    </Picker>
                                </View>
                                <Button
                                    onPress={() => { handleCreateChat(); setDisplayModal(!displayModal) }}
                                    title="Create"
                                    color="#17c3b2"
                                />
                                <View style={{ marginTop: 10 }}>
                                    <Button
                                        onPress={() => setDisplayModal(!displayModal)}
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