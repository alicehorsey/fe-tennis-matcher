import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../constants/Firebase";




function MessagesList(props) {

    console.log(props.userData.email, "messagesList")
    const [players, setPlayers] = useState(null)


    return (
        <>

        </>

    )
}


const styles = StyleSheet.create({});
export default MessagesList;