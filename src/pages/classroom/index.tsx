import { useState, useEffect } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import { setupAPIClient } from '../../services/api'

import { FiDownload } from "react-icons/fi"
import { FaPlay } from "react-icons/fa"

export default function Classroom() {
    const [active, setActive] = useState(0)
    const [listOfClasses, setListOfClasses] = useState([])

    async function getClassById(id) {
        const apiClient = setupAPIClient()

        const response = await apiClient.get('/myclasses/classes', {
            params: {
                myclasse_id: id
            }
        })

        setListOfClasses(response.data)
    }

    function novaAba(material: string) {
        var win = window.open(`https://thdacademy.com:8443/files/${material}`)
        win.focus()
    }

    useEffect(() => {
        const urlParams = typeof window !== undefined && new URLSearchParams(window.location.search)
        const idClass = urlParams.get('id')
        getClassById(idClass)
    }, [])

    const src = listOfClasses[active]?.link

    return (
        <>
            <Head>
                <title>The.Doctors - Aula</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.boxVideo}>
                        <iframe
                            src={`https://www.youtube.com/embed/${src}`}
                            title="YouTube video player"
                        ></iframe>
                        <div className={styles.boxDescription}>
                            <h1>Descrição</h1>
                            <p>{listOfClasses[active]?.description}</p>
                        </div>
                        <div className={styles.material}>
                            <h2>Material para download</h2>

                            <div className={styles.boxMaterial}>
                                <button className={styles.card} onClick={() => novaAba(listOfClasses[active]?.material)}>
                                    <div>
                                        <FiDownload color="#3d424a" size={26} />
                                    </div>
                                    <text>Material da aula {listOfClasses[active]?.title}</text>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardVideos}>
                        <div className={styles.scroll}>
                            {listOfClasses.map((aula, index) => (
                                <div className={styles.boxInfo} key={aula} onClick={() => setActive(index)} style={{ cursor: 'pointer' }}>
                                    <h1>{aula.title}</h1>
                                    {active === index ? (
                                        <button className={styles.buttonChech} title="check" >
                                            <FaPlay color="#ffffff" size={8} />
                                        </button>
                                    ) : (
                                        <button className={styles.button} title="check"></button>
                                    )}
                                </div>
                            ))}
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