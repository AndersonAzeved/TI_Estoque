import { useState } from "react"
import { pegaEstoque } from "./consultar"
import { auth } from "../../util/firebase"
import Spinner from "../components/spinner"
import styles from '../../styles/config.module.css'
import { cadastrarDoc } from "../../util/documento"


export default function CadastrarProduto(){
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [qnt, setQnt] = useState('')
    const [estoque, setEstoque] = useState()


    pegaEstoque((estoque) => {
        setEstoque(estoque)
    })
    
    const cadastrar = (e) =>{
        document.getElementById("result").innerHTML = ""
        e.preventDefault()

        const codigoJaCadastrado = estoque.some((p) => p.id === codigo)
    
        if (codigoJaCadastrado) {
            document.getElementById("result").innerHTML = "Código já cadastrado"
        } else if (qnt >= 0) {
            cadastrarDoc('produto', codigo, {nome: nome, quantidade: qnt})
            document.getElementById("result").innerHTML = "Produto cadastrado"
            setCodigo("");
            setNome("");
            setQnt("");
        } else {
            document.getElementById("result").innerHTML = "Quantidade deve ser maior ou igual a 0"
        }
    }

    
    if(auth.currentUser){
        return(
            <div>
                <title>Produto</title>
                <h1 className={styles.titulo}>Cadastrar produto no sistema</h1><br/>
                <form onSubmit={cadastrar}>
                    <div className="mb-3">
                        <label htmlFor="inputCodigo" className="form-label">Codigo</label>
                        <input type="number" className="form-control" id="inputCodigo" required value={codigo} onChange={(e) => setCodigo(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputNome" className="form-label">Nome do produto</label>
                        <input type="text" className="form-control" id="inputNome" required value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
                        <input type="number" className="form-control" id="inputQuantidade" required value={qnt} onChange={(e) => setQnt(+e.target.value)}/>
                    </div>
                    <div id="result"></div>
                    <div className="mb-3" style={{flexDirection: "column", display: "flex"}}>
                        <button type="submit" className="btn btn-outline-success">Cadastrar</button>
                    </div>
                </form>
            </div>
        )
    }else{
        return(<Spinner/>)
    }
}