import { useNavigate } from 'react-router-dom'
import '../styles/LiveStreamCard.css'

function LiveStreamCard({ stream }) {
  const navigate = useNavigate()

  return (
    <div className="live-stream-card" onClick={() => navigate(`/stream/${stream.id}`)}>
      <div className="stream-thumbnail">
        <img src={stream.thumbnail} alt={stream.title} />
        <div className="live-badge">
          <span className="pulse">●</span> LIVE
        </div>
        <div className="viewer-count">👥 {stream.viewerCount} watching</div>
      </div>
      <div className="stream-info">
        <h3>{stream.title}</h3>
        <p className="streamer-name">by {stream.streamer.username}</p>
        <p className="description">{stream.description}</p>
      </div>
    </div>
  )
}

export default LiveStreamCard
