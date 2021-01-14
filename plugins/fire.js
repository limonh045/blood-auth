import firebase from "firebase/app"
import 'firebase/auth'
import "firebase/database";

const settings = {timestampsInSnapshots: true};

var config = {
    apiKey: "AIzaSyDlh13F9YZX7_u9_TvdmYdw6bSuebqjpOo",
    authDomain: "blood-d48ce.firebaseapp.com",
    projectId: "blood-d48ce",
    storageBucket: "blood-d48ce.appspot.com",
    messagingSenderId: "143622742086",
    appId: "1:143622742086:web:f8f4e3b2cba58f60136a47",
    measurementId: "G-CD89DFCVR6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}
// export const db = firebase.database().ref('user')
// export const auth = firebase.auth()

export default firebase