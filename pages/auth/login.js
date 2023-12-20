import { useEffect, useState } from "react"
import { signInWithEmailAndPassword } from "firebase/auth"
import { autenticar, auth, sair } from "../../util/firebase"
import { useRouter } from "next/router"
import Spinner from "../components/spinner"


export default function Login(){
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const router = useRouter()
    const [autenticado, setAutenticado] = useState(false) 

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }

        if(autenticado){
            router.push('/')
        }
        
    }, [autenticado])

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

    if(auth.currentUser == null){
        return(
            <div>
                <Form login={login} setEmail={setEmail} setSenha={setSenha}/>
            </div>
        )
        
    }else if(autenticado){
        router.push('/')
    }else{
        return(<Spinner/>)
    }
}

function Form({login, setEmail, setSenha}){
    return(
        <div>
            <h1>Realize o log in no sistema</h1>
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
                <button type="submit" className="btn btn-outline-success">Log in</button>
            </form>
        </div>
    )
}