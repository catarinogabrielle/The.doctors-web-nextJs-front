import Modal from "../ModalWrapper"; // <- wrapper JSX
import { default as ReactModal } from "react-modal"; // <- módulo original para usar setAppElement
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'

import { infoModalProps } from '../Header'
import { useEffect } from "react";

interface ModalPopUpProps {
    isOpen: boolean;
    onRequestClose: () => void;
    infoUser: infoModalProps;
}

export function ModalPopUp({ isOpen, onRequestClose, infoUser }: ModalPopUpProps) {
    var modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } }

    useEffect(() => {
        if (typeof window !== "undefined") {
            ReactModal.setAppElement("#__next"); // <- aqui está o fix
        }
    }, []);

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.content}
            style={modalStyles}
        >

            <div className={styles.containerButton}>
                <button
                    title='Usuário'
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                    style={{ background: 'transparent', border: 0 }}
                >
                    <FiX className={styles.icon} size={30} />
                </button>
            </div>

            <div className={styles.containerForm}>
                <h2>Detalhes do usuário</h2>

                <form>
                    <label>
                        Nome de usuário
                        <input value={infoUser.name} type="text" name="name" />
                    </label>

                    <label>
                        Email
                        <input value={infoUser.email} type="text" name="email" />
                    </label>

                    <label>
                        Status
                        <input value={infoUser.type} type="text" name="name" />
                    </label>
                </form>
            </div>

        </Modal>
    )
}