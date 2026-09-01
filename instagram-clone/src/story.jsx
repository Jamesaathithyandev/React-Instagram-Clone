import React, { useEffect, useState } from 'react'

const API_BASE_URL = 'http://localhost:5000'

const toImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

function Story() {
  const [stories, setStories] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => {
        const users = (Array.isArray(data) ? data : data.posts || []).map((post) => ({
          id: post.user?.id || post.id,
          name: post.user?.username,
          image: post.user?.profile_pic,
        }))

        setStories(users)
      })
      .catch((error) => console.error('Error fetching stories:', error))
  }, [])

  return (
    <div className="story">
      {stories.map((story) => (
        <div key={story.id} className="story-item">
          <div className="story-ring">
            <img src={toImageUrl(story.image)} alt={story.name} className="story-avatar" />
          </div>
          <span className="story-name">{story.name}</span>
        </div>
      ))}
    </div>
  )
}

export default Story