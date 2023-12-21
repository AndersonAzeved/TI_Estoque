import { useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "../../util/firebase"
import { useRouter } from "next/router"
import Spinner from "../components/spinner"
import styles from '../../styles/config.module.css'

export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()


    const login = (e) => {
        e.preventDefault()
        
        signInWithEmailAndPassword(auth, email, senha).then((userCredential) => {
            const user = userCredential.user
            document.getElementById('passwordHelp').innerHTML = 'Log in com sucesso'
            router.push('/')
        }).catch((error) => {
            const errorCode = error.code
            if(errorCode == 'auth/missing-password'){
              document.getElementById('passwordHelp').innerHTML = '*Informe uma senha'
            }else if(errorCode == 'auth/invalid-credential'){
                document.getElementById('passwordHelp').innerHTML = '*Credenciais inválidos'
            }else{
                document.getElementById('passwordHelp').innerHTML = '*Verifique as informações'
            }
        })
    }

    if(auth.currentUser){
        router.push('/')
    }else if(auth.currentUser == null){
        return(
            <div>
                <Form login={login} setEmail={setEmail} setSenha={setSenha}/>
            </div>
        )
    }else{
        return(<Spinner/>)
    }
}

function Form({login, setEmail, setSenha}){
    return(
        <div>
            <h1 className={styles.titulo}>Realize o log in no sistema</h1><br/>
            <form onSubmit={login}>
                <div className="mb-3">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputPassword" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="inputPassword" aria-describedby="passwordHelp" required onChange={(e) => setSenha(e.target.value)}/>
                    <div id="passwordHelp" className="form-text"></div>
                </div>
                <div className="form-text">
                    <p>Esqueceu a senha? <a href="./redefine">recupere aqui</a></p>
                </div>
                <div className="mb-3" style={{flexDirection: "column", display: "flex"}}>
                    <button type="submit" className="btn btn-outline-success">Log in</button>
                </div>
                
            </form>
        </div>
    )
}