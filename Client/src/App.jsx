import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import  Navbar  from './components/Navbar/Navbar';
import Home from "./pages/Home";
import { Login } from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import { StudentProfileDashboard } from './pages/StudentProfilePages/StudentProfileDashboard';
import { StudentProfileSubmitActivity } from './pages/StudentProfilePages/StudentProfileSubmitActivity';
import { StudentProfileSetting } from './pages/StudentProfilePages/StudentProfileSetting';
import { useEffect, useState } from 'react';
import { StudentProfileViewParcipated } from './pages/StudentProfilePages/StudentProfileViewParcipated';
import { StudentProfileInfo } from './pages/StudentProfilePages/StudentProfileInfo';
import { StudentEditProfile } from './pages/StudentProfilePages/StudentEditProfile';

function App() {
  const [profileDashboard, setProfileDashboard] = useState("/student-login")
  const [profileActivity, setProfileActivity] = useState("/student-login")
  const [profileSettings, setProfileSettings] = useState("/student-login")
  const [profileViewParticipated, setprofileViewParticipated] = useState("/student-login")
  const [profileInfo, setprofileInfo] = useState("/student-login")
  const [profileEdit, setprofileEdit] = useState("/student-login")

  useEffect(() => {
    if(localStorage.getItem("access_token")){
      setProfileDashboard("/student-profile")
      setProfileActivity("/student-profile/activity/form")
      setProfileSettings("/student-profile/setting")
      setprofileViewParticipated("/student-profile/view/participated")
      setprofileInfo("/student-profile/info")
      setprofileEdit("/student-profile/info/edit")
    }
  })
  

  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ [<Navbar/>, <Home/>] } />
        <Route path="/student-login" element={ <Login/> } />
        <Route path="/student-signup" element={ <Signup/> } />
        <Route path={profileDashboard} element={ <StudentProfileDashboard/> } />
        <Route path={profileActivity} element={ <StudentProfileSubmitActivity/> } />
        <Route path={profileSettings} element={ <StudentProfileSetting/> } />
        <Route path={profileViewParticipated} element={ <StudentProfileViewParcipated/> } />
        <Route path={profileInfo} element={ <StudentProfileInfo/> } />
        <Route path={profileEdit} element={ <StudentEditProfile/> } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
