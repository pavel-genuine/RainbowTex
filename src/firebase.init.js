

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCgoWaYNQ1x6AG3ZMEjm6QCdB4l_z6qwzQ",
  authDomain: "gorental-6e17b.firebaseapp.com",
  projectId: "gorental-6e17b",
  storageBucket: "gorental-6e17b.appspot.com",
  messagingSenderId: "440315835970",
  appId: "1:440315835970:web:45b38d98beebc0f076dfdb"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

export const messaging = getMessaging(app); 

// export const getTokenfirebase = () => {
//   return getToken(messaging, { vapidKey: "BBcbCAWfEk24LjPE3kqpFkRdRq257QfHpzFXPmMXV0QaWpDppATQCpeqKLjomdO_HbpYjLgNdQEl_sfatkkz0sc" }).then((currentToken) => {
//   if (currentToken) {
//     console.log('current token for client: ', currentToken);
//     // Track the token -> client mapping, by sending to backend server
//     // show on the UI that permission is secured
//   } else {
//     console.log('No registration token available. Request permission to generate one.');
//     // shows on the UI that permission is required 
//   }
// }).catch((err) => {
//   console.log('An error occurred while retrieving token. ', err);
//   // catch error while creating client token
// });
// }


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload)
      resolve(payload);
    });
  });
 
  // messaging.onBackgroundMessage(function(payload) {
  //   console.log('Received background message ', payload);
  //  // Customize notification here
  //   const notificationTitle = payload.notification.title;
  //   const notificationOptions = {
  //     body: payload.notification.body,
  //   };
  
  //   window.self.registration.showNotification(notificationTitle,
  //     notificationOptions);
  
  // });

export default auth;