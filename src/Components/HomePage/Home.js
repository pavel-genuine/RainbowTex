import React, { useEffect } from 'react'
import HomePage from './HomePage'
import FeaturedBrands from '../FeaturedBrands/FeaturedBrands'
import Global from '../Global/Global'
import WhatsApp from '../WhatsApp/WhatsApp'
import MissionVision from '../MissionVision/MissionVision'
import Footer from '../Footer/Footer'
import Commitments from '../Commitments/Commitments'
import Passion from '../Passion/Passion'
import { useState } from 'react'
import Tiles from '../Tiles/Tiles'

const Home = ({setIsHome}) => {




    useEffect(()=>{


        window.scrollTo(0, 0)
    },[])


    return (
        <div>
          
            <HomePage  setIsHome={setIsHome}></HomePage>
            <div id='section'>
            <Tiles setIsHome={setIsHome}></Tiles>
            </div>
            <Passion setIsHome={setIsHome}></Passion>

         
            <MissionVision></MissionVision>
            <Global></Global>
          
            <FeaturedBrands></FeaturedBrands>
            <Commitments></Commitments>
            
            
            
        </div>
    )
}

export default Home