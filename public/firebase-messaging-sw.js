const { initializeApp } =require("firebase/app");
const { getMessaging } = require("firebase/messaging");
const { onBackgroundMessage } = require("firebase/messaging/sw");

// importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
// importScripts(
//   "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
// );

{/* <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js"></script> */}
{/* <script src="https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"></script> */}


const firebaseConfig = {
    apiKey: "AIzaSyCgoWaYNQ1x6AG3ZMEjm6QCdB4l_z6qwzQ",
    authDomain: "gorental-6e17b.firebaseapp.com",
    projectId: "gorental-6e17b",
    storageBucket: "gorental-6e17b.appspot.com",
    messagingSenderId: "440315835970",
    appId: "1:440315835970:web:45b38d98beebc0f076dfdb"
  };

  const app = initializeApp(firebaseConfig);

  const messaging = getMessaging(app);
  onBackgroundMessage(messaging, (payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    window.self.registration.showNotification(notificationTitle,
      notificationOptions);
  });


