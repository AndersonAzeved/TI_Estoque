import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../util/firebase"
import Spinner from "../components/spinner"


export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const login = (e) => {
        e.preventDefault()
        
        
        signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            const user = userCredential.user
            console.log('user', user)
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log('dfdfs',errorMessage)
        })
    }

    if(auth.currentUser){
        return(
            <div><Spinner/></div>
        )
    }
    return(
        <div>
            <Form login={login} setEmail={setEmail} setSenha={setSenha}/>
        </div>
    )
}

function Form({login, setEmail, setSenha}){
    return(
        <div>
            <h1>Realize o log in no sistema</h1>
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" required onChange={(e) => setEmail(e.target.value)}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputPassword" required onChange={(e) => setSenha(e.target.value)}/>
                </div>
                <div className="form-text">
                    <p>Esqueceu a senha? <a href="./redefine">recupere aqui</a></p>
                </div>
                <button type="submit" className="btn btn-outline-success">Log in</button>
            </form>
        </div>
    )
}