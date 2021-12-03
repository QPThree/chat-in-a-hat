import React from 'react'
import { StyleSheet, Text, View, Modal, SafeAreaView, FlatList, Button } from 'react-native'

export default function ChatMembersModal({ setDisplayChatMembersModal, displayChatMembersModal }) {
    const DATA = [
        {
            id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
            title: 'First Item',
        },
        {
            id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
            title: 'Second Item',
        },
        {
            id: '58694a0f-3da1-471f-bd96-145571e29d72',
            title: 'Third Item',
        },
    ];

    const Item = ({ title }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item title={item.title} />
    );

    return (
        <View style={styles.centeredView}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={displayChatMembersModal}
                onRequestClose={() => {
                    setDisplayChatMembersModal(!displayChatMembersModal);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <SafeAreaView style={styles.container}>
                            <FlatList
                                data={DATA}
                                renderItem={renderItem}
                                keyExtractor={item => item.id}
                            />
                            <View style={{ marginTop: 10 }}>
                        <Button
                            onPress={() => setDisplayChatMembersModal(!displayChatMembersModal)}
                            title="Close"
                            color="#780000"
                        />
                    </View>
                        </SafeAreaView>
                        
                    </View>
                    
                </View>

            </Modal>
        </View>
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