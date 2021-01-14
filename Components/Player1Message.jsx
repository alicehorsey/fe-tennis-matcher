import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import firebase from "../constants/Firebase";


class Chat extends React.Component {

    state = {
        messages: [],
    }

    componentDidMount() {
        this.setState({
            messages: [
                {
                    _id: 4,
                    createdAt: new Date(Date.UTC(2020, 12, 12, 19, 56, 0)),
                    text: "Just a few months! It'll be great to find some new partners on this app! Game next Thursday?",
                    user: {
                        _id: 2,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    },
                },
                {
                    _id: 3,
                    createdAt: new Date(Date.UTC(2020, 12, 12, 18, 47, 0)),
                    text: "I'm free most Thursdays! How long have you been playing for?",
                    user: {
                        _id: 1,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    },
                },
                {
                    _id: 2,
                    createdAt: new Date(Date.UTC(2020, 12, 12, 17, 30, 0)),
                    text: `Hey! Thanks for the message. Yeah, sounds great. When are you free?`,
                    user: {
                        _id: 2,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    },
                },
                {
                    _id: 1,
                    createdAt: new Date(Date.UTC(2020, 12, 12, 17, 20, 0)),
                    text: `Hi! How are you? Would you like a match sometime?`,
                    user: {
                        _id: 1,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    },
                },
            ],
        });
    }

    onSend(messages = []) {
        this.setState((previousState) => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    render() {
        const { player } = this.props.route.params;
        return (
            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: "center", fontSize: 40 }}>Player Chat!</Text>
                <Text style={{ alignSelf: "center", fontSize: 40 }}>{player}</Text>
                <GiftedChat
                    messages={this.state.messages}
                    showUserAvatar={true}
                    onSend={(messages) => this.onSend(messages)}
                    user={{
                        _id: 1,
                        avatar: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg",
                    }}
                />
            </View>
        );
    }
}


const styles = StyleSheet.create({});
export default Chat;