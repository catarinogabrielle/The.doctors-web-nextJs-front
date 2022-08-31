import { Header } from '../../components/Header/index'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { FiSearch } from 'react-icons/fi'

export default function Courses() {
    return (
        <>
            <Head>
                <title>The.Doctors - Cursos</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.boxTitle}>
                        <h1>Novos Cursos</h1>
                        <div className={styles.boxInput}>
                            <input type="text" placeholder="Pesquisar curso" />
                            <button className={styles.buttonSearch} title="pesquisar">
                                <FiSearch className={styles.icon} size={20} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.boxCard}>
                        <Link href="/meetcourse">
                            <div className={styles.card}>
                                <img className={styles.imageCard} alt="imagem do curso" src="/foto.jpg" />
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