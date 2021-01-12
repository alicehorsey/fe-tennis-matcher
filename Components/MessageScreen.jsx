import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends React.Component {


    state = {
        messages: [],
    }

    componentWillMount() {
        this.setState({
            messages: [],
        });
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
                        id: user.first_name,
                    }}
                />
            </>
        );
    }
}


const styles = StyleSheet.create({});
export default Chat;