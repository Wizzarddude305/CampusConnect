import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import { AuthProvider } from './components/AuthContext';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App