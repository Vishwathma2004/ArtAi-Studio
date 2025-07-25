import React from 'react'
import Header from '../src/components/Header'
import Steps from '../src/components/Steps'
import Description from '../src/components/Description'
import Testimonials from '../src/components/Testimonials'
import GenerateBtn from '../src/components/GenerateBtn'
import Footer from '../src/components/Footer'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <GenerateBtn/>
        
    </div>
  )
}

export default Home
