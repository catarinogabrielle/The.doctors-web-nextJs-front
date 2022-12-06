import { useState } from "react";
import { Header } from "../../components/Header/index";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from "./styles.module.scss";
import Head from "next/head";
import Link from "next/link";

import { setupAPIClient } from "../../services/api";

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
};

interface infoCourses {
  info: infoProps[];
}

export default function MyCourses({ info }: infoCourses) {
  const [myCourses, setMyCourses] = useState(info || []);

  return (
    <>
      <Head>
        <title>The.Doctors - Meus Cursos</title>
      </Head>

      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <h1>Meus Cursos</h1>
          <div className={styles.boxCard}>
            {myCourses.map((course) => (
              <Link key={Math.random()} href={`/classroom?id=${course.id}`}>
                <div className={styles.card}>
                  <img
                    className={styles.imageCard}
                    alt={course.title}
                    src={`http://localhost:3333/files/${course.image}`}
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
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const apiClient = setupAPIClient(ctx);

  const allCourses = await apiClient.get("/myclasses");
  const user = await apiClient.get("/me");
  const myCourses = [];

  allCourses.data.forEach((course) => {
    user.data.mycourse_id.forEach((myCourseId) => {
      if (course.id === myCourseId) myCourses.push(course);
    });
  });

  return {
    props: {
      info: myCourses,
    },
  };
});
