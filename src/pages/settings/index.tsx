import { Header } from '../../components/Header/index'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

export default function Settings() {
    return (
        <>
            <Head>
                <title>The.Doctors - Configurações</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>Configurações</h1>
                    <div className={styles.boxInfo}>
                        <p>Logo teremos novidades para suas configurações, mas até lá, fique por
                            dentro de todas as ferramentas e funcionalidades que a The.doctors
                            pode oferecer para você!</p>
                        <img alt="banner" src="/banner1.png" />
                    </div>
                    <div className={styles.boxButton}>
                        <Link href="/mycourses">
                            <button className={styles.button}>Acessar Meus Cursos</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}