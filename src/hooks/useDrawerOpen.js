import React from 'react'
import { accessTokenPartner } from '../Components/Authentication/AuthHome';

const useDrawerOpen = () => {
    const [open, setOpen] = React.useState(false);

console.log(open,'open');
    const handleOpenDrawer=()=>{
       setOpen(()=>true)
    }

  return {handleOpenDrawer,open,setOpen}
}

export default useDrawerOpen