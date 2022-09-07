import { useContext, useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'

import { FiFolderPlus } from "react-icons/fi";
import { ModalNewClasses } from '../../components/ModalNewClasses'

export type infoModalProps = {
    material: string;
    description: string;
    myclasse_id: string;
}

export default function MyClasses() {
    const [modalItem, setModalItem] = useState<infoModalProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    function handleCloseModal() {
        setModalVisible(false)
    }

    async function handleOpenModal() {
        setModalVisible(true)
    }

    Modal.setAppElement('#__next')

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
                            <div className={styles.buttonClasses} onClick={handleOpenModal}>
                                <p>Adicionar aulas</p>
                                <FiFolderPlus color="#FFFFFF" size={17} className={styles.iconClasses} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {modalVisible && (
                <ModalNewClasses
                    isOpen={modalVisible}
                    onRequestClose={handleCloseModal}
                    infoClasses={modalItem}
                />
            )}
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})