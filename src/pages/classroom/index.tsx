import { useState } from 'react'
import { Header } from '../../components/Header/index'
import styles from './styles.module.scss'
import Head from 'next/head'

import { FaFileWord, FaFilePowerpoint, FaFilePdf } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";

export default function Classroom() {
    const [active, setActive] = useState(false)

    return (
        <>
            <Head>
                <title>The.Doctors - Aula</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.boxVideo}>
                        <div className={styles.video}>
                            <img alt="imagem teste" src="/banner1.png" />
                        </div>
                        <div className={styles.boxDescription}>
                            <h1>Descrição</h1>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
                                commodo tempor metus at iaculis. Cras lobortis, tortor ac pellentesque
                                placerat, lorem diam tempus arcu, consequat finibus eros nisl ac
                                tortor. Ut volutpat fermentum tortor, in malesuada nisl ornare dignissim.
                                Suspendisse gravida odio in orci suscipit semper. In quis pulvinar magna.</p>
                        </div>
                        <div className={styles.material}>
                            <h2>Material para download</h2>
                            <div className={styles.boxMaterial}>
                                <div className={styles.card}>
                                    <div>
                                        <FaFileWord color="#003cff" size={30} />
                                    </div>
                                    <text>CURSO SOBRE ESTUDO VOL1</text>
                                </div>

                                <div className={styles.card}>
                                    <div>
                                        <FaFilePowerpoint color="#f53a01" size={30} />
                                    </div>
                                    <text>PARA ESTUDO VOL1 teste de linha teste de corde de quebrando</text>
                                </div>

                                <div className={styles.card}>
                                    <div>
                                        <FaFilePdf color="#ff0e0e" size={30} />
                                    </div>
                                    <text>CURSO SOBRE ALGUMA COISA - MATERIAL PARA ESTUDO VOL1</text>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.cardVideos}>
                        <div className={styles.scroll}>
                            <div className={styles.boxInfoVideo}>
                                <div className={styles.imageVideo}>
                                    <img alt="imagem teste" src="/banner1.png" />
                                </div>
                                <div className={styles.info}>
                                    <h1>Aula1 - como editar um video</h1>
                                    {active ? (
                                        <button className={styles.button} title="check" onClick={() => setActive(!active)}></button>
                                    ) : (
                                        <button className={styles.buttonChech} title="check" onClick={() => setActive(!active)}>
                                            <FiCheck color="#ffffff" size={13} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}