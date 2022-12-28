import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Tesseract, { createWorker } from 'tesseract.js';

const DrivingLicience = () => {
    const [value, setValue] = React.useState(0);

    const [source, setSource] = useState();
    const [info, setInfo] = useState('');


    const handleFileChange =async(event) => {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        console.log(url,'url');
        console.log(source,'src');

        const formData = new FormData()
        formData.append("video", file)
      
    };

    Tesseract.recognize(
        source,
        'eng',
        { logger: m => (m) }
      ).then(({ data: { text } }) => {
        console.log(text);
        setInfo(()=>text)
        const name = RegExp('\\b'+ 'Name' +'\\b').test(text)
        // text.split('Name','Date')
        console.log(name,'name');
      })

{/* <Autocomplete
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        options={['a']}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search input"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
          />
        )}
      /> */}

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div style={{width:'50%', margin:'auto'}} >
            {/* <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab icon={<img style={{ width: '50%' }} src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_698,h_465/v1568070443/assets/82/6bf372-6016-492d-b20d-d81878a14752/original/Black.png" alt="" />
                } label="Personal & Family" />
                <Tab icon={<img style={{ width: '50%' }} src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,w_698,h_465/v1568070387/assets/b5/0a5191-836e-42bf-ad5d-6cb3100ec425/original/UberX.png" alt="" />
                } label="Business" />
            </Tabs> */}

            <div>
           
           <div className="VideoInput relative">
               <input
                   id="file-upload"
                   className="VideoInput_input "
                   type="file"
                   onChange={handleFileChange}
               /> input

           
               <div>
 
                   {

                       <div className='absolute md:top-[-30%] top-[0] mb-2'>

                         <img style={{width:'50%'}} src={source} alt="" />
                       </div>
                   }
                   {info}
               </div>
           </div>
         

       </div>
        </div>
    )
}

export default DrivingLicience