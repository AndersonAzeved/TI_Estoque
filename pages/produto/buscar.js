

export default function BuscarProduto(){
    return(
        <div>
            <h1>Buscar produto pelo nome</h1>
            <div className="container-fluid">
                <form className="d-flex" role="search">
                <input className="form-control me-2" type="search" placeholder="Buscar produto" aria-label="Search"/>
                <button className="btn btn-outline-success" type="submit">Buscar</button>
                </form>
            </div>
        </div>
    )
}