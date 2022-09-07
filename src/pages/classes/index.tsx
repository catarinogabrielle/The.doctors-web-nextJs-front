import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'

export default function Classes() {
    return (
        <>
            <Head>
                <title>The.Doctors - Aulas</title>
            </Head>

            <Header />
            <div className={styles.container}>
                <main className={styles.content}>
                    <h1>Novo curso</h1>
                    <form className={styles.form}>
                        <input
                            type="text"
                            placeholder="Digite o titulo do curso"
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Descreva sobre o curso..."
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Tempo de duração do curso"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Nome do professor"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Função do professor"
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Descrição sobre o professor..."
                            className={styles.input}
                        />
                        <div className={styles.buttonAdd}>
                            <p>Criar Curso</p>
                        </div>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})