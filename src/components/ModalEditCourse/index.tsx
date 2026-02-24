import React, { useEffect, useState, ChangeEvent, FormEvent } from "react"
import Modal from "../ModalWrapper"
import { default as ReactModal } from "react-modal"
import styles from "./styles.module.scss"

import { FiX, FiUpload } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { infoProps } from "../../pages/myclasses"
import { toast } from "react-toastify"

interface ModalEditCourseProps {
  isOpen: boolean;
  onRequestClose: () => void;
  course: infoProps | null;
  onUpdated: (updated: infoProps) => void;
}

export function ModalEditCourse({ isOpen, onRequestClose, course, onUpdated }: ModalEditCourseProps) {
  const modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } }

  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactModal.setAppElement("#__next")
    }
  }, [])

  const [title, setTitle] = useState("")
  const [link, setLink] = useState("")
  const [paymentlink, setPaymentlink] = useState("")
  const [name, setName] = useState("")
  const [work, setWork] = useState("")
  const [info, setInfo] = useState("")
  const [description, setDescription] = useState("")
  const [time, setTime] = useState("")

  const [avatarUrlBanner, setAvatarUrlBanner] = useState("")
  const [imageAvatarBanner, setImageAvatarBanner] = useState<File | null>(null)
  const [avatarUrlTeacher, setAvatarUrlTeacher] = useState("")
  const [imageAvatarTeacher, setImageAvatarTeacher] = useState<File | null>(null)

  useEffect(() => {
    if (!course) {
      return
    }

    setTitle(course.title || "")
    setLink(course.link || "")
    setPaymentlink(course.paymentlink || "")
    setName(course.teachername || "")
    setWork(course.teacherwork || "")
    setInfo(course.teacherinfo || "")
    setDescription(course.description || "")
    setTime(course.time || "")

    setAvatarUrlBanner(course.image ? `${process.env.API_URL}/files/${course.image}` : "")
    setAvatarUrlTeacher(course.teacherphoto ? `${process.env.API_URL}/files/${course.teacherphoto}` : "")
    setImageAvatarBanner(null)
    setImageAvatarTeacher(null)
  }, [course])

  async function handleUpdate(event: FormEvent) {
    event.preventDefault()

    if (!course) {
      return
    }

    if (
      title === "" ||
      link === "" ||
      paymentlink === "" ||
      name === "" ||
      work === "" ||
      info === "" ||
      description === "" ||
      time === ""
    ) {
      toast.warning("Preencha todos os campos!")
      return
    }

    try {
      const data = new FormData()

      data.append("myclasse_id", course.id)
      data.append("title", title)
      data.append("link", link)
      data.append("paymentlink", paymentlink)
      data.append("teachername", name)
      data.append("teacherwork", work)
      data.append("teacherinfo", info)
      data.append("description", description)
      data.append("time", time)

      if (imageAvatarBanner) {
        data.append("image", imageAvatarBanner)
      }

      if (imageAvatarTeacher) {
        data.append("teacherphoto", imageAvatarTeacher)
      }

      const apiClient = setupAPIClient()
      const response = await apiClient.put("/myclasses/update", data)

      onUpdated(response.data)
      toast.success("Curso atualizado com sucesso!")
      onRequestClose()
    } catch (err) {
      console.log(err)
      toast.error("Ops erro ao atualizar o curso!")
    }
  }

  function handleFileBanner(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatarBanner(image)
      setAvatarUrlBanner(URL.createObjectURL(e.target.files[0]))
    }
  }

  function handleFileTeacher(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const image = e.target.files[0]

    if (!image) {
      return
    }

    if (image.type === "image/jpeg" || image.type === "image/png") {
      setImageAvatarTeacher(image)
      setAvatarUrlTeacher(URL.createObjectURL(e.target.files[0]))
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
        <h1>Editar curso</h1>
        <form className={styles.form} onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Digite o titulo do curso"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            type="text"
            placeholder="Chave de link para video"
            className={styles.input}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <input
            type="text"
            placeholder="Link de pagamento do curso"
            className={styles.input}
            value={paymentlink}
            onChange={(e) => setPaymentlink(e.target.value)}
          />
          <textarea
            placeholder="Descreva sobre o curso..."
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Tempo de duração do curso"
            className={styles.input}
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <h5>Banner do curso</h5>
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={30} color="#3d424a" />
            </span>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileBanner} />
            {avatarUrlBanner && (
              <img
                className={styles.preview}
                src={avatarUrlBanner}
                alt="Banner do curso"
                width={250}
                height={250}
              />
            )}
          </label>

          <h2>Informacoes sobre o professor</h2>
          <input
            type="text"
            placeholder="Nome do professor"
            className={styles.input}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Funcao do professor"
            className={styles.input}
            value={work}
            onChange={(e) => setWork(e.target.value)}
          />
          <textarea
            placeholder="Descricao sobre o professor..."
            className={styles.input}
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />

          <h5>Foto do professor</h5>
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={30} color="#3d424a" />
            </span>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileTeacher} />
            {avatarUrlTeacher && (
              <img
                className={styles.preview}
                src={avatarUrlTeacher}
                alt="Foto do professor"
                width={250}
                height={250}
              />
            )}
          </label>

          <button className={styles.buttonAdd} type="submit">
            <p>Salvar alteracoes</p>
          </button>
        </form>
      </main>
    </Modal>
  )
}
