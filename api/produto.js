import { collection, doc, getDocs, setDoc} from "firebase/firestore";
import {bd} from '../util/firebase'

export async function getProdutos(){
  const userCollection = collection(bd, 'produto')
  const querySnapshot = await getDocs(userCollection)
  const produtos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data:doc.data(),
    }))
  return produtos
}