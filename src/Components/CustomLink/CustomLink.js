import React, { useState } from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ children, to, ...props }) {
    let resolved = useResolvedPath(to);
    let match = useMatch({ path: resolved.pathname, end: true });



    const [bg, setBg] = useState(false)

    const changeBackground = () => {

        if (window.scrollY >= 80) {
            setBg(true)

        } else {
            setBg(false)

        }
    }

    window.addEventListener('scroll', changeBackground)
  
    return (
      <div>
        <Link className='customLink'
          style= {{ textDecoration: "none", borderBottom:match? bg?"2px solid #80a10a":"2px solid #80a10a":'', color:match? !bg?'#80a10a': "#80a10a":"white",
           fontWeight:'bold' ,}}
          to={to}
          {...props}
        >
          {children}
        </Link>
       
      </div>
    );
  }
export default CustomLink;