import React, { useState, useEffect } from 'react';
import firebase from '../constants/Firebase';


const DisplayMatches = (props) => {

    console.log(props.route.params.user, "display matches screen")

    const [matchingUsers, setMatchingUsers] = useState([])
    const [image, setImage] = useState([])

    useEffect(() => {
        getMatchingUsers(user)



        const ref = firebase
            .storage()
            .ref()
            .child(username);
        ref.getDownloadURL().then(url => {
            console.log(url)
            setImage(url)
        })
    }, [])

    return (
        <div>

        </div>
    );
};

export default DisplayMatches;