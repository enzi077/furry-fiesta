import * as firebase from 'firebase'
import 'firebase/auth'
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDwQfHCPIfb6XKTYVMW7j3aU403tqTzvqU",
    authDomain: "kaamdani-india.firebaseapp.com",
    databaseURL: "https://kaamdani-india.firebaseio.com",
    projectId: "kaamdani-india",
    storageBucket: "kaamdani-india.appspot.com",
    messagingSenderId: "371496610936",
    appId: "1:371496610936:web:a72b3863284f40c0f5118d",
    measurementId: "G-99YMJCHJ3X"
  };
  // Initialize Firebase
const firebaseOb=firebase.initializeApp(firebaseConfig);
// export const firebaseDb=fire.database().ref()
// export const auth=fire.auth()

export default firebaseOb