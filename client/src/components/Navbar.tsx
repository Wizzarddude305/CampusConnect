import { useNavigate} from 'react-router-dom';
import { useAuth } from './AuthContext';
import { Link } from "react-router-dom";
import "../styles/navbar.css"

function Navbar() {
  const navigate = useNavigate();
  const {user, logout} = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CampusConnect</div>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/organizations">Organizations</Link>
        <Link to="/about">About</Link>
      </div>
      {user ? (
        <div className="logged-in-banner">
          <span>Welcome back {user?.userName || user?.userEmail}!</span>
          <button className="log-button" onClick={() => { logout(); navigate('/'); }}>Log Out</button>
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
