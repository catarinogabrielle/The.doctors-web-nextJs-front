import React, { useEffect, useState } from "react"
import Modal from "../ModalWrapper"; // <- wrapper JSX
import { default as ReactModal } from "react-modal"; // <- módulo original para usar setAppElement
import styles from "./styles.module.scss"

import { FiX } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { infoProps } from "../../pages/myclasses"

import { toast } from "react-toastify"

interface StudentOption {
  id: string;
  name: string;
  email: string;
}

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: infoProps[];
}

export function ModalNewStudent({ isOpen, onRequestClose, infoClasses }: ModalNewClassesProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "rgba(0, 0, 0, 0.7)" } }

  useEffect(() => {
        if (typeof window !== "undefined") {
          ReactModal.setAppElement("#__next");
        }
      }, []);

  const apiClient = setupAPIClient()

  const [courseId, setCourseId] = useState("")
  const [userId, setUserId] = useState("")
  const [students, setStudents] = useState<StudentOption[]>([])
  const [loadingStudents, setLoadingStudents] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setLoadingStudents(true)
      apiClient.get("/students")
        .then((response) => {
          setStudents(response.data)
        })
        .catch(() => {
          toast.error("Erro ao carregar lista de alunos")
        })
        .finally(() => {
          setLoadingStudents(false)
        })
    }
  }, [isOpen])

  async function handleRegister() {
    if (!userId || !courseId) {
      toast.warning("Selecione o aluno e o curso")
      return
    }

    await apiClient
      .put("/users/update", { courseId, userId })
      .then(() => {
        toast.success("Curso vinculado ao aluno com sucesso!")
        setCourseId("")
        setUserId("")
        onRequestClose()
      })
      .catch(() => {
        toast.error("Ops erro ao vincular ao aluno!")
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
        <h1>Matricular Aluno</h1>
        <div className={styles.form} >
          <label className={styles.label}>Curso</label>
          <select
            className={styles.input}
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
          >
            <option value="">Selecione o curso</option>
            {infoClasses && infoClasses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.title}
              </option>
            ))}
          </select>

          <label className={styles.label}>Aluno</label>
          <select
            className={styles.input}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            disabled={loadingStudents}
          >
            <option value="">
              {loadingStudents ? "Carregando alunos..." : "Selecione o aluno"}
            </option>
            {students.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name} - {student.email}
              </option>
            ))}
          </select>

          <button className={styles.buttonAdd} title="Matricular aluno" onClick={() => handleRegister()}>
            <p>Matricular Aluno</p>
          </button>
        </div>
      </main>
    </Modal>
  )
}