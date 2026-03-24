import { useNavigate} from 'react-router-dom';
import { useAuth } from '../pages/Login';
import "../styles/navbar.css"

function Navbar() {
  const navigate = useNavigate();
  const {loggedIn, logout} = useAuth();
  return (
    <nav className="navbar">
      <div className="navbar-brand">CampusConnect</div>
      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Organizations</a>
        <a href="#">About</a>
      </div>
      {loggedIn ? (
        <div>
          <span>Welcome back!</span>
          <button onClick={logout}>Log Out</button>
        </div>
      ) : (
        <button className="login-button" onClick={() => navigate('/login')}>
          Student Login
        </button>
      )}
      
    </nav>
  )
}

export default Navbar