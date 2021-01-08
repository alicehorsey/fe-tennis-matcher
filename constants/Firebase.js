import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCDebnOqYKC8dlLC-Xri4F_xNbKrC_HCx8",
    authDomain: "tennis-match-b1298.firebaseapp.com",
    projectId: "tennis-match-b1298",
    storageBucket: "tennis-match-b1298.appspot.com",
    messagingSenderId: "165258645541",
    appId: "1:165258645541:web:3ab53e49726de05ea76fcc"
}

firebase.initializeApp(firebaseConfig)

export default firebase