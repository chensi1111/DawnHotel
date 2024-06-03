import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDKZxHx3s9A8Dfg2gg4WtY2br_07_jUOO8",
    authDomain: "dawnhotel-a808c.firebaseapp.com",
    projectId: "dawnhotel-a808c",
    storageBucket: "dawnhotel-a808c.appspot.com",
    messagingSenderId: "898506370129",
    appId: "1:898506370129:web:ff53dbb228345831c9dc70",
    measurementId: "G-N3EH08SDYZ"
};

export const setupFirebase = initializeApp(firebaseConfig);
export const db = getFirestore(setupFirebase);