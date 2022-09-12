import { useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'

import { FiFolderPlus, FiPlus } from "react-icons/fi";
import { ModalNewClasses } from '../../components/ModalNewClasses'
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

export default function MyClasses({ info }: infoCourses) {
    const [modalItem, setModalItem] = useState<infoProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const [infoList, setInfoList] = useState(info || [])

    function handleCloseModal() {
        setModalVisible(false)
    }

    async function handleOpenModal() {
        setModalItem(infoList)
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
                        <h1>Minhas Aulas</h1>
                        <div className={styles.boxButton}>
                            <button title='Adicionar aulas' className={styles.buttonClasses} onClick={() => handleOpenModal()}>
                                Adicionar aulas
                                <FiFolderPlus color="#FFFFFF" size={19} className={styles.icon} />
                            </button>
                            <Link href="/classes">
                                <button title='Novo curso' className={styles.buttonCreate}>
                                    Novo curso
                                    <FiPlus color="#FFFFFF" size={20} className={styles.icon} />
                                </button>
                            </Link>
                        </div>
                    </div>

                    <div className={styles.contentCard}>
                        {infoList.map(item => (
                            <div key={item.id} className={styles.card}>
                                <img className={styles.imageCard} alt={item.title} src={item.image} />
                                <p>{item.title}</p>
                            </div>
                        ))}
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
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/myclasses')

    return {
        props: {
            info: response.data
        }
    }
})