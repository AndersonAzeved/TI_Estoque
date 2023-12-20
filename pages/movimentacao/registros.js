import { useEffect, useState } from "react"
import { auth } from "../../util/firebase"
import Spinner from "../components/spinner"

export default function Registros(){
    const [autenticado, setAutenticado] = useState('') 

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }     
    }, [autenticado])

    if(auth.currentUser){
        return(
            <div>
                <h1>dfsfd</h1>
            </div>
        )
    }else if(autenticado == ''){
        return(<Spinner/>)
    }else if(!autenticado){
        router.push("/")
    }
}