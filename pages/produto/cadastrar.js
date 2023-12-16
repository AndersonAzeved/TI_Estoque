export default function CadastrarProduto(){
    return(
        <div>
            <h1>Cadastrar produto no sistema</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputCodigo" className="form-label">Codigo</label>
                    <input type="number" className="form-control" id="inputCodigo" aria-describedby="codigoHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputNome" className="form-label">Nome do produto</label>
                    <input type="text" className="form-control" id="inputNome" required/>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    )
}