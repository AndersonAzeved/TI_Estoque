import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth } from "firebase/auth"
import { getFirestore, collection, onSnapshot} from "firebase/firestore"


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_APIKEY,
//   authDomain: process.env.AUTHDOMAIN,
//   databaseURL: process.env.DATABASEURL,
//   projectId: process.env.PROJECTID,
//   storageBucket: process.env.STORAGEBUCKET,
//   messagingSenderId: process.env.MESSAGINGSENDERID,
//   appId: process.env.APPID
// }

const firebaseConfig = {
  apiKey: "AIzaSyA2oXVd371Y2fas-tbiUkupK7Z3OI8OGRI",
  authDomain: "gerenciador-de-compras-cb40a.firebaseapp.com",
  databaseURL: "https://gerenciador-de-compras-cb40a-default-rtdb.firebaseio.com",
  projectId: "gerenciador-de-compras-cb40a",
  storageBucket: "gerenciador-de-compras-cb40a.appspot.com",
  messagingSenderId: "1088755764635",
  appId: "1:1088755764635:web:b5ea0db5a1f21f2488653e"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const bd = getFirestore(app)