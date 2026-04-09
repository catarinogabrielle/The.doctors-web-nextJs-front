import React, { useEffect, useState } from "react"
import Modal from "../ModalWrapper";
import { default as ReactModal } from "react-modal";
import styles from "./styles.module.scss"

import { FiX } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { toast } from "react-toastify"

interface ModalNewTeacherProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

export function ModalNewTeacher({ isOpen, onRequestClose }: ModalNewTeacherProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "rgba(0, 0, 0, 0.7)" } }

  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactModal.setAppElement("#__next");
    }
  }, []);

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleCreateTeacher() {
    if (!name || !email || !password) {
      toast.warning("Preencha todos os campos")
      return
    }

    setLoading(true)

    try {
      const apiClient = setupAPIClient()
      await apiClient.post("/users/teacher", {
        name,
        email,
        password
      })

      toast.success("Professor criado com sucesso!")
      setName("")
      setEmail("")
      setPassword("")
      onRequestClose()
    } catch (err) {
      toast.error("Erro ao criar professor!")
      console.log("erro", err)
    } finally {
      setLoading(false)
    }
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
          title="Fechar"
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
          style={{ background: "transparent", border: 0 }}
        >
          <FiX className={styles.icon} size={30} />
        </button>
      </div>

      <main className={styles.contentForm}>
        <h1>Criar Professor</h1>
        <div className={styles.form}>
          <label className={styles.label}>Nome</label>
          <input
            className={styles.input}
            type="text"
            placeholder="Nome do professor"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label className={styles.label}>Email</label>
          <input
            className={styles.input}
            type="email"
            placeholder="Email do professor"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label className={styles.label}>Senha</label>
          <input
            className={styles.input}
            type="password"
            placeholder="Senha do professor"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className={styles.buttonAdd}
            onClick={handleCreateTeacher}
            disabled={loading}
          >
            <p>{loading ? "Criando..." : "Criar Professor"}</p>
          </button>
        </div>
      </main>
    </Modal>
  )
}
