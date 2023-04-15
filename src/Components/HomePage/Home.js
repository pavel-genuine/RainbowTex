import React, { useEffect } from 'react'
import HomePage from './HomePage'
import FeaturedBrands from '../FeaturedBrands/FeaturedBrands'
import Global from '../Global/Global'
import WhatsApp from '../WhatsApp/WhatsApp'
import MissionVision from '../MissionVision/MissionVision'
import Footer from '../Footer/Footer'
import Commitments from '../Commitments/Commitments'
import Passion from '../Passion/Passion'

const Home = () => {

    useEffect(()=>{
        window.scrollTo(0, 0)
    },[])

    return (
        <div>
           
            <HomePage></HomePage>
            <Passion></Passion>
            <MissionVision></MissionVision>
            <Global></Global>
            <FeaturedBrands></FeaturedBrands>
            <Commitments></Commitments>
            
            
            
        </div>
    )
}

export default Home