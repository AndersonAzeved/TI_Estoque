import { useState } from "react"
import { getProdutos } from "../../api/produto"


export default function CadastrarProduto({produtos}){
    const [codigo, setCodigo] = useState('')
    const [nome, setNome] = useState('')
    const [qnt, setQnt] = useState('')
    const [codCadastrado, setCodCad] = useState('')
    
    const cadastrar = (e) =>{
        e.preventDefault()

        produtos.map((p) => {
            if(p.id === codigo){
                setCodCad(true)
            }
        })

        if(codCadastrado){
            document.getElementById('codigoHelp').innerHTML = 'Codigo já cadastrado'
            document.getElementById('qntHelp').innerHTML = ''
        }else{
            document.getElementById('codigoHelp').innerHTML = ''

            if(qnt >= 0){
                document.getElementById('qntHelp').innerHTML = ''
                console.log('salvo')
                //salvar no banco
                
            }else{
                document.getElementById('qntHelp').innerHTML = 'Quantidade deve ser maior ou igual a 0'
            }
        }

        
    }
    return(
        <div>
            <title>Produto</title>
            <h1>Cadastrar produto no sistema</h1>
            <form onSubmit={cadastrar}>
                <div className="mb-3">
                    <label htmlFor="inputCodigo" className="form-label">Codigo</label>
                    <input type="number" className="form-control" id="inputCodigo" aria-describedby="codigoHelp" required onChange={(e) => setCodigo(e.target.value)}/>
                    <div id="codigoHelp" className="form-text"></div>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputNome" className="form-label">Nome do produto</label>
                    <input type="text" className="form-control" id="inputNome" required onChange={(e) => setNome(e.target.value)}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
                    <input type="number" className="form-control" id="inputQuantidade" aria-describedby="qntHelp" required onChange={(e) => setQnt(e.target.value)}/>
                    <div id="qntHelp" className="form-text"></div>
                </div>
                <button type="submit" className="btn btn-outline-success">Cadastrar</button>
            </form>
        </div>
    )
}

export async function getStaticProps(){
    try {
        const produtos = await getProdutos()
        return{
            props: {produtos}
        }
    } catch (error) {
        return{
            props: {}
        }
    }
}