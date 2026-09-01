import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:5000'

const toImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

function Profile() {
  const navigate = useNavigate()
  const [postData, setPostData] = useState(null)
  const [profile, setProfile] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState('')
  const [description, setDescription] = useState('This is the Time To Hustle')
  const [userId, setUserId] = useState(null)
  const [profilePic, setProfilePic] = useState('')
  const [profilePicData, setProfilePicData] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    axios.get(`${API_BASE_URL}/posts/1`)
      .then((response) => {
        console.log('Fetched profile:', response.data)
        const post = response.data
        setPostData(post)
        const profileData = post.user || {}
        setProfile(profileData)
        setUserId(profileData.id || 101)
        setUsername(profileData.username || '')
        setProfilePic(profileData.profile_pic || '')
        setDescription(profileData.description || 'This is the Time To Hustle')
      })
      .catch((error) => console.error('Error fetching profile:', error))
  }, [])

  const handleSaveProfile = async () => {
    setIsSaving(true)
    try {
      const activeProfilePic = profilePicData || profilePic
      const updatedUser = {
        ...(postData?.user || {}),
        id: userId || postData?.user?.id || 101,
        username: username,
        profile_pic: activeProfilePic,
        description: description,
      }

      // Preserve all post fields (image, caption, likes, comments, timestamp, etc.)
      const updatedPost = {
        ...postData,
        user: updatedUser,
      }
      
      console.log('Saving post with updated user data:', updatedPost)
      const response = await axios.put(`${API_BASE_URL}/posts/1`, updatedPost)
      console.log('axios PUT response status:', response.status)
      console.log('Response from DB:', response.data)
      
      // Update state with response from database
      setPostData(response.data)
      const savedUser = response.data.user || {}
      setProfile(savedUser)
      setUsername(savedUser.username || '')
      setProfilePic(savedUser.profile_pic || '')
      setDescription(savedUser.description || '')
      setProfilePicData('') // Clear preview after save
      setIsEditing(false)
      alert('Profile saved successfully!')
    } catch (error) {
      console.error('Error saving profile:', error.response?.data || error.message)
      alert('Failed to save profile: ' + (error.response?.data?.message || error.message))
    } finally {
      setIsSaving(false)
    }
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setProfilePicData(event.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  if (!profile) {
    return <div style={{ background: '#fff', minHeight: '100vh', color: '#000', padding: '40px' }}>Loading...</div>
  }

  return (
    <div style={{
      background: '#fff',
      minHeight: '100vh',
      color: '#000',
      fontFamily: 'system-ui, sans-serif',
      padding: '40px 60px',
      boxSizing: 'border-box',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto 24px' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            background: 'transparent',
            border: 'none',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: '#111',
            padding: '6px 0',
          }}
        >
          ← Back to Home
        </button>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        gap: '32px',
      }}>
        <div style={{ position: 'relative' }}>
          <div style={{
            width: '180px',
            height: '180px',
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid #000',
            boxShadow: '0 0 0 2px rgba(0,0,0,0.06)',
          }}>
            <img
              src={profilePicData || toImageUrl(profilePic)}
              alt={profile.username}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '18px' }}>
            <h2 style={{ margin: 0, fontSize: '42px', fontWeight: 700 }}>{username || profile.username}</h2>
          </div>

          <div style={{ display: 'flex', gap: '38px', marginBottom: '18px', fontSize: '18px' }}>
            <span><strong>3</strong> posts</span>
            <span><strong>423</strong> followers</span>
            <span><strong>239</strong> following</span>
          </div>

          <p style={{ margin: 0, fontSize: '20px', lineHeight: 1.5 }}>
            {description}
          </p>

          <p style={{ margin: '10px 0 0', fontSize: '20px', color: '#222' }}>
            @{username || profile.username}
          </p>
        </div>
      </div>

      <div style={{
        maxWidth: '1100px',
        margin: '28px auto 0',
        display: 'flex',
        justifyContent: 'stretch',
      }}>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            style={{
              background: '#f2f2f2',
              color: '#000',
              border: 'none',
              borderRadius: '12px',
              padding: '14px 18px',
              fontSize: '18px',
              fontWeight: 600,
              cursor: 'pointer',
              width: '100%',
              maxWidth: '1000px',
            }}
          >
            Edit profile
          </button>
        ) : (
          <div style={{
            width: '100%',
            maxWidth: '1000px',
            background: '#f7f7f7',
            borderRadius: '16px',
            padding: '20px',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
          }}>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              style={{ display: 'none' }}
              id="photo-input"
            />
            <label htmlFor="photo-input" style={{
              alignSelf: 'flex-start',
              background: '#e9e9e9',
              border: 'none',
              color: '#000',
              borderRadius: '10px',
              padding: '8px 12px',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-block',
            }}>
              Change photo
            </label>

            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                boxSizing: 'border-box',
              }}
            />

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              style={{
                width: '100%',
                padding: '12px 14px',
                fontSize: '16px',
                borderRadius: '10px',
                border: '1px solid #ddd',
                boxSizing: 'border-box',
              }}
            />

            <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-end' }}>
              <button
                onClick={() => {
                  setIsEditing(false)
                  setUsername(profile.username || '')
                  setDescription(profile.description || '')
                  setProfilePicData('')
                }}
                disabled={isSaving}
                style={{
                  background: '#e0e0e0',
                  color: '#000',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                }}
              >
                Cancel
              </button>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '15px',
                  fontWeight: 600,
                  cursor: isSaving ? 'not-allowed' : 'pointer',
                  opacity: isSaving ? 0.6 : 1,
                }}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile