import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../constants/Firebase";




class Chat extends React.Component {

    state = {
        messages: [],
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {

        const { matchedUser, user } = this.props.route.params;

        return (
            <>
                <Text>Send a message to {matchedUser.first_name}!</Text>

                <GiftedChat
                    messages={this.state.messages}
                    renderAvatar={() => null}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: user.first_name,
                    }}
                />
            </>
        );
    }
}


const styles = StyleSheet.create({});
export default Chat;