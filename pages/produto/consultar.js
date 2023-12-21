import { collection, onSnapshot } from "firebase/firestore"
import { auth, bd } from "../../util/firebase"
import { useEffect, useState } from "react"
import Spinner from "../components/spinner"
import styles from '../../styles/config.module.css'

export default function ConsultarEstoque(){
    const [estoque, setEstoque] = useState()
    const [busca, setBusca] = useState('')


    useEffect(()=>{
        pegaEstoque((estoque) => {
            setEstoque(estoque)
        })
    },[estoque])
    
    const gerar = (e) => {
        e.preventDefault()

        document.getElementById("table").innerHTML = ``
        document.getElementById("table").innerHTML = `
                ${estoque?.map((produto) => `
                    <tr>
                        <td>${produto.id}</td>
                        <td>${produto.data.nome}</td>
                        <td>${produto.data.quantidade}</td>
                    </tr>
                `).join('')}`
    }
     
    const buscar = (e) => {
        e.preventDefault()
    
        if(busca == ''){
            document.getElementById("helpBusca").innerHTML = 'Busca não pode ser vazia'
        }else{
            const termoBusca = busca.trim()
    
            const produtosEncontrados = buscarProdutos(estoque, termoBusca)
            
            if(produtosEncontrados.length == 0){
                document.getElementById("helpBusca").innerHTML = 'Busca não encontrada'
            }else{
                document.getElementById("table").innerHTML = `
                    ${produtosEncontrados.map((produto) => `
                        <tr>
                            <td>${produto.id}</td>
                            <td>${produto.data.nome}</td>
                            <td>${produto.data.quantidade}</td>
                        </tr>
                    `).join('')}
                `
                document.getElementById("helpBusca").innerHTML = ''
            }
        }
    }

    if(auth.currentUser){
        return(
            <div>
                <div>
                    <div>
                        <h1 className={styles.titulo}>Estoque de produtos</h1>
                    </div><br/>
                    
                    <div>
                        <div className="container-fluid">
                            <form className="d-flex" role="search" style={{gap: 10}}>
                                <input className="form-control form-control-sm" type="search" id="buscaProd" placeholder="Buscar produto pelo nome" aria-label="Search" onChange={(e) => setBusca(e.target.value)}/>
                                <button className="btn btn-outline-success btn-sm" onClick={buscar}>Buscar</button>
                                <button type="button" onClick={gerar} className="btn btn-outline-success btn-sm">Todos</button>
                            </form>
                            <div id="helpBusca"></div>
                        </div><br/>
                    
                        <div className="table-responsive" style={{borderRadius: 15}}>   
                            <table className="table table-striped">
                                <thead className="table-dark">
                                    <tr>
                                        <th scope="col">Codigo</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Quant.</th>
                                    </tr>
                                </thead>
                                <tbody className="table-group-divider" id="table">
                                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

            </div>
        )
    
    }else{
        return(<Spinner/>)
    }
}

export const pegaEstoque = (callback) => {
    const estoque = []
    const produtosCollection = collection(bd, 'produto')

    onSnapshot(produtosCollection, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
        const dados = { 
            id: doc.id,
            data: doc.data()}
        estoque.push(dados)
        });
        callback(estoque)
    });
}

export function buscarProdutos(estoque, busca) {
    const searchText = busca.toLocaleLowerCase();

    if (!estoque || busca === '') {
        return [];
    }

    const produtosEncontrados = estoque.filter((produto) =>
        produto.data.nome.toLocaleLowerCase().includes(searchText)
    );

    return produtosEncontrados;
}