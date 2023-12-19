import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, collection, onSnapshot, query, where, getDocs} from "firebase/firestore"
import { useEffect, useState } from "react";


const firebaseConfig = {
  apiKey: "AIzaSyA2oXVd371Y2fas-tbiUkupK7Z3OI8OGRI",
  authDomain: "gerenciador-de-compras-cb40a.firebaseapp.com",
  databaseURL: "https://gerenciador-de-compras-cb40a-default-rtdb.firebaseio.com",
  projectId: "gerenciador-de-compras-cb40a",
  storageBucket: "gerenciador-de-compras-cb40a.appspot.com",
  messagingSenderId: "1088755764635",
  appId: "1:1088755764635:web:b5ea0db5a1f21f2488653e"
};

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const bd = getFirestore(app)

export const autenticar = () => { 
  const [valor, setValor] = useState('')

  useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if(user){
              setValor(true)
          }else{
              setValor(false)
          }
      }, [auth])
  })

  return valor
}

export const pegaUsuario = (callback) => {
  const usuario = []
  const usuarioCollection = collection(bd, 'usuario')

  onSnapshot(usuarioCollection, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      const dados = { 
          id: doc.id,
          data: doc.data()}
          usuario.push(dados)
      });
      callback(usuario)
  });
}


export const sair = () => {
  signOut(auth).then(() => {
  }).catch((error) => {
  })
}

export function verificaTipoUsuario(){
  const [tipoUsuario, setTipoUsuario] = useState([])

  pegaUsuario((usuarios) => usuarios.map((u) => {
      if(u.data.email === auth.currentUser?.email && u.data.tipo === "servidor"){
          setTipoUsuario(true)
      }
  }))
  return tipoUsuario
}