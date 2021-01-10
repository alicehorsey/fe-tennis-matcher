import React, { useState, useEffect } from 'react';
import { Text, View, Image, Button, ScrollView, Dimensions, StyleSheet } from 'react-native';
import firebase from '../constants/Firebase';
import { getUsers } from '../API.js';
const { width } = Dimensions.get("window")
const height = width * 1.3

const DisplayMatches = () => {

    const [matchedUsers, setMatchedUsers] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [active, setActive] = useState(0)
    const [images, setImages] = useState([
        'https://firebasestorage.googleapis.com/v0/b/tennis-match-b1298.appspot.com/o/aliciamolik%40me.com.jpg?alt=media&token=2ee044b6-89a6-4f09-8e0c-724751e7ded7',
        'https://firebasestorage.googleapis.com/v0/b/tennis-match-b1298.appspot.com/o/apero777%40hotmail.co.uk.jpg?alt=media&token=0afd8ac4-3664-4199-b055-5de043a3a2af',
        'https://firebasestorage.googleapis.com/v0/b/tennis-match-b1298.appspot.com/o/aurelie.vedy%40yahoo.co.uk.jpg?alt=media&token=60fc9c2b-6d5d-45e1-9848-8ba0cf46fec2',
    ])
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
            .then(matchingUsers => {
                setIsLoading(false)
                setMatchedUsers(matchingUsers)
            })
    }, [])

    const changeActive = ({ nativeEvent }) => {
        const slide = Math.ceil(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width)
        if (slide != active) setActive(slide)
    }

    return (
        <View style={style.container}>
            <ScrollView
                pagingEnabled
                horizontal style={style.scroll}
                onScroll={changeActive}
                scrollEventThrottle={16}
                showsHorizontalScrollIndicator={false}
                style={style.scroll}
            >
                {
                    images.map((image, index) => (
                        <View key={index} style={{ flexDirection: 'column' }}>
                            <Image
                                source={{ uri: image }}
                                style={style.image}
                            />
                            <Text style={{ alignSelf: 'center' }}>INFO ABOUT USER NUMBER {index + 1}</Text>
                            <Button
                                title='Remove player'
                            />
                        </View>
                    ))
                }
            </ScrollView>
            <View style={style.pagination}>
                {
                    images.map((_, i) => (
                        <Text key={i} style={i == active ? style.pagingActiveText : style.pagingText}>⬤</Text>
                    ))
                }
            </View>
        </View >
    );
};

const style = StyleSheet.create({
    container: { marginTop: 10, width, height },
    scroll: { width, height },
    image: { width, height, resizeMode: 'cover', flex: 1 },
    pagination: { flexDirection: 'row', position: 'absolute', bottom: -30, alignSelf: 'center' },
    pagingText: { fontSize: (width / 20), color: 'green', margin: 3 },
    pagingActiveText: { fontSize: (width / 20), color: 'black', margin: 3 }
})

export default DisplayMatches;