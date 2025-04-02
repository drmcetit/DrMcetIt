import React from 'react'
import { useNavigate } from "react-router-dom";
import { StaffSideBar } from '../../components/StudentProfileComponent/StaffSideBar';

export const StaffProfile = () => {
    const navigate = useNavigate();
    
  return (
    <>
    <div className="d-flex">
      <StaffSideBar/>
      <div className="flex-grow-1 p-4">
        
      </div>
    </div>
    </>
  )
}
