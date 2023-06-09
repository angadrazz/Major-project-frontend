import React, { useEffect, useState } from 'react'
import Layout from '../../Layouts/Layout/Layout'
import "./Dashboard.css"
import Usermenu from "../../Layouts/Usermenu/Usermenu"
import { useAuth } from '../../Context/auth'
import axios from 'axios'

import { toast } from 'react-hot-toast'

function Profile() {

  const [auth,setauth] = useAuth();

  const [firstName,setfirstName] = useState("");
  const [Email,setEmail] = useState("");
  const [password,setpassword] = useState("");
  const [phone,setphone] = useState("");
  const [address,setaddress] = useState("");
  

  useEffect(() => {
    const {firstName,Email,phone,address} = auth?.user;
    setfirstName(firstName);
    setEmail(Email);
    setphone(phone);
    setaddress(address);
  },[auth?.user])


  const handleSubmit = async () => {
    try {

      const {data} =  await axios.put('https://persian-blue-goose-gear.cyclic.app/api/Profile',{
          firstName,
          Email,
          password,
          phone,
          address,
      });
      if (data?.error) {
        toast.error(data?.error);
      } else {
        setauth({ ...auth, user: data?.updatedUser });
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.user = data.updatedUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        toast.success("Profile Updated Successfully");
      }
      
    } catch (error) {
      toast.error("Something went wrong")      
    }

  }




  return (
    <Layout title={'Hidden Brands - Dashboard Profile'}>
    
    <h2 className='user_d_h2'>Dashboard</h2>

    <div className='user_m_main'>

      <div className='user_m_sub'><Usermenu /></div>
      
      <div className='font_user'>
          <h2 className='user_m_sub1'>Profile</h2>
          <div className="profile_form">
              <input className="profile_input" type="text" value={firstName} placeholder="First Name" onChange={(e) => {
                setfirstName(e.target.value)
              }} />
              <input className="profile_input" type="email" value={Email} placeholder="E-mail Address" onChange={(e) => {
                setEmail(e.target.value)
              }} disabled/>
              <input className="profile_input" id="input_passwd" value={password} type="password" placeholder="Password" onChange={(e) => {
                setpassword(e.target.value)
              }} />
              <input className="profile_input" type="number" maxLength="10" value={phone} placeholder="Phone Number" onChange={(e) => {
                setphone(e.target.value)
              }} />
              <input className="profile_input" id="input_add" type="text" value={address} placeholder="Address" onChange={(e) => {
                setaddress(e.target.value)
              }} />
              <button type="submit" className="profile_btn" onClick={() => {handleSubmit()}}>Update profile</button>
            </div>
      </div>

    </div>

    </Layout>
  )
}

export default Profile
