import { useState, useEffect } from "react"
import { Header } from "../../components/Header/index"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from "./styles.module.scss"
import Head from "next/head"
import Modal from "react-modal"
import { ThreeDots } from 'react-loader-spinner';

import { setupAPIClient } from "../../services/api"
import { ModalCourses } from "../../components/ModalCourses"

import { FiSearch } from "react-icons/fi"
import { DebounceInput } from "react-debounce-input"

export type ClasseProps = {
  id: string;
  title: string;
  status: boolean;
  draft: boolean;
  material: string;
  description: string;
  myclasse_id: string;
}

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

export interface PlanosProps {
  premium: boolean
}

interface InfoCourses {
  info: CourseProps[];
  premium: PlanosProps[]
}

export type CourseProps = {
  id: string;
  description: string;
  image: string;
  teacherinfo: boolean;
  teachername: string;
  teacherphoto: string;
  teacherwork: string;
  time: string;
  title: string;
  link: string;
  paymentlink: string;
}

export default function Courses({ info, premium }: InfoCourses) {
  const [classes, setClasses] = useState<infoProps[]>()
  const [modalVisible, setModalVisible] = useState(false)
  const [input, setInput] = useState("")
  const [course, setCourse] = useState<CourseProps>()

  const [infoList, setInfoList] = useState(info || [])
  const apiClient = setupAPIClient()

  async function handleMeetCourse(id: string) {
    const response = await apiClient.get("/myclasses/classes", {
      params: {
        myclasse_id: id,
      },
    })

    setClasses(response.data)
    handleOpenModal()
  }

  function handleCloseModal() {
    setModalVisible(false)
  }

  async function handleOpenModal() {
    setModalVisible(true)
  }

  Modal.setAppElement("#__next")

  const handleInputChange = async (event) => {
    setInput(event.target.value)
  }

  const searchCourse = async () => {
    await apiClient.get(`/myclasses/search?title=${input}`).then((res) => {
      setInfoList(res.data)
    })
  }

  useEffect(() => {
    searchCourse()
  }, [input])

  return (
    <>
      <Head>
        <title>The.Doctors - Cursos</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.boxTitle}>
            <h1>Novos Cursos</h1>
            <div className={styles.boxInput}>
              <DebounceInput
                debounceTimeout={500}
                placeholder="Pesquisar curso"
                onChange={handleInputChange}
              />
              <button className={styles.buttonSearch} title="pesquisar">
                <FiSearch
                  className={styles.icon}
                  size={20}
                  onClick={() => searchCourse()}
                />
              </button>
            </div>
          </div>
          {infoList ? (
            <div className={styles.boxCard}>
              {infoList.map((item) => (
                <div
                  key={item.id}
                  className={styles.card}
                  onClick={() => {
                    handleMeetCourse(item.id)
                    setCourse(item)
                  }}
                >
                  <img
                    className={styles.imageCard}
                    alt={item.title}
                    src={`${process.env.API_URL}/files/${item.image}`}
                  />
                  <div className={styles.descriptionCard}>
                    <p>{item.title}</p>
                    <div className={styles.course}>
                      <p>Curso Online</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.contentMenulLoader}>
              <ThreeDots
                height="88"
                width="88"
                radius="9"
                color='#10b2aa'
                ariaLabel='three-dots-loading'
              />
            </div>
          )}
        </div>
      </div>

      {modalVisible && (
        <ModalCourses
          isOpen={modalVisible}
          onRequestClose={handleCloseModal}
          course={course}
          infoClasses={classes}
          premium={premium}
        />
      )}
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const response = await apiClient.get("/myclasses")
  const responseMe = await apiClient.get("/me")

  return {
    props: {
      info: response.data,
      premium: responseMe.data?.subscriptions?.status === 'active' ? true : false,
    },
  }
})
