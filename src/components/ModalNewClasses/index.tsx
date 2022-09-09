import { useState, ChangeEvent } from 'react'
import Modal from 'react-modal'
import styles from './styles.module.scss'

import { FiX, FiUpload } from 'react-icons/fi'

import { infoModalProps } from '../Header'

interface ModalNewClassesProps {
    isOpen: boolean;
    onRequestClose: () => void;
    infoClasses: infoModalProps;
}

export function ModalNewClasses({ isOpen, onRequestClose, infoClasses }: ModalNewClassesProps) {
    const [uploadedFiles, setUploadedFiles] = useState()
    const [fileAvatar, setFileAvatar] = useState(null)

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const chosenFiles = Array.prototype.slice.call(e.target.files)

        if (!chosenFiles) {
            return
        }

        setFileAvatar(chosenFiles)
        setUploadedFiles(chosenFiles.map(item => item.name))
    }

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

            <main className={styles.contentForm}>
                <h1>Nova aula</h1>
                <form className={styles.form}>
                    <input
                        type="text"
                        placeholder="Título da aula"
                        className={styles.input}
                    />

                    <select>
                        <option>
                            Bebida
                        </option>
                        <option>
                            Pizzas
                        </option>
                    </select>

                    <textarea
                        placeholder="Descreva sobre a aula..."
                        className={styles.input}
                    />

                    <h5>Material para aula</h5>
                    <label className={styles.labelAvatar}>
                        <span>
                            <FiUpload size={20} color="#3d424a" />
                        </span>
                        <input type="file" accept=".docx, .pptx, .pdf" multiple onChange={handleFile} />
                        {uploadedFiles && (
                            <div className={styles.boxFiles}>
                                <h1>{uploadedFiles}</h1>
                            </div>
                        )}
                    </label>

                    <div className={styles.buttonAdd}>
                        <p>Adicionar Aula</p>
                    </div>
                </form>
            </main>

        </Modal>
    )
}