import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';


function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signIn = async () => {
        try{
            console.log("User signed in request:", email, " ", password);
        } catch (err){
            console.error(err)
        }

    }

    return (
        <div className="auth-container">
        <div className="auth-box">
          <h2>Login</h2>
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
          <button onClick={signIn}>Sign In</button>
          <button onClick={() => navigate('/signUp')}>Click here to sign up</button>
        </div>
      </div>
    );
    
}

export default Login;