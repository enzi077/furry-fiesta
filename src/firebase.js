import * as firebase from 'firebase'
import 'firebase/auth'
// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyBIQvNooAdiuAxZi0kSv8ibDXiRV3ccXQ4",
    authDomain: "labourer-migrant.firebaseapp.com",
    databaseURL: "https://labourer-migrant.firebaseio.com",
    projectId: "labourer-migrant",
    storageBucket: "labourer-migrant.appspot.com",
    messagingSenderId: "718432872945",
    appId: "1:718432872945:web:76c5c2659c4f3f06e27c50"
  };
  // Initialize Firebase
const firebaseOb=firebase.initializeApp(firebaseConfig);
// export const firebaseDb=fire.database().ref()
// export const auth=fire.auth()

export default firebaseOb