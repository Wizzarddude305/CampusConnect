import { useState } from "react"
import { useNavigate } from 'react-router-dom';
import '../styles/auth.css';

function SignUpComp1(){
    const [name, setName] = useState("")
    const navigate = useNavigate()

    const updateUserName = async () => {
        const updates = {name: name}
        try{
            const response = await fetch("http://localhost:3001/api/update",{
                method: "POST", 
               headers: {
                  'Content-Type': 'application/json',
                },
              body:JSON.stringify(updates), 
            })
        }catch(err){
            console.error(err)
        }

    }

    const cancelSignUp = async () =>({

    })

    return(
        <div className="auth-container">
            <div className="auth-box">
            <h2>Input your name</h2>
            <input
                type="text" 
                placeholder="Name.."
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={updateUserName}>Submit</button>
            <button onClick={cancelSignUp}>Already have an account?</button>
            </div>
      </div>
    )
}

export default function SingUpProcess(){
    const [stage, setStage] = useState(1)

    return(
        <div>
            {stage == 1 ? (<SignUpComp1></SignUpComp1>) : <div>NO MORE</div>}
        </div>
        
    )
}