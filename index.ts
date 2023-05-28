import "expo-router/entry";
import { initializeApp } from "firebase/app";

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
// import {...} from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0u8F4wXttc6CETFnG1pKNBzt18W-i05k",
  authDomain: "rpgym-ddbd4.firebaseapp.com",
  projectId: "rpgym-ddbd4",
  storageBucket: "rpgym-ddbd4.appspot.com",
  messagingSenderId: "181083233006",
  appId: "1:181083233006:web:fbd1b0cb441690e7d5b1ff",
  measurementId: "G-YGVTWRTXG6",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
