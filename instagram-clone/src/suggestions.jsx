import React, { useEffect, useState } from 'react'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const toImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

const defaultSuggestions = [
  {
    id: '1',
    name: 'Dark chocolate',
    username: 'dark_chocolate',
    subtitle: 'Suggested for you',
    image: '/profile/profile1.jpg',
  },
  {
    id: '2',
    name: 'Kaviya Rao',
    username: 'kaviya_rao',
    subtitle: 'Suggested for you',
    image: '/profile/profile2.jpg',
  },
  {
    id: '3',
    name: 'Kashvi Jain',
    username: 'kashvi_jain',
    subtitle: 'Suggested for you',
    image: '/profile/profile3.jpg',
  },
  {
    id: '4',
    name: 'Rithika',
    username: 'rithika_07',
    subtitle: 'Suggested for you',
    image: '/profile/profile4.jpg',
  },
  {
    id: '5',
    name: 'NAndhu..',
    username: 'nandhu_star',
    subtitle: 'Suggested for you',
    image: '/profile/profile5.jpg',
  },
]

function Suggestions() {
  const [suggestionsList, setSuggestionsList] = useState(defaultSuggestions)
  const [followersList, setFollowersList] = useState([])
  const [loadingActionId, setLoadingActionId] = useState(null)

  useEffect(() => {
    // Fetch suggestions and existing followers
    Promise.all([
      axios.get(`${API_BASE_URL}/suggestions`).catch(() => ({ data: defaultSuggestions })),
      axios.get(`${API_BASE_URL}/followers`).catch(() => ({ data: [] })),
    ]).then(([suggRes, followRes]) => {
      if (Array.isArray(suggRes.data) && suggRes.data.length > 0) {
        setSuggestionsList(suggRes.data)
      }
      if (Array.isArray(followRes.data)) {
        setFollowersList(followRes.data)
      }
    })
  }, [])

  const handleToggleFollow = async (user) => {
    const userId = String(user.id)
    const existingFollower = followersList.find(
      (f) => String(f.id) === userId || f.name === user.name || (f.username && f.username === user.username)
    )
    const isFollowing = Boolean(existingFollower)
    setLoadingActionId(userId)

    try {
      if (isFollowing && existingFollower) {
        // Unfollow: delete from followers in db.json
        await axios.delete(`${API_BASE_URL}/followers/${existingFollower.id}`)
        setFollowersList((prev) => prev.filter((f) => f.id !== existingFollower.id))
      } else {
        // Follow: use axios.put() to append/upsert follower in db.json
        const followerPayload = {
          id: userId,
          name: user.name,
          username: user.username || user.name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
          subtitle: 'Follows you',
          image: user.image,
        }
        try {
          const res = await axios.put(`${API_BASE_URL}/followers/${userId}`, followerPayload)
          setFollowersList((prev) => [...prev, res.data || followerPayload])
        } catch {
          const res = await axios.post(`${API_BASE_URL}/followers`, followerPayload)
          setFollowersList((prev) => [...prev, res.data || followerPayload])
        }
      }
    } catch (error) {
      console.error('Error updating follow status:', error)
    } finally {
      setLoadingActionId(null)
    }
  }

  return (
    <div className="suggestions-box">
      <div className="suggestions-header">
        <h3>Suggested for you</h3>
        <span>See all</span>
      </div>

      {suggestionsList.map((user) => {
        const userId = String(user.id)
        const isFollowing = followersList.some(
          (f) => String(f.id) === userId || f.name === user.name || (f.username && f.username === user.username)
        )
        const isLoading = loadingActionId === userId

        return (
          <div key={user.id} className="suggestion-item">
            <div className="suggestion-user">
              <img src={toImageUrl(user.image)} alt={user.name} className="suggestion-avatar" />
              <div className="suggestion-text">
                <div className="suggestion-name">{user.name}</div>
                <div className="suggestion-subtitle">{user.subtitle}</div>
              </div>
            </div>

            <button
              onClick={() => handleToggleFollow(user)}
              disabled={isLoading}
              className="follow-btn"
              style={{
                color: isFollowing ? '#737373' : '#1f7af1',
                fontWeight: 600,
                fontSize: '13px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.6 : 1,
              }}
            >
              {isLoading ? '...' : isFollowing ? 'Following' : 'Follow'}
            </button>
          </div>
        )
      })}

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