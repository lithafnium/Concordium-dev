import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseConfig = firebase.initializeApp({
    apiKey: "AIzaSyBzxItuat3bGZXNeWqMfSKAMeI_pF84bwQ",
    authDomain: "concordium-c49c3.firebaseapp.com",
    databaseURL: "https://concordium-c49c3.firebaseio.com",
    projectId: "concordium-c49c3",
    storageBucket: "concordium-c49c3.appspot.com",
    messagingSenderId: "298501671703",
    appId: "1:298501671703:web:346a53a7ca5cd72c768552",
    measurementId: "G-2LRBERN2SN"
});
  // Initialize Firebase



export {firebaseConfig as firebaseSetup};   // firebase.initializeApp(firebaseConfig);
  // firebase.analytics();

