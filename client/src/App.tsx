// Sets up all the routes for the app
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import { AuthProvider } from './components/AuthContext';
import AuthGate from './components/AuthGate';
import { ToastContainer } from 'react-toastify';
import './App.css'
import OrganizationsPage from './pages/OrganizationsPage';

function App() {
  return (
    // AuthProvider wraps everything so any component can access the logged in user
    <AuthProvider>
      <Router>
        {/* AuthGate waits for the auth check before rendering any page */}
        <AuthGate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/organizations" element={<OrganizationsPage />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </AuthGate>
      </Router>

      {/* Toast notifications rendered here so they show on every page */}
      <ToastContainer aria-label="notifications" />
    </AuthProvider>
  );
}

export default App
