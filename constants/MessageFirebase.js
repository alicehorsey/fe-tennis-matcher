import firebase from "./Firebase";

class Fire {

    constructor() {
        this.init();
        // 1.
        this.observeAuth();
    }
    // 2.
    observeAuth = () =>
        firebase.auth().onAuthStateChanged(this.onAuthStateChanged);

    // 3.
    onAuthStateChanged = user => {
        console.log(user)
        if (!user) {
            try {
                console.log("this isn't working")
            } catch ({ message }) {
                alert(message);
            }
        }
    };

    get ref() {
        return firebase.database().ref('messages');
    }
    // 2.
    on = callback =>
        this.ref
            .limitToLast(20)
            .on('child_added', snapshot => callback(this.parse(snapshot)));
    // 3.
    parse = snapshot => {
    }
    // 4.
    off() {
        this.ref.off();
    }





}
Fire.shared = new Fire();
export default Fire;