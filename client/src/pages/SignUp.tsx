import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function SignUp(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    const signUp = async () => {
        const newUser = {
          email: email, 
          password: password
        }
        try{

            const response = await fetch("http://localhost:3000/api/signup", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body:JSON.stringify(newUser), 
          })
          const result = await response
        }catch(err){
          //Task: Perhaps we can make the error more visible to the user aka change the page according to it
          console.error(err)
        }
       

        navigate('/login');
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
