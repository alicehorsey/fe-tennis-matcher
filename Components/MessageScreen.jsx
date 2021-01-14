import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../constants/Firebase";




class Chat extends React.Component {


    state = {
        messages: [{
            _id: 1,
            createdAt: new Date(),
            text: `Welcome to Tennis Match Chat!\nSend your first message here!`,
            user: {
                _id: 1,
                avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
            },
        }],
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        const { matchedUser, user } = this.props.route.params;
        return (

            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: "center", fontSize: 40 }}>Tennis Match Chat!</Text>
                <Text style={{ alignSelf: "center", fontSize: 40 }}>{matchedUser.first_name}</Text>
                <GiftedChat
                    messages={this.state.messages}
                    showUserAvatar={true}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: user.first_name,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({});
export default Chat;