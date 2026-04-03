import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';
import { useAuth } from "../components/AuthContext"

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [authentication, setAuth] = useState(true);
    const navigate = useNavigate();

    const {login} = useAuth();

    const signIn = async () => {
        try{
           const user = {
              email: email,
              password: password
            }
            
            //Do authentication in back in here
            const response = await fetch("http://localhost:3001/api/login", {
              method :"POST",
              headers: {
                  'Content-Type': 'application/json',
                },
              body:JSON.stringify(user), 
            })

            if (response.status == 300){
              login(email, name)
              navigate('/');
            }
        } catch (err){
            console.error(`FrontEnd: ${err}`)
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
