import { useState } from "react"
import { Header } from "../../components/Header/index"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from "./styles.module.scss"
import Head from "next/head"
import Link from "next/link"

import { setupAPIClient } from "../../services/api"

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
  premium: boolean;
}

export default function MyCourses({ info, premium }: infoCourses) {
  const [myCourses, setMyCourses] = useState(info || [])

  return (
    <>
      <Head>
        <title>The.Doctors - Meus Cursos</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Meus Cursos</h1>
          {myCourses.length === 0 ? (
            <div className={styles.contentLength}>
              <h2>Você não possui cursos!</h2>
            </div>
          ) : (
            <div className={styles.boxCard}>
              {myCourses.map((course) => (
                <Link key={Math.random()} href={`/classroom?id=${course.id}`}>
                  <div className={styles.card}>
                    <img
                      className={styles.imageCard}
                      alt={course.title}
                      src={`https://thdacademy.com:8443/files/${course.image}`}
                    />
                    <div className={styles.descriptionCard}>
                      <p>{course.title}</p>
                      <div className={styles.course}>
                        <p>Curso Online</p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx)

  const allCourses = await apiClient.get("/myclasses")
  const user = await apiClient.get("/me")
  const myCourses = []

  console.log(user.data.mycourse_id)

  allCourses.data.forEach((course) => {
    user.data.mycourse_id.forEach((myCourseId) => {
      if (course.id === myCourseId) myCourses.push(course)
    })
  })

  return {
    props: {
      info: myCourses,
      premium: user.data?.subscriptions?.status === 'active' ? true : false
    },
  }
})
