import { Link, useNavigate } from 'react-router-dom'
import '../styles/Navigation.css'

function Navigation({ user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    window.location.href = '/login'
  }

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/feed" className="nav-logo">
          🎬 GrabClips
        </Link>

        <div className="nav-menu">
          <Link to="/feed" className="nav-link">
            🏠 Feed
          </Link>
          <Link to="/live" className="nav-link">
            🔴 Live
          </Link>
          <Link to="/go-live" className="nav-link">
            📹 Go Live
          </Link>
          <Link to="/messages" className="nav-link">
            💬 Messages
          </Link>
          <Link to={`/profile/${user?.id}`} className="nav-link">
            👤 Profile
          </Link>
        </div>

        <button onClick={handleLogout} className="btn-logout">
          Logout
        </button>
      </div>
    </nav>
  )
}

export default Navigation
