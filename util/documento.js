import { doc, setDoc, updateDoc} from "firebase/firestore";
import {bd} from './firebase'

export async function cadastrarDoc(colecao, codigo, data){
    await setDoc(doc(bd, colecao, codigo), data)
}

export async function atualizarDoc(colecao, codigo, data){
    await updateDoc(doc(bd, colecao, codigo), data)
}