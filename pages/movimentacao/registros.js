import { useEffect, useState } from "react"
import { auth, gerarRelatorio, pegaMovimentacoes, pegaUsuario } from "../../util/firebase"
import Spinner from "../components/spinner"
import styles from '../../styles/config.module.css'
import { pegaEstoque } from "../produto/consultar"


export default function Registros(){
    const [autenticado, setAutenticado] = useState('')
    const [movimentacoes, setMovimentacoes] = useState() 
    const [estoque, setEstoque] = useState() 
    const [usuarios, setUsuarios] = useState() 
    const relatorio = []

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }     
    }, [autenticado])


    useEffect(()=>{
        pegaMovimentacoes((movimentacao)=>{
            setMovimentacoes(movimentacao)
        })
    
        pegaUsuario((usuarios)=>{
            setUsuarios(usuarios)
        })
    
        pegaEstoque((estoque)=>{
            setEstoque(estoque)
        })

        usuarios?.map((u)=>{
            movimentacoes?.map((m)=>{
                estoque?.map((e)=>{
                    if(u.id === m.data.cod_usuario){
                        if(e.id === m.data.produto){
                            const dados = {
                            nomeUsuario: u.data.nome,
                            nomeProduto: e.data.nome,
                            movimentacao: m
                            }
                            relatorio.push(dados)
                        }
                    }
                })
            })
        })
    }, [relatorio])
      
    console.log(relatorio)

    const gerar = (e) => {
        e.preventDefault()

        document.getElementById("table").innerHTML = ``
        /*document.getElementById("table").innerHTML = `
                ${movimentacoes?.map((m) =>  ` 
                    <tr>
                        <td>${m.id}</td>
                        <td>${m.data.cod_usuario}</td>
                        <td>${m.data.quantidade}</td>
                        <td>${m.data.data.data}</td>
                    </tr>
                `).join('')}`*/
        
        
    }

    if(auth.currentUser){
        return(
            <div>
                <div>
                    <h1 className={styles.titulo}>Ver movimentações</h1>
                </div><br/>

                <div className="container-fluid" style={{textAlign: "center"}}>
                    <button type="button" onClick={gerarRelatorio} className="btn btn-outline-success btn-sm">Gerar relatório</button>
                </div><br/>
                
                <div className="table-responsive" style={{borderRadius: 15}}>   
                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th scope="col">Codigo</th>
                                <th scope="col">Nome</th>
                                <th scope="col">Quant.</th>
                                <th scope="col">Data</th>
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