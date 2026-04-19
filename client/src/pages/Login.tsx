// Login page - sends credentials to the server and stores the token on success
import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useAuth } from "../components/AuthContext"
import {toast} from "react-toastify"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const {login} = useAuth();

    // Send email and password to the server
    const signIn = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });

        if (response.ok){
          const data = await response.json();

          login(
            data.token,
            data.user.email,
            data.user.name,
            data.user.privilege
          );

          toast.success('Login successful!');
          navigate('/');
        } else {
          const error = await response.json().catch(() => null);
          toast.error(error?.message || 'Login failed');
          console.error('Login failed', error || response.status);
        }

      } catch (err){
        console.error(`FrontEnd: ${err}`);
      }
    };

    return (
        <div className="auth-container">
          <div className="auth-box">
            <div className="auth-brand">CampusConnect</div>
            <h2>Welcome back</h2>
            <input
              type="text"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="auth-btn-primary" onClick={signIn}>Sign In</button>
            <button className="auth-btn-secondary" onClick={() => navigate('/signUp')}>Don't have an account? Sign up</button>
          </div>
      </div>
    );
}
