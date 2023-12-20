import { useEffect, useState } from "react";
import { auth, bd, pegaUsuario, app, sair, verificaTipoUsuário, verificaTipoUsuario, autenticar } from "../../util/firebase";
import { createUserWithEmailAndPassword, getAuth, signInWithCredential, signInWithCustomToken, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import Spinner from "../components/spinner";
import { cadastrarDoc } from "../../api/documento";

export default function Signup(){
    const [usuarios, setUsuarios] = useState([])
    const [matricula, setMatricula] = useState("")
    const [email, setEmail] = useState('')
    const [nome, setNome] = useState('')
    const [tipo, setTipo] = useState('')
    const [senha, setSenha] = useState("")
    const router = useRouter()

    const tipoUsuario = verificaTipoUsuario()
    const [autenticado, setAutenticado] = useState(false) 

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }
    }, [autenticado])
    
    pegaUsuario((usuarios) => {
        setUsuarios(usuarios)
    })
    
    const cadastrar = (e) => {
        e.preventDefault()
        
        const matriculaJaCadastrado = usuarios.some((p) => p.id === matricula)
        const emailJaCadastrado = usuarios.some((p) => p.data.email === email)

        if (matriculaJaCadastrado == false && emailJaCadastrado == false) {
            createUserWithEmailAndPassword(auth, email, senha).then((userCredential) => {
                const user = userCredential.user

                updateProfile(user, {
                    displayName: nome
                }).then(() => {
                }).catch((error) => {})
                
                cadastrarDoc('usuario', matricula, {
                    email: email,
                    nome: nome,
                    tipo: tipo
                })
                document.getElementById("matriculaHelp").innerHTML = ""
                document.getElementById("emailHelp").innerHTML = ""
                document.getElementById('help').innerHTML = 'Usuário Cadastrado'
                setEmail('')
                setMatricula("")
                setNome('')
                setSenha('')
                setTipo('') 
                sair()

            }).catch((error)=>{
                document.getElementById("matriculaHelp").innerHTML = ""
                document.getElementById("emailHelp").innerHTML = ""
                const errorCode = error.code

                if(errorCode == 'auth/missing-password'){
                    document.getElementById('senhaHelp').innerHTML = '*Informe uma senha'
                }else if(errorCode == 'auth/weak-password'){
                    document.getElementById('senhaHelp').innerHTML = '*A senha deve ter mais de seis caracteres'
                }else if(errorCode == 'auth/email-already-in-use'){
                    document.getElementById('emailHelp').innerHTML = '*Email já cadastrado'
                }else{
                    document.getElementById('help').innerHTML = '*A senha'
                }
            })

            sair()

        } else{
            if(matriculaJaCadastrado){
                document.getElementById("matriculaHelp").innerHTML = "Matricula já cadastrada"
                document.getElementById('emailHelp').innerHTML = ''
            }else if(emailJaCadastrado){
                document.getElementById('emailHelp').innerHTML = '*Email já cadastrado'
                document.getElementById("matriculaHelp").innerHTML = ""
            }else{
                document.getElementById('help').innerHTML = '*Verifique as informações'
            }
        } 
    }

    if(auth.currentUser != null && tipoUsuario){
        return(
            <div>
                <h1>Realizar cadastro no sistema</h1>
                <form onSubmit={cadastrar}>
                    <div className="mb-3">
                        <label htmlFor="inputMatricula" className="form-label">Matrícula</label>
                        <input type="number" className="form-control" id="inputMatricula" aria-describedby="matriculaHelp" required value={matricula} onChange={(e) => setMatricula(e.target.value)}/>
                        <div id="matriculaHelp"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputNome" className="form-label">Nome Completo</label>
                        <input type="text" className="form-control" id="inputNome" required value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" required value={email} onChange={(e) => setEmail(e.target.value)} aria-describedby="emailHelp"/>
                        <div id="emailHelp"></div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" required value={senha} onChange={(e) => setSenha(e.target.value)} aria-describedby="senhaHelp"/>
                        <div id="senhaHelp"></div>
                    </div>
                    <div className="form-floating">
                        <select className="form-select" id="floatingSelect" aria-label="Floating label select example" required defaultValue='' onChange={(e) => setTipo(e.target.value)}>
                            <option value='' disabled>Selecione</option>
                            <option value="servidor" key='servidor'>Servidor</option>
                            <option value="bolsista" key='bolsista' >Bolsista</option>
                        </select>
                        <label htmlFor="floatingSelect">Selecione o tipo do usuário</label>
                    </div>
                    <div id="help"></div>
                    <div className="form-text">
                        <p>Esqueceu a senha? <a href="./redefine">recupere aqui</a></p>
                    </div>
                    <button type="submit" className="btn btn-outline-success">Cadastrar</button>
                </form>
            </div>
        )
    }else if(autenticado == ''){
        return(<Spinner/>)
    }else{
        router.push('/');
    }


}