import styles from '../styles/index.module.css'

export default function Index(){
    return(
        <div className={styles.body}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <h1>Bem-vindo ao Sistema de Gestão de Estoque de TI</h1>
                </header>
                <section className={styles.section}>
                    <p>Estamos empolgados em apresentar o nosso projeto de Gestão de Estoque de Tecnologia da Informação, desenvolvido com dedicação e expertise pelos talentosos alunos do Instituto Federal do Rio Grande do Norte - Campus Parelhas.</p>
                    <p>Nossa plataforma foi concebida para simplificar e otimizar o controle de estoque de equipamentos de TI, garantindo uma gestão eficiente e transparente. Com recursos intuitivos, nosso sistema proporciona uma visão abrangente dos ativos, facilitando a tomada de decisões estratégicas.</p>
                    <p>Explore as funcionalidades projetadas com precisão para atender às demandas específicas de gerenciamento de TI.</p>
                    <p>Seja bem-vindo!</p>
                </section>
            </div>
        </div>
    )
}

