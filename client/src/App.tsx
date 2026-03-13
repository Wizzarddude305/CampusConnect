import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
    </Router>
  )
}

export default App