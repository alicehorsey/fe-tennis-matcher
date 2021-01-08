import React, { useState, useEffect } from 'react';
import firebase from '../constants/Firebase';


const DisplayMatches = ({ username }) => {

    const [image, setImage] = useState('')

    useEffect(() => {
        console.log('useEffect!')
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