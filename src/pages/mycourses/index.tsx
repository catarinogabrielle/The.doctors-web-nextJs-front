import { useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { setupAPIClient } from '../../services/api'

export type infoProps = {
    id: string;
    title: string;
    image: string;
    teachername: string;
    teacherphoto: string;
    teacherwork: string;
    teacherinfo: string;
    description: string;
    time: string;
}

interface infoCourses {
    info: infoProps[];
}

export default function MyCourses({ info }: infoCourses) {
    const [infoList, setInfoList] = useState(info || [])

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
                        {infoList.map(item => (
                            <Link key={item.id} href="/classroom">
                                <div className={styles.card}>
                                    <img className={styles.imageCard} alt={item.title} src={item.image} />
                                    <div className={styles.descriptionCard}>
                                        <p>{item.title}</p>
                                        <div className={styles.course}>
                                            <p>Curso Online</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/myclasses')

    return {
        props: {
            info: response.data
        }
    }
})