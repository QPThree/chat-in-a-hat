import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { auth } from "../firebase";


export default function ProfileScreen() {
    const navigation = useNavigation();

    const handleSignOut = async () => {
        await auth
            .signOut()
            .then(() => {
                navigation.navigate("Login");
            })
            .catch((e) => alert(e.message));
        console.log("AUTH AFTER SIGN OUT:", auth)
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text>Email:{auth.currentUser?.email} </Text>
                <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                    <Text style={styles.buttonText}> Sign Out </Text>
                </TouchableOpacity>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 5,
    },
    header: {
        flex: 1,
        justifyContent: "flex-start",
        padding: 4,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
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
