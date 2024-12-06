import React from 'react'
import HospitalNav from '../../components/navbar/HospitalNav'
import { useSelector } from 'react-redux'
export default function HospitalDashboard() {
  console.log(useSelector((s)=>s.hospitalInfo))
  return (
    <div>
      <HospitalNav/>
      HospitalDashboard</div>
  )
}
