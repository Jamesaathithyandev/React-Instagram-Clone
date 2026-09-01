import React from 'react'

const suggestions = [
  {
    id: 1,
    name: 'Dark chocolate',
    subtitle: 'Suggested for you',
    image: '/profile/profile1.jpg',
  },
  {
    id: 2,
    name: 'Kaviya Rao',
    subtitle: 'Suggested for you',
    image: '/profile/profile2.jpg',
  },
  {
    id: 3,
    name: 'Kashvi Jain',
    subtitle: 'Suggested for you',
    image: '/profile/profile3.jpg',
  },
  {
    id: 4,
    name: 'Rithika',
    subtitle: 'Suggested for you',
    image: '/profile/profile4.jpg',
  },
  {
    id: 5,
    name: 'NAndhu..',
    subtitle: 'Suggested for you',
    image: '/profile/profile5.jpg',
  },
]

function Suggestions() {
  return (
    <div className="suggestions-box">
      <div className="suggestions-header">
        <h3>Suggested for you</h3>
        <span>See all</span>
      </div>

      {suggestions.map((user) => (
        <div key={user.id} className="suggestion-item">
          <div className="suggestion-user">
            <img src={user.image} alt={user.name} className="suggestion-avatar" />
            <div className="suggestion-text">
              <div className="suggestion-name">{user.name}</div>
              <div className="suggestion-subtitle">{user.subtitle}</div>
            </div>
          </div>

          <button className="follow-btn">Follow</button>
        </div>
      ))}

      <div className="meta-links">
        <span>About</span>
        <span>Help</span>
        <span>Press</span>
        <span>API</span>
        <span>Jobs</span>
        <span>Privacy</span>
        <span>Terms</span>
        <span>Locations</span>
        <span>Language</span>
        <span>Meta Verified</span>
      </div>

      <div className="meta-copy">© 2026 INSTAGRAM FROM META</div>
    </div>
  )
}

export default Suggestions