import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MessageScreen from "./MessageScreen"



class MessagesList extends React.Component {

    state = {
        players: ["Joseph", "Nathalia", "Paul"]
    }

    render() {

        return (
            <View style={{ flex: 1 }}>
                <Text style={{ alignSelf: "center", fontSize: 40 }}>Player Chat!</Text>
                {this.state.players.map(player => {
                    return (<>
                        {/* <Image source={require('../assets/tennis.png')} */}
                        <Image source={{ uri: "https://11cresma.files.wordpress.com/2010/01/tennis-ball.jpg" }}
                            style={{ width: 50, height: 50, alignSelf: "center", margin: 15 }} />
                        <Button key={`${player} button`}
                            title={`Message ${player}!`}
                            style={{ margin: 20 }}
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