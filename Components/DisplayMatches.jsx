import React, { useState, useEffect } from 'react';
import { Text, View, Image } from 'react-native';
import firebase from '../constants/Firebase';
import {getUsers} from '../API.js'


const DisplayMatches = () => {

    const [matchingUsers, setMatchingUsers] = useState([])
    const [image, setImage] = useState([])
    const [user, setUser] = useState({
        "user_id": "1",
        "username": "martina.hingis@yahoo.co.uk",
        "first_name": "Martina",
        "last_name": "Hingis",
        "latitude": "53.796305",
        "longitude": "-1.564126",
        "date_of_birth": "19800930",
        "gender": "f",
        "ability": "1",
        "playing_hand": "right-handed",
        "club_membership": "Kirkstall Abbey Tennis Club",
        "weekday_daytime": "TRUE",
        "weekday_evening": "FALSE",
        "weekends": "FALSE",
        "description": "Tennis is mostly mental. Of course you must have a lot of physical skill but you can't play tennis well and not be a good thinker. You win or lose the match before you even go out there. Venus Williams",
        "distance": "10",
        "min_ability": "1",
        "max_ability": "3",
        "hand_preference": "",
        "min_age": "18",
        "max_age": "100",
        "gender_preference": ""
    })

    useEffect(() => {
        getUsers(user)



        const ref = firebase
            .storage()
            .ref()
            .child(user.username + ".jpg");
        ref.getDownloadURL().then(url => {
            console.log(url)
            setImage(url)
        })
    }, [])

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Hello</Text>
            <Image source={image}/>
        </View>
    );
};

export default DisplayMatches;