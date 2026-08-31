import React, { useEffect, useState } from 'react'

function Story() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => setStories(data))
      .catch((error) => console.error('Story fetch error:', error))
  }, [])

  return (
    <div className="story-section">
      {stories.map((story) => (
        <div key={story.id} className="story-item">
          <div className="story-ring">
            <img src={story.user.profile_pic} alt={story.user.username} className="story-image" />
          </div>
          <span>{story.user.username}</span>
        </div>
      ))}
    </div>
  )
}

export default Story