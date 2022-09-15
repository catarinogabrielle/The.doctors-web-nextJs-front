import { useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { setupAPIClient } from '../../services/api'

import { FiSearch } from 'react-icons/fi'

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

export default function Courses({ info }: infoCourses) {
    const [infoList, setInfoList] = useState(info || [])

    function handleMeetCourse(id: string) {
        console.log(id)
    }

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
                        {infoList.map(item => (
                            <Link key={item.id} href="/meetcourse">
                                <div className={styles.card} onClick={() => handleMeetCourse(item.id)}>
                                    <img className={styles.imageCard} alt={item.title} src={`http://localhost:3333/files/${item.image}`} />
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