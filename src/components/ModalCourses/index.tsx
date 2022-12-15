import Modal from "react-modal"
import styles from "./styles.module.scss"

import { FiX } from "react-icons/fi"
import { InfoProps, CourseProps } from "../../pages/courses"
import { setupAPIClient } from "../../services/api"
import { AuthContext } from "../../contexts/AuthContext"
import { useContext, useEffect, useState } from "react"

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: InfoProps[];
  course: CourseProps;
}

export function ModalCourses({ isOpen, onRequestClose, infoClasses, course }: ModalNewClassesProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } }
  const [registered, setRegistered] = useState(false)
  const { user, update } = useContext(AuthContext)
  const apiClient = setupAPIClient()

  const handleMyCourse = async () => {
    const courseId = course.id
    const userId = user.id

    await apiClient
      .put("/users/update", { courseId, userId })
      .then((response) => {
        setRegistered(true)
        onRequestClose()
      })
      .catch((err) => {
        console.log("erro", err)
      })
  }

  const checkCourseIncription = async () => {
    await apiClient
      .get("/me")
      .then((response) => {
        const { mycourse_id } = response.data
        mycourse_id.forEach((myCourseId) => {
          if (myCourseId === course.id) setRegistered(true)
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    checkCourseIncription()
  }, [])

  const src = course.link

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={styles.container}
      style={modalStyles}
    >
      <div className={styles.containerButton}>
        <h1>{course.title}</h1>
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

      <div className={styles.content}>
        <div className={styles.boxVideoInfo}>
          <iframe
            src={`https://www.youtube.com/embed/${src}`}
            title="YouTube video player"
          ></iframe>
          <div className={styles.class}>
            <h1>Aulas que serão lecionadas durante o curso</h1>
            <div className={styles.boxScrollClass}>
              {infoClasses.map((item) => (
                <div key={Math.random()} className={styles.infoClass}>
                  <text>{item.title}</text>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div key={Math.random()} className={styles.contentInfoCourse}>
          <h1>{course.time} Horas</h1>
          <h1>Totalmente online</h1>
          <h1>Material de Apoio</h1>
          <h1>Certificado de conclusão</h1>
        </div>

        <div key={Math.random()} className={styles.description}>
          <h1>Descrição</h1>
          <text>{course.description}</text>
        </div>

        <div key={Math.random()} className={styles.boxTeacher}>
          <img
            alt={course.title}
            src={`http://localhost:3333/files/${course.teacherphoto}`}
          />
          <div className={styles.infoTeacher}>
            <h1>{course.teachername}</h1>
            <h2>{course.teacherwork}</h2>
            <text>{course.teacherinfo}</text>
          </div>
        </div>

        {!registered && (
          <button
            className={styles.button}
            title="iniciar curso"
            onClick={() => handleMyCourse()}
          >
            Iniciar Curso
          </button>
        )}
      </div>
    </Modal>
  )
}
