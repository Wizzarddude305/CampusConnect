import { useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import "../styles/navbar.css"

function Navbar() {
  const navigate = useNavigate();
  const {user, logout} = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CampusConnect</div>
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Organizations</a>
        <a href="#">About</a>
      </div>
      {user ? (
        <div className="logged-in-banner">
          <span>Welcome back {user.userName}!</span>
          <button className="log-button" onClick={logout}>Log Out</button>
        </div>
      ) : (
        <button className="log-button" onClick={() => navigate('/login')}>
          Student Login
        </button>
      )}
      
    </nav>
  )
}

export default Navbar