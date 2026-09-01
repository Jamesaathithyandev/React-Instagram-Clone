import React, { useEffect, useState } from 'react'

import likeIcon from './assets/Post-icons/Like.png'
import commentIcon from './assets/Post-icons/Comment.png'
import shareIcon from './assets/Post-icons/Share.png'
import bookmarkIcon from './assets/Post-icons/Bookmark.png'

const API_BASE_URL = 'http://localhost:5000'

const toImageUrl = (path) => {
  if (!path) return ''
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path
  }
  return `${API_BASE_URL}${path}`
}

function Post() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/posts')
      .then((response) => response.json())
      .then((data) => {
        const cleanedPosts = Array.isArray(data) ? data : data.posts || []
        setPosts(cleanedPosts)
      })
      .catch((error) => console.error('Error fetching posts:', error))
  }, [])

  return (
    <div className="posts">
      {posts.length ? (
        posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-header">
              <div className="post-user">
                <img
                  src={toImageUrl(post.user?.profile_pic)}
                  alt={post.user?.username}
                  className="post-avatar"
                />
                <span>{post.user?.username}</span>
              </div>

              <span className="post-time">{post.timestamp}</span>
            </div>

            <img src={toImageUrl(post.image)} alt={post.caption} className="post-image" />

            <div className="post-actions">
              <img src={likeIcon} alt="Like" className="action-icon" />
              <img src={commentIcon} alt="Comment" className="action-icon" />
              <img src={shareIcon} alt="Share" className="action-icon" />
              <img src={bookmarkIcon} alt="Bookmark" className="action-icon bookmark" />
            </div>

            <div className="post-likes">{post.likes} likes</div>

            <div className="post-caption">
              <strong>{post.user?.username}</strong> {post.caption}
            </div>
          </div>
        ))
      ) : (
        <div className="post empty">No posts available</div>
      )}
    </div>
  )
}

export default Post