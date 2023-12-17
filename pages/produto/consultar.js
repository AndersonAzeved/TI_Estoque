import { getProdutos } from "../../api/produto"

export default function ConsultarEstoque(props){
    return(
        <div>
            <h1>Estoque de produtos</h1>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">Codigo</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Quant.</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {props.produtos?.map((p) =>
                            <tr key={p.id}>
                                <th scope="row">{p.id}</th>
                                <td>{p.data.nome}</td>
                                <td >{p.data.quantidade}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export async function getStaticProps(){
    try {
        const produtos = await getProdutos()
        return{
            props: {produtos},
            revalidate: false,
        }
    } catch (error) {
        return{
            props: {},
            revalidate: false,
        }
    }
}