import React from 'react'
import Sidebar from './sidebar'

function App() {
  return (
    <div className="main">
      <div className="side"><Sidebar/></div>
      <div className="post">posts</div>
      <div className="sugg">suggestions</div>
    </div>
  )
}

export default App