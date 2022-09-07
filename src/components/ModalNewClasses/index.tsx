import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX } from 'react-icons/fi'

import { infoModalProps } from '../Header'

interface ModalNewClassesProps {
    isOpen: boolean;
    onRequestClose: () => void;
    infoClasses: infoModalProps;
}

export function ModalNewClasses({ isOpen, onRequestClose, infoClasses }: ModalNewClassesProps) {
    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            className={styles.content}
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

        </Modal>
    )
}