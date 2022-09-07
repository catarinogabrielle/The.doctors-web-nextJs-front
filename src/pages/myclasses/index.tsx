import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { FiFolderPlus } from "react-icons/fi";

export default function MyClasses() {
    return (
        <>
            <Head>
                <title>The.Doctors - Minhas Aulas</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.contentButton}>
                        <h1>Meus Cursos</h1>
                        <Link href="/classes">
                            <button title='Novo curso' className={styles.buttonCreate}>
                                Novo curso
                                <FiFolderPlus color="#FFFFFF" size={24} className={styles.icon} />
                            </button>
                        </Link>
                    </div>

                    <div className={styles.contentCard}>
                        <div className={styles.card}>
                            <p>Fabrica de Aplicativos - React native</p>
                            <div className={styles.buttonClasses}>
                                <p>Adicionar aulas</p>
                                <FiFolderPlus color="#FFFFFF" size={17} className={styles.iconClasses} />
                            </div>
                        </div>
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