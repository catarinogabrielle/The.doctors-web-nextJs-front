import { useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'

import { FiDownload } from 'react-icons/fi'

import { setupAPIClient } from '../../services/api'

export type infoProps = {
    id: string;
    title: string;
    status: boolean;
    draft: boolean;
    material: string;
    description: string;
    myclasse_id: string;
}

interface infoCourses {
    info: infoProps[];
}

export default function Materials({ info }: infoCourses) {
    const [infoList, setInfoList] = useState(info || [])

    function novaAba(material: string) {
        var win = window.open(`http://localhost:3333/files/${material}`);
        win.focus();
    }

    return (
        <>
            <Head>
                <title>The.Doctors - Materiais</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.boxTitle}>
                        <h1>Materiais Disponiveis</h1>
                    </div>
                    <div className={styles.boxCard}>
                        {infoList.map(aula => (
                            <button className={styles.card} key={aula.id} onClick={() => novaAba(aula.material)} >
                                <FiDownload color="#3d424a" size={26} />
                                <text>{aula.title}</text>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)

    const allCourses = await apiClient.get('/myclasses')
    const user = await apiClient.get('/me')
    const myCourses = []

    allCourses.data.forEach(course => {
        user.data.mycourse_id.forEach(myCourseId => {
            if (course.id === myCourseId) myCourses.push(course);
        });
    });

    const myClasses = []
    myCourses.forEach(classe => {
        myClasses.push(classe)
    });

    return {
        props: {
            info: myClasses
        }
    }
})