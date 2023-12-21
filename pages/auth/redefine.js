import styles from '../../styles/config.module.css'

export default function Login(){
    return(
        <div className={styles.containerRedefine}>
            <title>Redefinir Senha</title>
            <div>
                <h1 className={styles.titulo}>Redefinir senha</h1><br/>
                <form>
                    <div className="mb-3">
                        <label htmlFor="inputEmail" className="form-label">Email</label>
                        <input type="email" className="form-control" id="inputEmail" aria-describedby="emailHelp" required/>
                        <div id="emailHelp" className="form-text"></div>
                    </div>
                    <div className="mb-3" style={{flexDirection: "column", display: "flex"}}>
                        <button type="submit" className="btn btn-outline-success">Enviar</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )
}