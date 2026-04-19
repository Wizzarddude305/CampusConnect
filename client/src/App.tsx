import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import About from './pages/About'
import Organizations from './pages/Organizations'
import { AuthProvider } from './components/AuthContext';
import AuthGate from './components/AuthGate';
import { ToastContainer } from 'react-toastify';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthGate>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
            <Route path="/about" element={<About />} />
            <Route path="/organizations" element={<Organizations />} />
            <Route path="*" element={<div>Page Not Found</div>} />
          </Routes>
        </AuthGate>
      </Router>

      <ToastContainer aria-label="notifications" />
    </AuthProvider>
  );
}

export default App
