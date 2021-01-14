import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button, ScrollView, Dimensions, StyleSheet, Alert, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';
import firebase from '../constants/Firebase';
import { getUser, getUsers } from '../API.js';
import AddPreferences from './AddPreferences';
const { width } = Dimensions.get("window")
const height = width * 1.3

const DisplayMatches = (props) => {

    console.log(props.navigation.navigate, 'props.navigation in displayMatches')

    const [matchedUsers, setMatchedUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [active, setActive] = useState(0)
    const [modalVisible, setModalVisible] = useState(false)
    const [user, setUser] = useState({})
    const username = props.extraData.email

    const abilityStrings = { 1: 'Beginner', 2: 'Intermediate', 3: 'Advanced', 4: 'Expert' }

    useEffect(() => {
        console.log('username in UseEffect >>', username)
        console.log('props in username', props)
        getUser(username) ///props.username?
            .then(user => {
                setUser(user)
                getUsers(user)
                    .then(fetchedUsers => {
                        console.log(fetchedUsers[0], fetchedUsers.length)
                        if (fetchedUsers.length === 0) setModalVisible(true)
                        setIsLoading(false)
                        setMatchedUsers(fetchedUsers)
                    })
            })
    }, [])

    const changeActive = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide != active) setActive(slide)
    }

    const handleClick = () => {
        const newMatchedUsers = [...matchedUsers]
        newMatchedUsers.splice(active, 1)
        if (newMatchedUsers.length === 0) setModalVisible(true)
        setMatchedUsers(newMatchedUsers)
    }

    return (
        isLoading ? <View>
            <Text>LOADING</Text>
        </View> :
            <View style={style.container}>
                <View style={{ flexDirection: 'row' }}>
                    {/* <TouchableOpacity onPress={() => toggleDrawer()}>
                        <Image
                            source={{ uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png' }}
                            style={{
                                width: 25,
                                height: 25,
                                marginLeft: 5
                            }}
                        />
                    </TouchableOpacity> */}
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert('Modal has been closed.');
                    }}>
                    <View style={style.centeredView}>
                        <View style={style.modalView}>
                            <Text style={style.modalText}>You have no matches!</Text>
                            <TouchableHighlight
                                style={{ ...style.openButton, backgroundColor: '#2196F3' }}
                                onPress={() => {
                                    setModalVisible(!modalVisible);
                                    props.navigation.navigate("Change Preferences")
                                }}>
                                <Text style={style.textStyle}>Amend your preferences!</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                </Modal>
                <ScrollView
                    pagingEnabled
                    horizontal style={style.scroll}
                    onScroll={changeActive}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                    style={style.scroll}
                >
                    {
                        matchedUsers.map((matchedUser, index) => (
                            <View key={index} style={{ flexDirection: 'column' }}>
                                <Text style={{ alignSelf: "center", fontSize: 40 }}>{user.first_name}'s Matches!</Text>
                                <Button
                                    color='#55008c'
                                    title='Remove player'
                                    //id={index}
                                    onPress={handleClick}
                                />
                                <Image
                                    source={{ uri: matchedUser.image_url }}
                                    style={style.image}
                                />
                                <View style={style.userInfo}>
                                    <Text style={{ fontWeight: 'bold', fontSize: width / 20 }}>{matchedUser.first_name}</Text>
                                    <Text>Ability: {abilityStrings[matchedUser.ability]}</Text>
                                    <Text>{matchedUser.playing_hand[0].toUpperCase() + matchedUser.playing_hand.slice(1)}</Text>
                                    <Text>Club: {matchedUser.club_membership || 'None'}</Text>
                                    <Text >{matchedUser.description}</Text>
                                </View>

                                <Button
                                    color='#55008c'
                                    title="Message Player"
                                    onPress={() => props.navigation.navigate("Message Player", { user, matchedUser })}
                                />
                            </View>
                        ))
                    }
                </ScrollView>
                <View style={style.pagination}>
                    {
                        matchedUsers.map((_, i) => (
                            <Text key={i} style={i == active ? style.pagingActiveText : style.pagingText}>⬤</Text>
                        ))
                    }
                </View>
            </View >
    );
};

const style = StyleSheet.create({
    container: { marginTop: 0, width, height },
    scroll: { width, height },
    image: { width, height, resizeMode: 'contain', flex: 1 },
    userInfo: { width, paddingLeft: 5, paddingRight: 5, alignItems: 'center', alignSelf: 'center' },
    pagination: { flexDirection: 'row', position: 'absolute', bottom: -30, alignSelf: 'center' },
    pagingText: { fontSize: (width / 35), color: 'green', margin: 3 },
    pagingActiveText: { fontSize: (width / 35), color: 'black', margin: 3 },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
})

export default DisplayMatches;
