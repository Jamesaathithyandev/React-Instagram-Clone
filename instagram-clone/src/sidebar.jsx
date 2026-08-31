import React from 'react'
import logo from './assets/black instagram logo.png'

function Sidebar() {
  return (
    <div>
      <div>
        <img className="side-logo"
          src={logo}
          alt="Instagram logo in black, a stylized camera symbol representing the social media platform"
        />
      </div>
      <div>Home</div>
      <div>Reels</div>
      <div>Messages</div>
      <div>Search</div>
      <div>Notifications</div>
      <div>Create</div>
      <div>Profile</div>
      <div>More</div>
      <div>Also From Meta</div>
    </div>
  )
}

export default Sidebar