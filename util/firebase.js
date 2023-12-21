import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, collection, onSnapshot} from "firebase/firestore"
import { useState } from "react";
import { pegaEstoque } from "../pages/produto/consultar";


const firebaseConfig = {
  apiKey: "AIzaSyAQwsYBMLLSAyZqLpQTKoZi3P4AJQGxW9o",
  authDomain: "sistema-estoque-2b654.firebaseapp.com",
  projectId: "sistema-estoque-2b654",
  storageBucket: "sistema-estoque-2b654.appspot.com",
  messagingSenderId: "75788160961",
  appId: "1:75788160961:web:8325c929c7ef80bb966940",
  measurementId: "G-F87KKQCP9Q"
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const bd = getFirestore(app)

export const autenticar = () => { 
  const [valor, setValor] = useState('')

  //useEffect(() => {
      onAuthStateChanged(auth, (user) => {
          if(user){
              setValor(true)
          }else{
              setValor(false)
          }
      })//, [auth])
 //})

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

export const pegaContMovimentacao = (callback) => {
  const contArray = []
  const contCollection = collection(bd, 'cont_movimentacao')

  onSnapshot(contCollection, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      const dados = { 
          id: doc.id,
          data: doc.data()}
          contArray.push(dados)
      });
      callback(contArray)
  });
}

export const pegaMovimentacoes = (callback) => {
  const movimentacoes = []
  const moviCollection = collection(bd, 'movimentacao')

  onSnapshot(moviCollection, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
      const dados = { 
          id: doc.id,
          data: doc.data()}
          movimentacoes.push(dados)
      });
      callback(movimentacoes)
  });
}

// export const gerarRelatorio = () => {
//   const relatorio = []
  
//   pegaUsuario((usuarios)=>{
//     pegaMovimentacoes((movimentacoes)=> {
//       pegaEstoque((estoque)=>{
//         usuarios.map((u) => {
//           movimentacoes.map((m) => {
//             estoque.map((e) => {
//               if(u.id === m.data.cod_usuario){
//                 if(e.id === m.data.produto){
//                   const dados = {
//                     nomeUsuario: u.data.nome,
//                     nomeProduto: e.data.nome,
//                     movimentacao: m
//                   }
//                   relatorio.push(dados)
//                 }
//               }
//             })
//           })
//         })
//       })
//     })
//   })
  
// }


// export const gerarRelatorio = () => {
//   const relatorio = [];

//   const callbackUsuario = (usuarios) => {
//     const callbackMovimentacoes = (movimentacoes) => {
//       const callbackEstoque = (estoque) => {
//         usuarios.forEach((u) => {
//           movimentacoes.forEach((m) => {
//             estoque.forEach((e) => {
//               if (u.id === m.data.cod_usuario && e.id === m.data.produto) {
//                 const dados = {
//                   nomeUsuario: u.data.nome,
//                   nomeProduto: e.data.nome,
//                   movimentacao: m,
//                 };
//                 relatorio.push(dados);
//               }
//             });
//           });
//         });

//         callback(relatorio)
//       };

//       pegaEstoque(callbackEstoque);
//     };

//     pegaMovimentacoes(callbackMovimentacoes);
//   };

//   pegaUsuario(callbackUsuario);
// };

export const pegaUsuariosPendente = (callback) => {
  const usuario = []
  const usuarioCollection = collection(bd, 'autorizar')

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