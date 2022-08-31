import { useContext } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { Header } from '../../components/Header'

import { AuthContext } from '../../contexts/AuthContext'

import { FiUser, FiBook, FiFile, FiSettings, FiVideo } from 'react-icons/fi'

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Head>
                <title>The.Doctors - Meu Painel</title>
            </Head>

            <div>
                <Header />

                <div className={styles.containerInfoDashboard}>

                    <div className={styles.contentMenu}>
                        {user?.type === 'teacher' &&
                            (
                                <Link href="/myclasses">
                                    <button className={styles.boxMenu}>
                                        <FiVideo color="#e9e9e9" size={20} />
                                        <p>Minhas Aulas</p>
                                    </button>
                                </Link>
                            )}

                        <Link href="/mycourses">
                            <button className={styles.boxMenu}>
                                <FiUser color="#e9e9e9" size={20} />
                                <p>Meus Cursos</p>
                            </button>
                        </Link>

                        <Link href="/courses">
                            <button className={styles.boxMenu}>
                                <FiBook color="#e9e9e9" size={20} />
                                <p>Novos Cursos</p>
                            </button>
                        </Link>

                        <Link href="/materials">
                            <button className={styles.boxMenu}>
                                <FiFile color="#e9e9e9" size={20} />
                                <p>Materiais</p>
                            </button>
                        </Link>

                        <Link href="/settings">
                            <button className={styles.boxMenu}>
                                <FiSettings color="#e9e9e9" size={20} />
                                <p>Configurações</p>
                            </button>
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