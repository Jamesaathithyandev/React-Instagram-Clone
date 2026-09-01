import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './sidebar'
import Feed from './feed'
import Suggestions from './suggestions'
import Profile from './profile'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div className="main">
            <div className="side"><Sidebar /></div>
            <div className="feed"><Feed /></div>
            <div className="sugg"><Suggestions /></div>
          </div>
        }
      />

      <Route
        path="/profile"
        element={<Profile />}
      />
    </Routes>
  )
}

export default App