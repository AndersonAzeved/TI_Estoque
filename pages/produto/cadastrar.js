import { useState } from "react"
import { cadastrarDoc, getProdutos } from "../../api/produto"
import { pegaEstoque } from "./consultar"
import { useRouter } from "next/router"


export default function CadastrarProduto(){
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [qnt, setQnt] = useState('')
    
    const cadastrar = (e) =>{
        document.getElementById("result").innerHTML = ""
        e.preventDefault()

        pegaEstoque((estoque) => {
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
        })
    }

    return(
        <div>
            <title>Produto</title>
            <h1>Cadastrar produto no sistema</h1>
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
                <button type="submit" className="btn btn-outline-success">Cadastrar</button>
                <div id="result"></div>
            </form>
        </div>
    )
}