import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';


class Chat extends React.Component {


    state = {
        messages: [],
    }


    render() {

        const { matchedUser, user } = this.props.route.params;

        return (
            <>
                <Text>{matchedUser.first_name}</Text>
                <Text>{user.first_name}</Text>

                <GiftedChat
                    messages={this.state.messages}
                />
            </>
        )
    }

}


const styles = StyleSheet.create({});
export default Chat;