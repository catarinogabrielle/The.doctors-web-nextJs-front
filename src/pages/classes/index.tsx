import { useState, ChangeEvent } from 'react'
import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'
import Link from 'next/link'

import { FiUpload } from 'react-icons/fi'

export default function Classes() {
    const [avatarUrlBanner, setAvatarUrlBanner] = useState('')
    const [imageAvatarBanner, setImageAvatarBanner] = useState(null)
    const [avatarUrlTeacher, setAvatarUrlTeacher] = useState('')
    const [imageAvatarTeacher, setImageAvatarTeacher] = useState(null)

    function handleFileBanner(e: ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return
        }

        const image = e.target.files[0]

        if (!image) {
            return
        }

        if (image.type === 'image/jpeg' || image.type === 'image/png') {

            setImageAvatarBanner(image);
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

        if (image.type === 'image/jpeg' || image.type === 'image/png') {

            setImageAvatarTeacher(image);
            setAvatarUrlTeacher(URL.createObjectURL(e.target.files[0]))
        }
    }

    return (
        <>
            <Head>
                <title>The.Doctors - Aulas</title>
            </Head>

            <Header />
            <div className={styles.container}>
                <main className={styles.content}>
                    <h1>Novo curso</h1>
                    <form className={styles.form}>
                        <input
                            type="text"
                            placeholder="Digite o titulo do curso"
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Descreva sobre o curso..."
                            className={styles.input}
                        />
                        <input
                            type="number"
                            placeholder="Tempo de duração do curso"
                            className={styles.input}
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

                        <h2>Informações sobre o professor</h2>
                        <input
                            type="text"
                            placeholder="Nome do professor"
                            className={styles.input}
                        />
                        <input
                            type="text"
                            placeholder="Função do professor"
                            className={styles.input}
                        />
                        <textarea
                            placeholder="Descrição sobre o professor..."
                            className={styles.input}
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
                                    alt="Banner do curso"
                                    width={250}
                                    height={250}
                                />
                            )}
                        </label>

                        <Link href="/myclasses">
                            <div className={styles.buttonAdd}>
                                <p>Criar Curso</p>
                            </div>
                        </Link>
                    </form>
                </main>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})