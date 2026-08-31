import React from 'react'
import Sidebar from './sidebar'
import Story from './story'
import posts from './posts'
import suggestions from './suggestions'

function App() {
  return (
    <div className="main">
      <div className="side"><Sidebar /></div>
      <div className="story"><Story/></div>
      <div className="post"><posts/></div>
      <div className="sugg"><suggestions/></div>
    </div>
  )
}

export default App