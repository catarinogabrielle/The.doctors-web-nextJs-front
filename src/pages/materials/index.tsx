import { Header } from '../../components/Header/index'
import styles from './styles.module.scss'
import Head from 'next/head'

import { FiSearch } from 'react-icons/fi'
import { FaFileWord, FaFilePowerpoint, FaFilePdf } from "react-icons/fa";

export default function Materials() {
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
                        <div className={styles.boxInput}>
                            <input type="text" placeholder="Pesquisar material" />
                            <button className={styles.buttonSearch} title="pesquisar">
                                <FiSearch className={styles.icon} size={20} />
                            </button>
                        </div>
                    </div>
                    <div className={styles.boxCard}>
                        <div className={styles.card}>
                            <FaFileWord color="#003cff" size={30} />
                            <div className={styles.boxInfo}>
                                <text>CURSO SOBRE ALGUMA COISA - MATERIAL PARA ESTUDO VOL1</text>
                                <div className={styles.typeInfo}>
                                    <p>PDF</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <FaFilePowerpoint color="#f53a01" size={30} />
                            <div className={styles.boxInfo}>
                                <text>CURSO SOBRE ALGUMA COISA - MATERIAL PARA ESTUDO VOL1</text>
                                <div className={styles.typeInfo}>
                                    <p>PDF</p>
                                </div>
                            </div>
                        </div>

                        <div className={styles.card}>
                            <FaFilePdf color="#ff0e0e" size={30} />
                            <div className={styles.boxInfo}>
                                <text>CURSO SOBRE ALGUMA COISA - MATERIAL PARA ESTUDO VOL1</text>
                                <div className={styles.typeInfo}>
                                    <p>PDF</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}