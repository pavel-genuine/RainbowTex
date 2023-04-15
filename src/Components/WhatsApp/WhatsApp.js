import React from "react";
import ReactWhatsappButton from "react-whatsapp-button";

function WhatsApp() {
  return (
    <div className="App">
      <ReactWhatsappButton
        countryCode="880"
        phoneNumber="1711813933"
        animated
      />
    </div>
  )
}

export default WhatsApp;




// import React from 'react'
// import { FloatingWhatsApp } from 'react-floating-whatsapp'

// export default function WhatsApp() {

//     return (
//         <FloatingWhatsApp

//             phoneNumber='+880 1911-549968'
//             accountName='Rainbow Tex'
//             // onClick
//             // onSubmit
//             // onClose
//             // onNotification
//             // onLoopDone
//             avatar='https://i.ibb.co/YZmrBZr/rainbowtex-R.png'

//             statusMessage="Typically replies within minutes"

//             placeholder="Type a message.."

//             allowClickAway={true}
//             allowEsc={true}

//             notification={true}
//             notificationDelay={60}
//             notificationLoop={0}
//             notificationSound={false}
//             // notificationSoundSrc={'SoundBeep'}
//             // notificationStyle
//             // notificationClassName="floating-whatsapp-notification"

//             buttonStyle={{background:''}}
//             // buttonClassName="floating-whatsapp-button"

//             // chatboxHeight={320}
//             // chatboxStyle
//             chatboxClassName="floating-whatsapp-chatbox"

//             darkMode={false}
        
//             className="floating-whatsapp"
//         />
//     )
// }
