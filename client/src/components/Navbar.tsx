import { useNavigate} from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-brand">CampusConnect</div>

      <div className="navbar-links">
        <a href="#">Home</a>
        <a href="#">Organizations</a>
        <a href="#">About</a>
      </div>

      <button className="login-button" onClick={() => navigate('/login')}>
        Student Login
      </button>
    </nav>
  )
}

export default Navbar