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

  // Followers state (CRUD)
  const [followers, setFollowers] = useState([])
  const [isAddingFollower, setIsAddingFollower] = useState(false)
  const [newFollowerName, setNewFollowerName] = useState('')
  const [newFollowerUsername, setNewFollowerUsername] = useState('')
  const [editingFollowerId, setEditingFollowerId] = useState(null)
  const [editFollowerName, setEditFollowerName] = useState('')
  const [editFollowerUsername, setEditFollowerUsername] = useState('')
  const [isSavingFollower, setIsSavingFollower] = useState(false)

  const fetchFollowers = () => {
    axios.get(`${API_BASE_URL}/followers`)
      .then((res) => {
        setFollowers(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => console.error('Error fetching followers:', err))
  }

  useEffect(() => {
    // 1. Fetch main post / profile
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

    // 2. Fetch followers list (Read)
    fetchFollowers()
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

  // --- Followers CRUD Handlers ---

  // CREATE Follower
  const handleAddFollower = async () => {
    if (!newFollowerName.trim()) return
    setIsSavingFollower(true)
    const newId = String(Date.now())
    const newFollower = {
      id: newId,
      name: newFollowerName.trim(),
      username: newFollowerUsername.trim() || newFollowerName.toLowerCase().replace(/[^a-z0-9]/g, '_'),
      subtitle: 'Follows you',
      image: `/profile/profile${(followers.length % 5) + 1}.jpg`,
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/followers/${newId}`, newFollower).catch(async () => {
        return await axios.post(`${API_BASE_URL}/followers`, newFollower)
      })
      setFollowers((prev) => [...prev, res.data || newFollower])
      setNewFollowerName('')
      setNewFollowerUsername('')
      setIsAddingFollower(false)
    } catch (error) {
      console.error('Error adding follower:', error)
      alert('Failed to add follower')
    } finally {
      setIsSavingFollower(false)
    }
  }

  // UPDATE Follower (axios.put)
  const handleUpdateFollower = async (id) => {
    setIsSavingFollower(true)
    const existing = followers.find((f) => f.id === id)
    const updatedFollower = {
      ...existing,
      name: editFollowerName.trim() || existing.name,
      username: editFollowerUsername.trim() || existing.username,
    }

    try {
      const res = await axios.put(`${API_BASE_URL}/followers/${id}`, updatedFollower)
      setFollowers((prev) => prev.map((f) => (f.id === id ? res.data || updatedFollower : f)))
      setEditingFollowerId(null)
    } catch (error) {
      console.error('Error updating follower:', error)
      alert('Failed to update follower')
    } finally {
      setIsSavingFollower(false)
    }
  }

  // DELETE Follower (axios.delete)
  const handleDeleteFollower = async (id) => {
    if (!window.confirm('Are you sure you want to remove this follower?')) return
    try {
      await axios.delete(`${API_BASE_URL}/followers/${id}`)
      setFollowers((prev) => prev.filter((f) => f.id !== id))
    } catch (error) {
      console.error('Error deleting follower:', error)
      alert('Failed to remove follower')
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
            <span><strong>{followers.length}</strong> followers</span>
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

      {/* Followers Section (CRUD) */}
      <div style={{
        maxWidth: '1000px',
        margin: '36px auto 0',
        padding: '24px',
        background: '#fafafa',
        borderRadius: '16px',
        border: '1px solid #eaeaea',
        boxSizing: 'border-box',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '20px',
          borderBottom: '1px solid #eee',
          paddingBottom: '14px',
        }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#111' }}>
              Followers ({followers.length})
            </h3>
            <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#666' }}>
              Follower list connected to db.json via axios
            </p>
          </div>

          <button
            onClick={() => {
              setIsAddingFollower(!isAddingFollower)
              setEditingFollowerId(null)
              setNewFollowerName('')
              setNewFollowerUsername('')
            }}
            style={{
              background: '#0095f6',
              color: '#fff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 14px',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            {isAddingFollower ? '✕ Close' : '+ Add Follower'}
          </button>
        </div>

        {/* Add Follower Form (CREATE) */}
        {isAddingFollower && (
          <div style={{
            background: '#fff',
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div style={{ fontSize: '15px', fontWeight: 600, color: '#111' }}>
              Add New Follower (Create)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <input
                type="text"
                placeholder="Full Name (e.g. Maya Lin)"
                value={newFollowerName}
                onChange={(e) => setNewFollowerName(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              />
              <input
                type="text"
                placeholder="Username (e.g. maya_lin)"
                value={newFollowerUsername}
                onChange={(e) => setNewFollowerUsername(e.target.value)}
                style={{
                  padding: '10px 12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '10px', alignSelf: 'flex-end' }}>
              <button
                onClick={() => setIsAddingFollower(false)}
                style={{
                  background: '#eee',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddFollower}
                disabled={isSavingFollower || !newFollowerName.trim()}
                style={{
                  background: '#000',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '8px 14px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: isSavingFollower ? 'not-allowed' : 'pointer',
                  opacity: isSavingFollower ? 0.6 : 1,
                }}
              >
                {isSavingFollower ? 'Adding...' : 'Add Follower'}
              </button>
            </div>
          </div>
        )}

        {/* Followers List (READ, UPDATE, DELETE) */}
        {followers.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px 0', color: '#888', fontSize: '15px' }}>
            No followers yet. Follow suggested accounts on the home page or click "+ Add Follower" above!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {followers.map((follower) => {
              const isBeingEdited = editingFollowerId === follower.id

              if (isBeingEdited) {
                return (
                  <div
                    key={follower.id}
                    style={{
                      background: '#fff',
                      border: '1px solid #0095f6',
                      borderRadius: '12px',
                      padding: '14px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '10px',
                    }}
                  >
                    <div style={{ fontSize: '14px', fontWeight: 600, color: '#0095f6' }}>
                      Edit Follower (Update via axios.put)
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <input
                        type="text"
                        value={editFollowerName}
                        onChange={(e) => setEditFollowerName(e.target.value)}
                        placeholder="Full Name"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                          fontSize: '14px',
                        }}
                      />
                      <input
                        type="text"
                        value={editFollowerUsername}
                        onChange={(e) => setEditFollowerUsername(e.target.value)}
                        placeholder="Username"
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          border: '1px solid #ccc',
                          fontSize: '14px',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '8px', alignSelf: 'flex-end' }}>
                      <button
                        onClick={() => setEditingFollowerId(null)}
                        style={{
                          background: '#eee',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 12px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleUpdateFollower(follower.id)}
                        disabled={isSavingFollower}
                        style={{
                          background: '#000',
                          color: '#fff',
                          border: 'none',
                          borderRadius: '8px',
                          padding: '6px 14px',
                          fontSize: '13px',
                          fontWeight: 600,
                          cursor: isSavingFollower ? 'not-allowed' : 'pointer',
                        }}
                      >
                        {isSavingFollower ? 'Saving...' : 'Save'}
                      </button>
                    </div>
                  </div>
                )
              }

              return (
                <div
                  key={follower.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '10px 14px',
                    background: '#fff',
                    borderRadius: '12px',
                    border: '1px solid #eee',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img
                      src={toImageUrl(follower.image || '/profile/profile1.jpg')}
                      alt={follower.name}
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        border: '1px solid #ddd',
                      }}
                    />
                    <div>
                      <div style={{ fontSize: '15px', fontWeight: 600, color: '#000' }}>
                        {follower.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#666' }}>
                        @{follower.username || follower.name.toLowerCase().replace(/\s+/g, '_')} • {follower.subtitle || 'Follows you'}
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <button
                      onClick={() => {
                        setEditingFollowerId(follower.id)
                        setEditFollowerName(follower.name)
                        setEditFollowerUsername(follower.username || '')
                      }}
                      style={{
                        background: '#f0f0f0',
                        color: '#111',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFollower(follower.id)}
                      style={{
                        background: '#ffebee',
                        color: '#d32f2f',
                        border: 'none',
                        borderRadius: '8px',
                        padding: '6px 12px',
                        fontSize: '13px',
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile