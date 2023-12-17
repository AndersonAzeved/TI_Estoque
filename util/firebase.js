import { initializeApp } from "firebase/app"
import { getAuth, initializeAuth } from "firebase/auth"
import { getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_APIKEY,
    authDomain: process.env.AUTHDOMAIN,
    projectId: process.env.PROJECTID,
    storageBucket: process.env.STORAGEBUCKET,
    messagingSenderId: process.env.MESSAGINGSENDERID,
    appId: process.env.APPID,
    measurementId: process.env.MEASUREMENTID
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const bd = getFirestore(app)