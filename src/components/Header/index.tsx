import { useContext, useState } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'
import Modal from 'react-modal'

import { setupAPIClient } from '../../services/api'
import { ModalPopUp } from '../ModalPopUp'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export type infoModalProps = {
    name: string;
    email: string;
    type: string;
}

export function Header() {
    const [modalItem, setModalItem] = useState<infoModalProps[]>()
    const [modalVisible, setModalVisible] = useState(false)

    const { signOut, user } = useContext(AuthContext)

    function handleCloseModal() {
        setModalVisible(false)
    }

    async function handleOpenModal() {
        const apiClient = setupAPIClient()

        await apiClient.get('/me').then(response => {
            setModalItem(response.data)
            setModalVisible(true)

        }).catch((err) => {
            console.log('erro', err)
        })
    }

    Modal.setAppElement('#__next')

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <div className={styles.infoContentHeader}>
                    <Link href="/dashboard">
                        <img alt="logo" src="/logo.png" />
                    </Link>

                    <a>Seja Bem Vindo(a) {user?.name}</a>
                </div>

                <nav className={styles.menuNav}>
                    <Link href="/dashboard">
                        <a className={styles.linkHeader}>Home</a>
                    </Link>

                    <button onClick={handleOpenModal}>
                        <a className={styles.linkHeader}>Usuário</a>
                    </button>

                    <button title='title' className={styles.buttonOut} onClick={signOut}>
                        <FiLogOut color="#3d424a" size={24} />
                    </button>
                </nav>

                {modalVisible && (
                    <ModalPopUp
                        isOpen={modalVisible}
                        onRequestClose={handleCloseModal}
                        infoUser={modalItem}
                    />
                )}

            </div>
        </header>
    )
}