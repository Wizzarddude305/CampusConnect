import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useAuth } from "../components/AuthContext"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("John Doe")
    const [authentication, setAuth] = useState(true);
    const navigate = useNavigate();

    const {login} = useAuth();


    const signIn = async () => {
        try{
            console.log("User signed in request:", email, " ", password);
            //Do authentication in back in here
            if (authentication == true){
              console.log("User ", name, " authenticated successfully");
              login(email, name)
              navigate('/');
            }
   
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
              placeholder="Email or Username.." 
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
