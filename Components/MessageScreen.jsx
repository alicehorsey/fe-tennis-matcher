import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../constants/Firebase";




class Chat extends React.Component {

    state = {
        messages: [],
    }

    componentWillMount() {
        this.setState({
            messages: [],
        });
    }

    get ref() {
        return firebase.database().ref('messages');
    }

    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));

    parse = snapshot => {
        const { timestamp: numberStamp, text, user } = snapshot.val();
        const { key: _id } = snapshot;

        const timestamp = new Date(numberStamp);

        const message = {
            _id,
            timestamp,
            text,
            user,
        };
        return message;
    }

    off() {
        this.ref.off();
    }

    get uid() {
        return (firebase.auth().currentUser || {}).uid;
    }

    get timestamp() {
        return firebase.database.ServerValue.TIMESTAMP;
    }


    send = messages => {
        for (let i = 0; i < messages.length; i++) {
            const { text, user } = messages[i];

            const message = {
                text,
                user,
                timestamp: this.timestamp,
            };
            this.append(message);
        }
    };

    append = message => this.ref.push(message);


    componentDidMount() {


        this.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }
    // 2.
    componentWillUnmount() {
        this.off();
    }

    get user() {
        // Return our name and our UID for GiftedChat to parse
        return {
            name: this.props.route.params.user.first_name,
            _id: firebase.shared.uid,
        };
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
                    onSend={this.send}
                    user={this.user}
                />


                {/* <GiftedChat
                    messages={this.state.messages}
                    renderAvatar={() => null}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: user.first_name,
                    }}
                /> */}
            </>
        );
    }
}


const styles = StyleSheet.create({});
export default Chat;