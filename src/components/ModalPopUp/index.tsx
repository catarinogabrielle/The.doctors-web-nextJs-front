import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'

import { infoModalProps } from '../Header'

interface ModalPopUpProps {
    isOpen: boolean;
    onRequestClose: () => void;
    infoUser: infoModalProps;
}

export function ModalPopUp({ isOpen, onRequestClose, infoUser }: ModalPopUpProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.content}
        >

            <div className={styles.containerButton}>
                <button
                    title='title'
                    type="button"
                    onClick={onRequestClose}
                    className="react-modal-close"
                    style={{ background: 'transparent', border: 0 }}
                >
                    <FiX color="#e9e9e9" size={30} />
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