import React, { useEffect, useState, ChangeEvent, FormEvent } from "react"
import Modal from "../ModalWrapper"
import { default as ReactModal } from "react-modal"
import styles from "./styles.module.scss"

import { FiX, FiUpload, FiChevronDown, FiChevronUp, FiTrash2, FiPlus, FiSave } from "react-icons/fi"

import { setupAPIClient } from "../../services/api"
import { infoProps } from "../../pages/myclasses"
import { toast } from "react-toastify"

interface ClasseItem {
  id: string;
  title: string;
  description: string;
  link: string;
  material: string | null;
  status: boolean;
  draft: boolean;
  myclasse_id: string;
}

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

  // Classes (aulas) state
  const [classes, setClasses] = useState<ClasseItem[]>([])
  const [expandedClassId, setExpandedClassId] = useState<string | null>(null)
  const [editingClasses, setEditingClasses] = useState<Record<string, { title: string; description: string; link: string; material: File | null }>>({})
  const [showNewClassForm, setShowNewClassForm] = useState(false)
  const [newClassTitle, setNewClassTitle] = useState("")
  const [newClassDescription, setNewClassDescription] = useState("")
  const [newClassLink, setNewClassLink] = useState("")
  const [newClassMaterial, setNewClassMaterial] = useState<File | null>(null)
  const [newClassMaterialName, setNewClassMaterialName] = useState("")

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

    fetchClasses(course.id)
  }, [course])

  async function fetchClasses(courseId: string) {
    try {
      const apiClient = setupAPIClient()
      const response = await apiClient.get("/myclasses/classes", {
        params: { myclasse_id: courseId },
      })
      setClasses(response.data)
      setEditingClasses({})
      setExpandedClassId(null)
    } catch (err) {
      console.log(err)
    }
  }

  function toggleClassExpand(classeId: string) {
    if (expandedClassId === classeId) {
      setExpandedClassId(null)
      return
    }
    setExpandedClassId(classeId)
    const classe = classes.find((c) => c.id === classeId)
    if (classe && !editingClasses[classeId]) {
      setEditingClasses((prev) => ({
        ...prev,
        [classeId]: {
          title: classe.title,
          description: classe.description,
          link: classe.link,
          material: null,
        },
      }))
    }
  }

  function handleClassFieldChange(classeId: string, field: string, value: string) {
    setEditingClasses((prev) => ({
      ...prev,
      [classeId]: {
        ...prev[classeId],
        [field]: value,
      },
    }))
  }

  function handleClassMaterialChange(classeId: string, e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return
    setEditingClasses((prev) => ({
      ...prev,
      [classeId]: {
        ...prev[classeId],
        material: e.target.files[0],
      },
    }))
  }

  async function handleSaveClass(classeId: string) {
    const editing = editingClasses[classeId]
    if (!editing) return

    if (editing.title === "" || editing.description === "" || editing.link === "") {
      toast.warning("Preencha todos os campos da aula!")
      return
    }

    try {
      const data = new FormData()
      data.append("classe_id", classeId)
      data.append("title", editing.title)
      data.append("description", editing.description)
      data.append("link", editing.link)
      if (editing.material) {
        data.append("material", editing.material)
      }

      const apiClient = setupAPIClient()
      const response = await apiClient.put("/classes/update", data)

      setClasses((prev) =>
        prev.map((c) => (c.id === classeId ? { ...c, ...response.data } : c))
      )
      toast.success("Aula atualizada com sucesso!")
    } catch (err) {
      console.log(err)
      toast.error("Erro ao atualizar aula!")
    }
  }

  async function handleDeleteClass(classeId: string) {
    if (!confirm("Tem certeza que deseja excluir esta aula?")) return

    try {
      const apiClient = setupAPIClient()
      await apiClient.delete("/classes/delete", {
        params: { classe_id: classeId },
      })
      setClasses((prev) => prev.filter((c) => c.id !== classeId))
      if (expandedClassId === classeId) setExpandedClassId(null)
      toast.success("Aula excluída com sucesso!")
    } catch (err) {
      console.log(err)
      toast.error("Erro ao excluir aula!")
    }
  }

  function handleNewClassMaterial(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || !e.target.files[0]) return
    setNewClassMaterial(e.target.files[0])
    setNewClassMaterialName(e.target.files[0].name)
  }

  async function handleAddNewClass() {
    if (!course) return

    if (newClassTitle === "" || newClassDescription === "" || newClassLink === "") {
      toast.warning("Preencha todos os campos da nova aula!")
      return
    }

    try {
      const data = new FormData()
      data.append("title", newClassTitle)
      data.append("description", newClassDescription)
      data.append("link", newClassLink)
      data.append("myclasse_id", course.id)
      if (newClassMaterial) {
        data.append("material", newClassMaterial)
      }

      const apiClient = setupAPIClient()
      await apiClient.post("/classes", data)

      toast.success("Aula adicionada com sucesso!")
      setNewClassTitle("")
      setNewClassDescription("")
      setNewClassLink("")
      setNewClassMaterial(null)
      setNewClassMaterialName("")
      setShowNewClassForm(false)

      fetchClasses(course.id)
    } catch (err) {
      console.log(err)
      toast.error("Erro ao adicionar aula!")
    }
  }

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

        {/* Seção de Aulas */}
        <div className={styles.classesSection}>
          <div className={styles.classesSectionHeader}>
            <h2>Aulas do curso</h2>
            <button
              type="button"
              className={styles.addClassButton}
              onClick={() => setShowNewClassForm(!showNewClassForm)}
            >
              <FiPlus size={18} />
              Nova aula
            </button>
          </div>

          {/* Formulário de nova aula */}
          {showNewClassForm && (
            <div className={styles.newClassForm}>
              <h5>Adicionar nova aula</h5>
              <input
                type="text"
                placeholder="Título da aula"
                className={styles.input}
                value={newClassTitle}
                onChange={(e) => setNewClassTitle(e.target.value)}
              />
              <textarea
                placeholder="Descreva sobre a aula..."
                className={styles.input}
                value={newClassDescription}
                onChange={(e) => setNewClassDescription(e.target.value)}
              />
              <input
                type="text"
                placeholder="Chave de link para aula"
                className={styles.input}
                value={newClassLink}
                onChange={(e) => setNewClassLink(e.target.value)}
              />
              <label className={styles.labelMaterial}>
                <span>
                  <FiUpload size={18} color="#3d424a" />
                </span>
                <input
                  type="file"
                  accept=".docx, .pptx, .pdf"
                  onChange={handleNewClassMaterial}
                />
                {newClassMaterialName && (
                  <p className={styles.materialName}>{newClassMaterialName}</p>
                )}
                {!newClassMaterialName && (
                  <p className={styles.materialName}>Material (opcional)</p>
                )}
              </label>
              <div className={styles.newClassActions}>
                <button
                  type="button"
                  className={styles.saveClassButton}
                  onClick={handleAddNewClass}
                >
                  <FiPlus size={16} />
                  Adicionar
                </button>
                <button
                  type="button"
                  className={styles.cancelClassButton}
                  onClick={() => {
                    setShowNewClassForm(false)
                    setNewClassTitle("")
                    setNewClassDescription("")
                    setNewClassLink("")
                    setNewClassMaterial(null)
                    setNewClassMaterialName("")
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Lista de aulas existentes */}
          {classes.length === 0 ? (
            <p className={styles.noClasses}>Nenhuma aula cadastrada neste curso.</p>
          ) : (
            <div className={styles.classesList}>
              {classes.map((classe, index) => (
                <div key={classe.id} className={styles.classeItem}>
                  <div
                    className={styles.classeHeader}
                    onClick={() => toggleClassExpand(classe.id)}
                  >
                    <div className={styles.classeHeaderLeft}>
                      <span className={styles.classeIndex}>{index + 1}</span>
                      <span className={styles.classeTitle}>{classe.title}</span>
                    </div>
                    <div className={styles.classeHeaderRight}>
                      <button
                        type="button"
                        className={styles.deleteClassBtn}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleDeleteClass(classe.id)
                        }}
                        title="Excluir aula"
                      >
                        <FiTrash2 size={16} color="#FF3F4B" />
                      </button>
                      {expandedClassId === classe.id ? (
                        <FiChevronUp size={20} color="#666" />
                      ) : (
                        <FiChevronDown size={20} color="#666" />
                      )}
                    </div>
                  </div>

                  {expandedClassId === classe.id && editingClasses[classe.id] && (
                    <div className={styles.classeBody}>
                      <input
                        type="text"
                        placeholder="Título da aula"
                        className={styles.input}
                        value={editingClasses[classe.id].title}
                        onChange={(e) => handleClassFieldChange(classe.id, "title", e.target.value)}
                      />
                      <textarea
                        placeholder="Descrição da aula"
                        className={styles.input}
                        value={editingClasses[classe.id].description}
                        onChange={(e) => handleClassFieldChange(classe.id, "description", e.target.value)}
                      />
                      <input
                        type="text"
                        placeholder="Chave de link para aula"
                        className={styles.input}
                        value={editingClasses[classe.id].link}
                        onChange={(e) => handleClassFieldChange(classe.id, "link", e.target.value)}
                      />
                      <label className={styles.labelMaterial}>
                        <span>
                          <FiUpload size={18} color="#3d424a" />
                        </span>
                        <input
                          type="file"
                          accept=".docx, .pptx, .pdf"
                          onChange={(e) => handleClassMaterialChange(classe.id, e)}
                        />
                        <p className={styles.materialName}>
                          {editingClasses[classe.id].material
                            ? editingClasses[classe.id].material.name
                            : classe.material
                            ? classe.material
                            : "Nenhum material"}
                        </p>
                      </label>
                      <button
                        type="button"
                        className={styles.saveClassButton}
                        onClick={() => handleSaveClass(classe.id)}
                      >
                        <FiSave size={16} />
                        Salvar aula
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </Modal>
  )
}
