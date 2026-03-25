import { createContext, useState , useContext} from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

const AuthContext = createContext(false);

export default function Login(){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [authentication, setAuth] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({userEmail: "", userName: ""});
    const navigate = useNavigate();
    const login = () => setLoggedIn(true);
    const logout = () => setLoggedIn(false);
    const signIn = async () => {
        try{
            console.log("User signed in request:", email, " ", password);
            //Do authentication in back in here 
            if (authentication == true){
              console.log("User authenticated successfully");
              setUser({userEmail: email, userName: "John Doe"});
              setLoggedIn(true);
              navigate('/');
            }
   
        } catch (err){
            console.error(err)
        }

    }

    return (
      <AuthContext.Provider value={{ loggedIn,user, login, logout }}>
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
      </AuthContext.Provider>
    );
}

export const useAuth = () => {
    return useContext(AuthContext);
}