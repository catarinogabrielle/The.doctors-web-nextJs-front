import React, { useEffect } from "react"
import { useState, ChangeEvent, FormEvent } from "react"
import Modal from "../ModalWrapper"; // <- wrapper JSX
import { default as ReactModal } from "react-modal"; // <- módulo original para usar setAppElement
import styles from "./styles.module.scss"

import { FiX, FiUpload } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { infoProps } from "../../pages/myclasses"
import { toast } from "react-toastify"

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: infoProps[];
}

export function ModalNewClasses({ isOpen, onRequestClose, infoClasses }: ModalNewClassesProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } }
  
  useEffect(() => {
      if (typeof window !== "undefined") {
        ReactModal.setAppElement("#__next"); // <- aqui está o fix
      }
    }, []);

  const [uploadedFiles, setUploadedFiles] = useState("")
  const [fileAvatar, setFileAvatar] = useState(null)
  const [infoClassesSelected, setInfoClassesSelected] = useState(0)
  const [link, setLink] = useState("")
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  async function handleRegister(event: FormEvent) {
    event.preventDefault()

    try {
      const data = new FormData()

      if (title === "" || description === "" || fileAvatar === null || link === "") {
        toast.warning("Preencha todos os campos!")
        return
      }

      data.append("title", title)
      data.append("description", description)
      data.append("material", fileAvatar)
      data.append("link", link)
      data.append("myclasse_id", infoClasses[infoClassesSelected].id)

      const apiClient = setupAPIClient()

      await apiClient.post("/classes", data)

      toast.success("Aula cadastrada com sucesso!")
    } catch (err) {
      console.log(err)
      toast.error("Ops erro ao cadastrar a aula!")
    }

    setTitle("")
    setLink("")
    setDescription("")
    setFileAvatar(null)
    setUploadedFiles("")
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return
    }

    const chosenFiles = Array.prototype.slice.call(e.target.files)
    const files = e.target.files[0]

    if (!chosenFiles) {
      return
    }

    setFileAvatar(files)
    setUploadedFiles(chosenFiles.map((item) => item.name))
  }

  function handleChangeClasses(event) {
    setInfoClassesSelected(event.target.value)
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
        <form className={styles.form} onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Título da aula"
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <h5>Escolha o curso</h5>
          <select value={infoClassesSelected} onChange={handleChangeClasses}>
            {infoClasses.map((item, index) => {
              return (
                <option key={Math.random()} value={index}>
                  {item.title}
                </option>
              )
            })}
          </select>

          <textarea
            placeholder="Descreva sobre a aula..."
            className={styles.input}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <h5>Material para aula</h5>
          <label className={styles.labelAvatar}>
            <span>
              <FiUpload size={20} color="#3d424a" />
            </span>
            <input
              type="file"
              accept=".docx, .pptx, .pdf"
              onChange={handleFile}
            />
            {uploadedFiles && (
              <div className={styles.boxFiles}>
                <h1>{uploadedFiles}</h1>
              </div>
            )}
          </label>

          <input
            type="text"
            placeholder="Chave de link para aula"
            className={styles.input}
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />

          <button className={styles.buttonAdd} type="submit">
            <p>Adicionar Aula</p>
          </button>
        </form>
      </main>
    </Modal>
  )
}