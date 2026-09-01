import React from 'react'
import Sidebar from './sidebar'
import Feed from './feed'
import Suggestions from './suggestions'

function App() {
  return (
    <div className="main">
      <div className="side"><Sidebar /></div>
      <div className="feed"><Feed/></div>
      <div className="sugg"><Suggestions/></div>
    </div>
  )
}

export default App