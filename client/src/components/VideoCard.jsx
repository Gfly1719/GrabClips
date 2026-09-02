import { useState } from 'react'
import { likeVideo, commentOnVideo } from '../services/api'
import '../styles/VideoCard.css'

function VideoCard({ video }) {
  const [likes, setLikes] = useState(video.likes?.length || 0)
  const [comments, setComments] = useState(video.comments || [])
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState('')
  const [isLiked, setIsLiked] = useState(false)

  const handleLike = async () => {
    try {
      const response = await likeVideo(video.id)
      setLikes(response.data.likes)
      setIsLiked(!isLiked)
    } catch (err) {
      console.error('Failed to like video:', err)
    }
  }

  const handleComment = async () => {
    if (!commentText.trim()) return

    try {
      await commentOnVideo(video.id, commentText)
      setCommentText('')
      setComments([...comments, { text: commentText, user: { username: 'You' } }])
    } catch (err) {
      console.error('Failed to comment:', err)
    }
  }

  return (
    <div className="video-card">
      <video
        className="video-player"
        src={video.videoUrl}
        controls
        autoPlay
        loop
        muted
      />

      <div className="video-overlay">
        <div className="video-info">
          <div className="user-info">
            <img src={video.creator.profilePicture} alt={video.creator.username} className="avatar" />
            <div>
              <p className="username">@{video.creator.username}</p>
              <p className="caption">{video.title}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="video-actions">
        <button className="action-btn" onClick={handleLike}>
          <span className="icon">❤️</span>
          <span className="count">{likes}</span>
        </button>
        <button className="action-btn" onClick={() => setShowComments(!showComments)}>
          <span className="icon">💬</span>
          <span className="count">{comments.length}</span>
        </button>
        <button className="action-btn">
          <span className="icon">📤</span>
          <span className="count">0</span>
        </button>
      </div>

      {showComments && (
        <div className="comments-section">
          <div className="comments-list">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p><strong>{comment.user.username}:</strong> {comment.text}</p>
              </div>
            ))}
          </div>
          <div className="comment-input">
            <input
              type="text"
              placeholder="Add a comment..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button onClick={handleComment}>Post</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default VideoCard
