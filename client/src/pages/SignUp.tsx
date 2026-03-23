import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function SignUp(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signUp = async () => {
        console.log("User signed up request:", email, " ", password);
        navigate('/');
      };

    return (
        <div className="auth-container">
        <div className="auth-box">
          <h2>Sign Up</h2>
          <input
            type="text" 
            placeholder="Email.."
            onChange={(e) => setEmail(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password.." 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button onClick={signUp}>Create Account</button>
          <button onClick={() => navigate('/login')}>Already have an account?</button>
        </div>
      </div>
    );
}

export default SignUp;