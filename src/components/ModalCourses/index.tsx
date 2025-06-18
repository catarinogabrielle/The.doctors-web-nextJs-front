import Modal from "../ModalWrapper"; // <- wrapper JSX
import { default as ReactModal } from "react-modal"; // <- módulo original para usar setAppElement
import styles from "./styles.module.scss";

import { FiX } from "react-icons/fi";
import { CourseProps, PlanosProps, infoProps } from "../../pages/courses";
import { setupAPIClient } from "../../services/api";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: infoProps[];
  course: CourseProps;
  premium: PlanosProps[];
}

export const ModalCourses: React.FC<ModalNewClassesProps> = ({
  isOpen,
  onRequestClose,
  infoClasses,
  course,
  premium,
}) => {
  const modalStyles = {
    overlay: { zIndex: 10, background: "#41413f81" },
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      ReactModal.setAppElement("#__next"); // <- aqui está o fix
    }
  }, []);

  const [registered, setRegistered] = useState(false);
  const { user } = useContext(AuthContext);
  const apiClient = setupAPIClient();

  const [values] = useState({
    email: user.email,
    name: user.name,
    courseName: course.title,
    paymentlink: course.paymentlink,
  });

  const handleMyCourse = async () => {
    try {
      await apiClient.put("/users/update", {
        courseId: course.id,
        userId: user.id,
      });
      setRegistered(true);
      onRequestClose();
    } catch (err) {
      console.log("erro", err);
    }
  };

  const sendEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      toast.success(`Foi enviado um email para ${user.email}`);
    } catch (err) {
      toast.error("Erro ao enviar!");
      console.log("erro", err);
    }
  };

  const checkCourseIncription = async () => {
    try {
      const response = await apiClient.get("/me");
      const { mycourse_id } = response.data;

      if (mycourse_id.includes(course.id)) {
        setRegistered(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkCourseIncription();
  }, []);

  const src = course.link;

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
              {infoClasses.map((item, index) => (
                <div key={index} className={styles.infoClass}>
                  <text>{item.title}</text>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.contentInfoCourse}>
          <h1>{course.time} Horas</h1>
          <h1>Totalmente online</h1>
          <h1>Material de Apoio</h1>
          <h1>Certificado de conclusão</h1>
        </div>

        <div className={styles.description}>
          <h1>Descrição</h1>
          <text>{course.description}</text>
        </div>

        <div className={styles.boxTeacher}>
          <img
            alt={course.title}
            src={`${process.env.API_URL}/files/${course.teacherphoto}`}
          />
          <div className={styles.infoTeacher}>
            <h1>{course.teachername}</h1>
            <h2>{course.teacherwork}</h2>
            <text>{course.teacherinfo}</text>
          </div>
        </div>

        {!registered && (
          <button onClick={sendEmail} className={styles.button}>
            Iniciar Curso
          </button>
        )}
      </div>
    </Modal>
  );
};
