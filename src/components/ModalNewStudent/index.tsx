import React from "react"
import { useState } from "react"
import Modal from "react-modal"
import styles from "./styles.module.scss"

import { FiX } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { infoProps } from "../../pages/myclasses"

import { toast } from "react-toastify"

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: infoProps[];
}

export function ModalNewStudent({ isOpen, onRequestClose }: ModalNewClassesProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } }

  const apiClient = setupAPIClient()

  const [courseId, setCourseId] = useState("")
  const [userId, setUserId] = useState("")

  async function handleRegister() {
    await apiClient
      .put("/users/update", { courseId, userId })
      .then((response) => {
        toast.success("Curso vinculado ao aluno com sucesso!")
        onRequestClose()
      })
      .catch((err) => {
        console.log("erro", err)
        toast.error("Ops erro ao vinculado ao aluno!")
      })
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.content}
      style={modalStyles}
    >
      <div className={styles.containerButton}>
        <button
          title="Usuário"
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{ background: "transparent", border: 0 }}
        >
          <FiX className={styles.icon} size={30} />
        </button>
      </div>

      <main className={styles.contentForm}>
        <h1>Nova aula</h1>
        <div className={styles.form} >
          <input
            type="text"
            placeholder="adicione o id do usuário"
            className={styles.input}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />

          <input
            type="text"
            placeholder="adicione o id do curso"
            className={styles.input}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          />

          <button className={styles.buttonAdd} title="iniciar curso" onClick={() => handleRegister()}>
            <p>Iniciar Curso</p>
          </button>
        </div>
      </main>
    </Modal>
  )
}