import React from 'react'
import HeroSection from '../../components/home/HeroSection'
import CollabAndSupport from '../../components/home/CollabAndSupport'
import Navbar from '../../components/navbar/Navbar'

export default function Home() {
  return (
    <>
     <Navbar />
      <HeroSection/>
      <CollabAndSupport/>
    </>
  )
}
