export default function Login(){
    return(
        <div>
            <h1>Realizar cadastro no sistema</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="inputMatricula" className="form-label">Matrícula</label>
                    <input type="number" className="form-control" id="inputMatricula" aria-describedby="matriculaHelp" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="inputNome" className="form-label">Nome Completo</label>
                    <input type="text" className="form-control" id="inputNome" required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Senha</label>
                    <input type="password" className="form-control" id="exampleInputPassword1" required/>
                </div>
                <div className="form-floating">
                    <select className="form-select" id="floatingSelect" aria-label="Floating label select example" required>
                        <option value="Servidor">Servidor</option>
                        <option value="Bolsista">Bolsista</option>
                    </select>
                    <label htmlFor="floatingSelect">Selecione o tipo do usuário</label>
                </div>
                <div className="form-text">
                    <p>Esqueceu a senha? <a href="./redefine">recupere aqui</a></p>
                </div>
                <button type="submit" className="btn btn-primary">Cadastrar</button>
            </form>
        </div>
    )
}