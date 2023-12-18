import { collection, onSnapshot } from "firebase/firestore";
import { getProdutos } from "../../api/produto"
import { bd } from "../../util/firebase";

export default function ConsultarEstoque(){
    const gerar = (e) => {
        e.preventDefault()

        const estoqueTable = document.getElementById("table")
        estoqueTable.innerHTML = ``
        pegaEstoque((estoque) => {
            estoqueTable.innerHTML = `
                ${estoque.map((produto) => `
                    <tr>
                        <td>${produto.id}</td>
                        <td>${produto.data.nome}</td>
                        <td>${produto.data.quantidade}</td>
                    </tr>
                `).join('')}
            `
        })
    };
         

    return(
        <div>
            <h1>Estoque de produtos</h1>
            <div style={{display: "flex", justifyContent: "flex-start", justifyContent: "space-evenly"}}>
                <h4>Gerar relatório de estoque</h4>
                <button type="button" onClick={gerar} className="btn btn-outline-success">Gerar</button>
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