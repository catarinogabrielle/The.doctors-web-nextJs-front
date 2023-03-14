import { useContext } from 'react'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import { ThreeDots } from 'react-loader-spinner'

import { Header } from '../../components/Header'
import { AuthContext } from '../../contexts/AuthContext'

import { FiUser, FiBook, FiFile, FiBox, FiVideo } from 'react-icons/fi'
import { AiOutlineInfoCircle } from 'react-icons/ai'

export default function Home() {
    const { user } = useContext(AuthContext)

    return (
        <>
            <Head>
                <title>The.Doctors</title>
            </Head>

            <Header />

            <div className={styles.containerInfoHome}>
                {user ? (
                    <div className={styles.contentMenu}>
                        {user?.type === 'teacher' &&
                            (
                                <Link href="/myclasses">
                                    <button className={styles.boxMenu}>
                                        <FiVideo className={styles.iconMenu} size={22} />
                                        <p>Gerenciar Cursos</p>
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
                        {/** 
                        <Link href="/payment">
                            <button className={styles.boxMenu}>
                                <FiBox className={styles.iconMenu} size={22} />
                                <p>Planos</p>
                            </button>
                        </Link>
                        */}
                        <a href="https://thedoctorsagencia.com.br/" target="_blank" rel="noopener noreferrer" className={styles.boxMenu}>
                            <AiOutlineInfoCircle className={styles.iconMenu} size={22} />
                            <p>Quem Somos</p>
                        </a>
                    </div>
                ) : (
                    <div className={styles.contentMenulLoader}>
                        <ThreeDots
                            height="88"
                            width="88"
                            radius="9"
                            color='#10b2aa'
                            ariaLabel='three-dots-loading'
                        />
                    </div>
                )}
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})