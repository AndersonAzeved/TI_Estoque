import { initializeApp } from "firebase/app"
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
import { getFirestore, collection, onSnapshot} from "firebase/firestore"
import { useState } from "react";
import { pegaEstoque } from "../pages/produto/consultar";


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