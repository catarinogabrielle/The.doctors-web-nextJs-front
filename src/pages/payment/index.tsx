import { setupAPIClient } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

import { canSSRAuth } from '../../utils/canSSRAuth'

import styles from './styles.module.scss'
import Head from 'next/head'

import { BsBox } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'

export default function Payment() {
    const handleMyCourse = async () => {
        try {
            const apiClient = setupAPIClient()
            const response = await apiClient.post('/subscribe')
            console.log(response)
            const { sessionId } = response.data
            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId })

        } catch (err) {
            console.log('erro', err)
        }
    }

    return (
        <>
            <Head>
                <title>The.Doctors - Matricule-se já</title>
            </Head>

            <div className={styles.container}>
                <div className={styles.content}>
                    <div className={styles.card}>
                        <div className={styles.boxInfo}>
                            <BsBox color="#10b2aa" size={38} />
                            <h1>ANUAL</h1>

                            <div className={styles.boxValue}>
                                <text>12X<strong>R$120</strong></text>
                                <p>à vista R$1.440</p>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Acesso a TODOS os cursos da plataforma</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Certificado</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>The Doctors Língua (incluindo curso Inglês)</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>The Doctors Challenges</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Materiais para estudo</text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxButton}>
                            <button className={styles.button} onClick={handleMyCourse}>MATRICULAR-SE</button>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.boxInfo}>
                            <BsBox color="#10b2aa" size={38} />
                            <h1>MENSAL</h1>

                            <div className={styles.boxValue}>
                                <text>12X<strong>R$120</strong></text>
                                <p>à vista R$1.440</p>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Acesso a TODOS os cursos da plataforma</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Certificado</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>The Doctors Língua (incluindo curso Inglês)</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>The Doctors Challenges</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Materiais para estudo</text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxButton}>
                            <button className={styles.button} onClick={handleMyCourse}>MATRICULAR-SE</button>
                        </div>
                    </div>

                    <div className={styles.card}>
                        <div className={styles.boxInfo}>
                            <BsBox color="#10b2aa" size={38} />
                            <h1>VALOR DO CURSO</h1>

                            <div className={styles.boxValue}>
                                <text>12X<strong>R$120</strong></text>
                                <p>à vista R$1.440</p>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Certificado</text>
                                </div>
                            </div>

                            <div className={styles.boxDescription}>
                                <AiOutlineCheck color="#10b2aa" size={18} />
                                <div className={styles.description}>
                                    <text>Materiais para estudo</text>
                                </div>
                            </div>
                        </div>

                        <div className={styles.boxButton}>
                            <button className={styles.button} onClick={handleMyCourse}>MATRICULAR-SE</button>
                        </div>
                    </div>
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