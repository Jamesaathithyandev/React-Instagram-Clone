import React from 'react'
import logo from './assets/black instagram logo.png'
import homeIcon from './assets/Home.png'
import reelsIcon from './assets/Reels.png'
import messageIcon from './assets/Message.png'
import searchIcon from './assets/Search.png'
import notificationIcon from './assets/Notification.png'
import createIcon from './assets/Create.png'
import profileIcon from './assets/profile.png'
import menuIcon from './assets/Menu.png'
import moreMetaIcon from './assets/More From Meta.png'

function Sidebar() {
  const handleLogoClick = () => {
    window.location.href = '/'
  }

  return (
    <div className="main-side">
      <div className="top-side">
        <div
          className="logo-button"
          onClick={handleLogoClick}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault()
              handleLogoClick()
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Go to home page"
        >
          <img
            className="side-logo"
            src={logo}
            alt="Instagram logo in black, a stylized camera symbol representing the social media platform"
          />
        </div>

        <div className="itemtop">
          <img src={homeIcon} alt="Home" style={{ width: '24px', height: '24px' }} />
          <span>Home</span>
        </div>

        <div className="itemtop">
          <img src={reelsIcon} alt="Reels" style={{ width: '24px', height: '24px' }} />
          <span>Reels</span>
        </div>

        <div className="itemtop">
          <img src={messageIcon} alt="Messages" style={{ width: '24px', height: '24px' }} />
          <span>Messages</span>
        </div>

        <div className="itemtop">
          <img src={searchIcon} alt="Search" style={{ width: '24px', height: '24px' }} />
          <span>Search</span>
        </div>

        <div className="itemtop">
          <img src={notificationIcon} alt="Notifications" style={{ width: '24px', height: '24px' }} />
          <span>Notifications</span>
        </div>

        <div className="itemtop">
          <img src={createIcon} alt="Create" style={{ width: '24px', height: '24px' }} />
          <span>Create</span>
        </div>

        <div className="itemtop">
          <img src={profileIcon} alt="Profile" style={{ width: '24px', height: '24px' }} />
          <span>Profile</span>
        </div>
      </div>

      <div className="bottom-side">
        <div className="items">
          <img src={menuIcon} alt="More" style={{ width: '28px', height: '35px' }} />
          <span>More</span>
        </div>

        <div className="items">
          <img src={moreMetaIcon} alt="Also From Meta" style={{ width: '24px', height: '24px' }} />
          <span>Also From Meta</span>
        </div>
      </div>
    </div>
  )
}

export default Sidebar