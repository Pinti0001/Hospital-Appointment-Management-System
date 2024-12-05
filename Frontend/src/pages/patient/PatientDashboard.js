import React from 'react'
import UserNav from '../../components/navbar/UserNav'
import { useSelector } from 'react-redux'
export default function PatientDashboard() {
  const data = useSelector(s => s.userInfo)
  console.log(data);
  return (
    <div>
    <UserNav/>
    PatientDashboard</div>
  )
}
