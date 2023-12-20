import React, { useEffect, useState } from 'react'
import styles from '../../styles/nav.module.css'
import { autenticar, auth, pegaUsuario, sair, verificaTipoUsuario } from '../../util/firebase'

export default function Nav(){
    const autenticado = autenticar()
    const tipoUsuario = verificaTipoUsuario()

    return (
        <>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossOrigin="anonymous"></script>
            <div className={styles.nav}>
                <nav className="navbar">
                    <div className="container-fluid">
                        <p className="navbar-brand">Gerenciamento de Estoque</p>
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="offcanvas offcanvas-end" tabIndex="1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel" style={{width: 300}}>
                        
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">Olá, bem vindo</h5>
                            <button type="button" className="btn-close btn-close-dark" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                         </div>

                        {autenticado === true ? (
                            <div>
                                <div className="offcanvas-body">
                                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                        <li className="nav-item">
                                            <a className="nav-link active" aria-current="page" href="/">Home</a>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Produto</a>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                <li><a className="dropdown-item" href="../produto/cadastrar">Cadastrar</a></li>
                                                <li><a className="dropdown-item" href="../produto/consultar">Ver estoque</a></li>
                                            </ul>
                                        </li>
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            Movimentações
                                            </a>
                                            <ul className="dropdown-menu dropdown-menu-dark">
                                                <li><a className="dropdown-item" href="../movimentacao/entrada">Entrada</a></li>
                                                <li><a className="dropdown-item" href="../movimentacao/saida">Saída</a></li>
                                                <li><a className="dropdown-item" href="../movimentacao/registros">Registros</a></li>
                                            </ul>
                                        </li>

                                        {tipoUsuario === true ? <li className="nav-item">
                                            <a className="nav-link" href="../auth/signup">Cadastrar usuario</a>
                                        </li> : ''}

                                        <li className="nav-item">
                                            <button onClick={sair} className="btn btn-outline-success">Sair</button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        ) : (
                            <div className="offcanvas-body">
                                <ul  className="navbar-nav justify-content-end flex-grow-1 pe-3">
                                    <li className="nav-item">
                                        <a className="nav-link active" aria-current="page" href="/">Home</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" href="../auth/login">Log in</a>
                                    </li>
                                </ul>
                            </div>
                        )}
                        
                        </div>
                    </div>
                </nav>
            </div>
        </>
    )
}