

importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCgoWaYNQ1x6AG3ZMEjm6QCdB4l_z6qwzQ",
    authDomain: "gorental-6e17b.firebaseapp.com",
    projectId: "gorental-6e17b",
    storageBucket: "gorental-6e17b.appspot.com",
    messagingSenderId: "440315835970",
    appId: "1:440315835970:web:45b38d98beebc0f076dfdb"
  };

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };
  

  window?.self.registration.showNotification(notificationTitle, notificationOptions);
});


// import { getMessaging } from "firebase/messaging";
// import { onBackgroundMessage } from "firebase/messaging/sw";

// const messaging = getMessaging();
// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   window?.self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });