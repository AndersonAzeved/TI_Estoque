import { collection, onSnapshot } from "firebase/firestore";
import { getProdutos } from "../../api/produto"
import { autenticar, auth, bd } from "../../util/firebase";
import { useEffect, useState } from "react";
import Spinner from "../components/spinner";
import { useRouter } from "next/router";

export default function ConsultarEstoque(){
    const [estoque, setEstoque] = useState()
    const [busca, setBusca] = useState('')
    const router = useRouter()
    const [autenticado, setAutenticado] = useState('') 

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }     
    }, [autenticado])

    pegaEstoque((estoque) => {
        setEstoque(estoque)
    })
    
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
                <h1>Estoque de produtos</h1>
                <div style={{display: "flex", justifyContent: "flex-start", justifyContent: "space-evenly"}}>
                    <h4>Gerar relatório de estoque</h4>
                    <button type="button" onClick={gerar} className="btn btn-outline-success">Gerar</button>
                    <div id="helpBusca"></div>
                </div>
    
                <div>
                <h1>Buscar produto pelo nome</h1>
                    <div className="container-fluid">
                        <form className="d-flex" role="search" >
                            <input className="form-control me-2" type="search" placeholder="Buscar produto" aria-label="Search" onChange={(e) => setBusca(e.target.value)}/>
                            <button className="btn btn-outline-success" type="button" onClick={buscar}>Buscar</button>
                        </form>
                    </div>
                </div>
            
                <div className="table-responsive">   
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
        )
    
    }else if(autenticado == ''){
        return(<Spinner/>)
    }else if(!autenticado){
        router.push("/")
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