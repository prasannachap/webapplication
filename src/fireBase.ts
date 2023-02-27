import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCqHhq_Eoe-moIKFHp-FCPBY51htJZZ964",
    authDomain: "e-commerce-9e124.firebaseapp.com",
    projectId: "e-commerce-9e124",
    storageBucket: "e-commerce-9e124.appspot.com",
    messagingSenderId: "892398915755",
    appId: "1:892398915755:web:9398bc12626ed27b76e7ee",
    measurementId: "G-GCRP0NK1X4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
// const analytics = getAnalytics(app);