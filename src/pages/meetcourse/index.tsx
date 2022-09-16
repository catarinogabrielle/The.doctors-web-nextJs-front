import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'

export default function MeetCourse() {
    return (
        <>
            <Head>
                <title>The.Doctors - Curso</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.boxVideoInfo}>
                        <div className={styles.video}>
                            <img alt="imagem teste" src="/banner1.png" />
                        </div>
                        <div className={styles.class}>
                            <h1>Aulas que serão lecionadas durante o curso</h1>
                            <div className={styles.boxScrollClass}>
                                <div className={styles.infoClass}>
                                    <text>Aulas 1 - Javascript para iniciante</text>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.contentInfoCourse}>
                        <h1>80h de Curso</h1>
                        <h1>Totalmente online</h1>
                        <h1>Material de Apoio</h1>
                        <h1>Certificado de conclusão</h1>
                    </div>

                    <div className={styles.description}>
                        <h1>Descrição</h1>
                        <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo tempor metus at iaculis. Cras lobortis,
                            tortor ac pellentesque placerat, lorem diam tempus arcu, consequat finibus eros nisl ac tortor. Ut volutpat
                            fermentum tortor, in malesuada nisl ornare dignissim. Suspendisse gravida odio in orci suscipit semper. In quis
                            pulvinar magna.
                        </text>
                    </div>

                    <div className={styles.boxTeacher}>
                        <img alt="imagem teste" src="/foto.jpg" />
                        <div className={styles.infoTeacher}>
                            <h1>Gabrielle de castro</h1>
                            <h2>Desenvolvedora Mobile</h2>
                            <text>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra imperdiet est quis aliquet. Nullam luctus dictum urna. Nullam eu nisi commodo, congue lacus sed, elementum urna.
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus viverra imperdiet est quis aliquet. Nullam luctus dictum urna. Nullam eu nisi commodo, congue lacus sed, elementum urna.
                            </text>
                        </div>
                    </div>

                    <button className={styles.button} title="iniciar curso">Iniciar Curso</button>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
        props: {}
    }
})