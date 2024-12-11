import React from 'react'
import HeroSection from '../../components/home/HeroSection'
import CollabAndSupport from '../../components/home/CollabAndSupport'
import Navbar from '../../components/navbar/Navbar'
import OurWork from '../../components/home/OurWork'
import FAQ from '../../components/home/FAQ'

export default function Home() {
  return (
    <>
     {/* <Navbar /> */}
      <HeroSection/>
      <CollabAndSupport/>
      <OurWork/>
      <FAQ/>
    </>
  )
}
