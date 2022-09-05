import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

export default function MyCourses() {
    return (
        <>
            <Head>
                <title>The.Doctors - Meus Cursos</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Meus Cursos</h1>
                    <div className={styles.boxCard}>
                        <Link href="/classroom">
                            <div className={styles.card}>
                                <img className={styles.imageCard} alt="imagem do curso" src="/imageCurso.jpg" />
                                <div className={styles.descriptionCard}>
                                    <p>DESCRIÇÃO DO CURSO QUE VAI SER OFERECIDO</p>
                                    <div className={styles.course}>
                                        <p>Curso Online</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})