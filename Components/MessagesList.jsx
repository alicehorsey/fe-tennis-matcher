import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MessageScreen from "./MessageScreen"



class MessagesList extends React.Component {

    state = {
        players: ["Joseph", "Nathalia", "Sue", "Paul"]
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                {this.state.players.map(player => {
                    return (<>
                        <Image source={require('../assets/tennis.png')}
                            style={{ width: 50, height: 60, alignSelf: "center", margin: 15 }} />
                        <Button key={`${player} button`}
                            title={`Message ${player}!`}
                            onPress={() => this.props.navigation.navigate("Message", { player })}
                        />

                    </>)

                })}
            </View>

        )
    }

}


const styles = StyleSheet.create({});
export default MessagesList;