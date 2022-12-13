import { useContext } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { Header } from '../../components/Header'

import { AuthContext } from '../../contexts/AuthContext'

import { FiUser, FiBook, FiFile, FiBox, FiVideo } from 'react-icons/fi'

export default function Dashboard() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Head>
                <title>The.Doctors - Meu Painel</title>
            </Head>

            <Header />

            <div className={styles.containerInfoDashboard}>

                <div className={styles.contentMenu}>
                    {user?.type === 'teacher' &&
                        (
                            <Link href="/myclasses">
                                <button className={styles.boxMenu}>
                                    <FiVideo className={styles.iconMenu} size={22} />
                                    <p>Cursos</p>
                                </button>
                            </Link>
                        )
                    }
                    <Link href="/mycourses">
                        <button className={styles.boxMenu}>
                            <FiUser className={styles.iconMenu} size={22} />
                            <p>Meus Cursos</p>
                        </button>
                    </Link>

                    <Link href="/courses">
                        <button className={styles.boxMenu}>
                            <FiBook className={styles.iconMenu} size={22} />
                            <p>Novos Cursos</p>
                        </button>
                    </Link>

                    <Link href="/materials">
                        <button className={styles.boxMenu}>
                            <FiFile className={styles.iconMenu} size={22} />
                            <p>Materiais</p>
                        </button>
                    </Link>

                    <Link href="/payment">
                        <button className={styles.boxMenu}>
                            <FiBox className={styles.iconMenu} size={22} />
                            <p>Planos</p>
                        </button>
                    </Link>
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