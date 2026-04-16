const firebaseConfig = {
    apiKey: "AIzaSyAoJi_Fo5_HRVzIR_wu15e9sDvRKVodWnQ",
    authDomain: "first-6d5bb.firebaseapp.com",
    projectId: "first-6d5bb",
    storageBucket: "first-6d5bb.firebasestorage.app",
    messagingSenderId: "490887190180",
    appId: "1:490887190180:web:48e30aa74b5815f392b831",
    measurementId: "G-5RY7RFV4QE"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
console.log("Firebase initialized:", app.name);
// Khai báo Firestore
const db = firebase.firestore()