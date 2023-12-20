import { useEffect, useState } from "react"
import { buscarProdutos, pegaEstoque } from "../produto/consultar"
import { Timestamp, doc, onSnapshot, setDoc } from "firebase/firestore"
import { auth, bd, pegaContMovimentacao, pegaUsuario } from "../../util/firebase"
import { atualizarDoc, cadastrarDoc } from "../../api/documento"
import Spinner from "../components/spinner"
import styles from '../../styles/config.module.css'

export default function Movimentacao(){
    const [estoque, setEstoque] = useState()
    const [busca, setBusca] = useState('')
    const [entrada, setEntrada] = useState('')
    const [cont, setCont] = useState([])
    const [produtosEncontrados, setEncontrados] = useState()
    const [nomeEntrada, setNomeEntrada] = useState('')
    const [qntEntrada, setQntEntrada] = useState('')
    const [data, setData] = useState('')
    const [hora, setHora] = useState('')
    const [usuario, setUsuario] = useState('')
    const [qnt, setQnt] = useState('')
    const [tipo, setTipo] = useState('')
    const [autenticado, setAutenticado] = useState('') 

    useEffect(()=>{
        if(auth.currentUser != null){
            setAutenticado(true)
        }     
    }, [autenticado])
    
    
    pegaContMovimentacao((contArray)=>{
        setCont(contArray[0]?.data.cont)
    })
    
    useEffect(()=>{
        pegaEstoque((estoque) => {
            setEstoque(estoque)
        })
    },[estoque])

    useEffect(()=>{
        pegaUsuario((usuarios)=>{
            usuarios.map((u)=> {
                if(u.data.email === auth.currentUser.email){
                    setUsuario(u.id)
                }
            })
        })
    },[usuario])
    

    const buscar = (e) => {
        e.preventDefault()
    
        if(busca == ''){
            document.getElementById("helpBusca").innerHTML = 'Busca não pode ser vazia'
        }else{
            const termoBusca = busca.trim()
    
            setEncontrados(buscarProdutos(estoque, termoBusca))
            
            if(produtosEncontrados?.length == 0){
                document.getElementById("helpBusca").innerHTML = 'Busca não encontrada'
            }
        }
    } 
    
    useEffect(()=>{
        produtosEncontrados?.map((p) => {
            if(p.id === entrada){
                setNomeEntrada(p.data.nome)
                setQntEntrada(p.data.quantidade)
            }
        })
    },[entrada])

    const limpar = () => {
        setBusca('')
        setTipo('')
        setEntrada('')
        setData('')
        setHora('')
        setQnt('')
    }
    
    const registrarEntrada = (e) => {
        
        e.preventDefault()

        if(tipo == 'entrada'){
            if(entrada){
                if(qnt > 0){
                    atualizarDoc('cont_movimentacao', 'cont',{cont: (cont+1)})
                    cadastrarDoc('movimentacao', cont.toString(), {
                        cod_usuario: usuario,
                        data: Timestamp.fromDate(dataEHora),
                        produto: entrada,
                        quantidade: qnt,
                        tipo: tipo
                    })
                    atualizarDoc('produto', entrada, {quantidade: qntEntrada+qnt})
                    document.getElementById('help').innerHTML = `Movimentação registrada`
                    limpar()
                }else{
                    document.getElementById('qntHelp').innerHTML = `*Quantidade deve ser maior que 0`
                }
            }else{
                document.getElementById('help').innerHTML = `*Selecione um produto`
            }
        }else{
            if(entrada){
                if(qnt <= qntEntrada){
                    atualizarDoc('cont_movimentacao', 'cont',{cont: (cont+1)})
                    cadastrarDoc('movimentacao', cont.toString(), {
                        cod_usuario: usuario,
                        data: Timestamp.fromDate(dataEHora),
                        produto: entrada,
                        quantidade: qnt,
                        tipo: tipo
                    })
                    atualizarDoc('produto', entrada, {quantidade: qntEntrada-qnt})
                    document.getElementById('help').innerHTML = `Movimentação registrada`
                    limpar()
                }else{
                    document.getElementById('qntHelp').innerHTML = `*Quantidade deve ser maior ou igual a do estoque: ${qntEntrada}`
                }
            }else{
                document.getElementById('help').innerHTML = `*Selecione um produto`
            }
        }
    }

    const dataAtual = new Date();
    const ano = dataAtual.getFullYear();
    const mes = dataAtual.getMonth() + 1; 
    const dia = dataAtual.getDate();
    const dataAtualFormatada = `${ano}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`
    const dataEHora = new Date(`${data}T${hora}`)

    if(auth.currentUser){
        return(
            <div>
                <h1 className={styles.titulo}>Registrar movimentação de produto</h1><br/>
                <div>
                    <div className="container-fluid" style={{marginBottom: 10}}>
                        <label htmlFor="inputBusca" className="form-label">Pesquise o produto</label>
                        <form className="d-flex" role="search" >
                            <input className="form-control me-2" id="inputBusca" value={busca} type="search" placeholder="Buscar produto" aria-label="Search" onChange={(e) => setBusca(e.target.value)}/>
                            <button className="btn btn-outline-success" onClick={buscar}>Buscar</button>
                        </form>
                        <div id="helpBusca"></div>
                    </div>
                    <div className="container-fluid" style={{marginBottom: 10}}>
                        <label htmlFor="floatingSelect" className="form-label">Selecione o produto</label>
                        <select className="form-control col-md-6" id="floatingSelect" aria-label="Floating label select example" required value={entrada} onChange={(e) => setEntrada(e.target.value)}>
                            <option value='' disabled >Selecione</option>
                            {produtosEncontrados?.map((p) => <option key={p.id} value={p.id}>{p.id} - {p.data.nome.toUpperCase()}, {p.data.quantidade} quantidades</option>)}
                        </select>
                        <label className="form-label">Produto selecionado {nomeEntrada.toUpperCase()}</label>
                    </div>
                </div>
    
                <div className="container-fluid" style={{marginBottom: 10}}>
                    <select className="form-select" id="tipoSelect" aria-label="Floating label select example" required value={tipo} onChange={(e) => setTipo(e.target.value)}>
                        <option value='' disabled>Selecione</option>
                        <option value="entrada" key='servidor'>Entrada</option>
                        <option value="saida" key='bolsista' >Saída</option>
                    </select>
                    <label htmlFor="floatingSelect">Selecione o tipo de movimentação</label>
                </div>
    
                <form className="container-fluid" onSubmit={registrarEntrada} style={{marginBottom: 10}}>
                    <div className="mb-3" style={{marginBottom: 10}}>
                        <label htmlFor="inputQuantidade" className="form-label">Quantidade</label>
                        <input type="number" className="form-control" id="inputQuantidade" required value={qnt} onChange={(e) => setQnt(+e.target.value)}/>
                        <div id="qntHelp"></div>
                    </div>
    
                    <div className="mb-3" style={{marginBottom: 10}}>
                        <label htmlFor="inputData" className="form-label">Data</label>
                        <input type="date" className="form-control" id="inputData" value={data} onChange={(e) => setData(e.target.value)} required max={dataAtualFormatada}/>
                    </div>
    
                    <div className="mb-3" style={{marginBottom: 10}}>
                        <label htmlFor="inputHora" className="form-label">Hora</label>
                        <input className="form-control" id="inputHora" type="time" value={hora} onChange={(e) => setHora(e.target.value)} required/>
                    </div>
                    
                    <div id="help"></div><br/>
                    <div className="mb-3" style={{flexDirection: "column", display: "flex"}}>
                        <button className="btn btn-outline-success">Registrar</button>
                    </div>
                </form>
            </div>
        )
    }else if(autenticado == ''){
        return(<Spinner/>)
    }else if(!autenticado){
        router.push("/")
    }

}