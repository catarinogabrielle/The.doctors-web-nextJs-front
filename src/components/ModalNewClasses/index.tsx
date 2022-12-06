import React from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import Modal from "react-modal";
import styles from "./styles.module.scss";

import { FiX, FiUpload } from "react-icons/fi";

import { setupAPIClient } from "../../services/api";
import { InfoProps } from "../../pages/myclasses";
import { toast } from "react-toastify";

import { Provider, connect } from "react-redux";
import store from "../../store/index";

import { searchVideo } from "../../store/actions/searchAC";

import { FiSearch } from "react-icons/fi";
import { DebounceInput } from "react-debounce-input";

interface ModalNewClassesProps {
  isOpen: boolean;
  onRequestClose: () => void;
  infoClasses: InfoProps[];
}

export function ModalNewClasses({
  isOpen,
  onRequestClose,
  infoClasses,
}: ModalNewClassesProps) {
  var modalStyles = { overlay: { zIndex: 10, background: "#41413f81" } };

  const [uploadedFiles, setUploadedFiles] = useState("");
  const [fileAvatar, setFileAvatar] = useState(null);
  const [infoClassesSelected, setInfoClassesSelected] = useState(0);
  const [input, setInput] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  async function handleRegister(event: FormEvent) {
    event.preventDefault();

    try {
      const data = new FormData();

      if (title === "" || description === "" || fileAvatar === null) {
        toast.warning("Preencha todos os campos!");
        return;
      }

      data.append("title", title);
      data.append("description", description);
      data.append("material", fileAvatar);
      data.append("myclasse_id", infoClasses[infoClassesSelected].id);

      const apiClient = setupAPIClient();

      await apiClient.post("/classes", data);

      toast.success("Aula cadastrada com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Ops erro ao cadastrar a aula!");
    }

    setTitle("");
    setDescription("");
    setFileAvatar(null);
    setUploadedFiles("");
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    const chosenFiles = Array.prototype.slice.call(e.target.files);
    const files = e.target.files[0];

    if (!chosenFiles) {
      return;
    }

    setFileAvatar(files);
    setUploadedFiles(chosenFiles.map((item) => item.name));
  }

  function handleChangeClasses(event) {
    setInfoClassesSelected(event.target.value);
  }

  function handleInputChange() {
    searchVideo(input);
  }

  return (
    <Provider store={store}>
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
            <select value={infoClassesSelected} onChange={handleChangeClasses}>
              {infoClasses.map((item, index) => {
                return (
                  <option key={Math.random()} value={index}>
                    {item.title}
                  </option>
                );
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

            <div className={styles.boxInput}>
              <DebounceInput
                className={styles.inputSearch}
                debounceTimeout={500}
                placeholder="Pesquisar curso"
                onChange={(event) => setInput(event.target.value)}
              />
              <div
                onClick={handleInputChange}
                className={styles.buttonSearch}
                title="pesquisar"
              >
                <FiSearch className={styles.icon} size={20} />
              </div>
            </div>

            <button className={styles.buttonAdd} type="submit">
              <p>Adicionar Aula</p>
            </button>
          </form>
        </main>
      </Modal>
    </Provider>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    searchVideo: (params) => dispatch(searchVideo(params)),
  };
};

export default connect(null, mapDispatchToProps)(ModalNewClasses);
