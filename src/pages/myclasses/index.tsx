import { useState } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'
import Modal from 'react-modal'
import { toast } from 'react-toastify'

import { FiFolderPlus, FiPlus } from "react-icons/fi"
import { AiOutlineUserAdd } from "react-icons/ai"
import { ModalNewClasses } from '../../components/ModalNewClasses'
import { ModalNewStudent } from '../../components/ModalNewStudent'
import { setupAPIClient } from '../../services/api'

export type infoProps = {
  id: string;
  title: string;
  image: string;
  teachername: string;
  teacherphoto: string;
  teacherwork: string;
  teacherinfo: string;
  description: string;
  time: string;
}

interface infoCourses {
  info: infoProps[];
}

export default function MyClasses({ info }: infoCourses) {
  const [modalItemClasses, setModalItemClasses] = useState<infoProps[]>()
  const [modalVisibleClasses, setModalVisibleClasses] = useState(false)
  const [modalItemStudent, setModalItemStudent] = useState<infoProps[]>()
  const [modalVisibleStudent, setModalVisibleStudent] = useState(false)

  const [infoList, setInfoList] = useState(info || [])

  function handleCloseModalClasses() {
    setModalVisibleClasses(false)
  }

  async function handleOpenModalClasses() {
    setModalItemClasses(infoList)
    setModalVisibleClasses(true)
  }

  function handleCloseModalStudent() {
    setModalVisibleStudent(false)
  }

  async function handleOpenModalStudent() {
    setModalItemStudent(infoList)
    setModalVisibleStudent(true)
  }

  Modal.setAppElement('#__next')

  return (
    <>
      <Head>
        <title>The.Doctors - Gerenciar Cursos</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.contentButton}>
            <h1>Gerenciar Cursos</h1>
            <div className={styles.boxButton}>
              <button
                title="Adicionar aulas"
                className={styles.buttonClasses}
                onClick={() => handleOpenModalStudent()}
              >
                Adicionar aluno
                <AiOutlineUserAdd
                  color="#FFFFFF"
                  size={19}
                  className={styles.icon}
                />
              </button>
              <button
                title="Adicionar aulas"
                className={styles.buttonClasses}
                onClick={() => handleOpenModalClasses()}
              >
                Adicionar aulas
                <FiFolderPlus
                  color="#FFFFFF"
                  size={19}
                  className={styles.icon}
                />
              </button>
              <Link href="/classes">
                <button title="Novo curso" className={styles.buttonCreate}>
                  Novo curso
                  <FiPlus color="#FFFFFF" size={20} className={styles.icon} />
                </button>
              </Link>
            </div>
          </div>

          <div className={styles.contentCard}>
            {infoList.map((item) => (
              <div key={Math.random()} className={styles.card}>
                <img
                  className={styles.imageCard}
                  alt={item.title}
                  src={`http://localhost:3333/files/${item.image}`}
                />
                <p>{item.title}</p>
                <text onClick={() => { navigator.clipboard.writeText(`${item.id}`), toast.success("Id do Curso Copiado!") }}>{item.id}</text>
              </div>
            ))}
          </div>
        </div>
      </div>

      {modalVisibleClasses && (
        <ModalNewClasses
          isOpen={modalVisibleClasses}
          onRequestClose={handleCloseModalClasses}
          infoClasses={modalItemClasses}
        />
      )}

      {modalVisibleStudent && (
        <ModalNewStudent
          isOpen={modalVisibleStudent}
          onRequestClose={handleCloseModalStudent}
          infoClasses={modalItemStudent}
        />
      )}
    </>
  )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get('/myclasses')

  return {
    props: {
      info: response.data
    }
  }
})
