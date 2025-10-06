import { setupAPIClient } from '../../services/api'
import { getStripeJs } from '../../services/stripe-js'

import { canSSRAuth } from '../../utils/canSSRAuth'

import styles from './styles.module.scss'
import Head from 'next/head'

import { BsBox } from 'react-icons/bs'
import { AiOutlineCheck } from 'react-icons/ai'

interface PlanosProps {
    premium: boolean;
}

export default function Payment({ premium }: PlanosProps) {

    const handleMyCourseYearly = async () => {
        try {
            const apiClient = setupAPIClient()
            const response = await apiClient.post('/subscribe/yearly')
            const { sessionId } = response.data
            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId })

        } catch (err) {
            console.log('erro', err)
        }
    }

    const handleMyCourseMonthly = async () => {
        try {
            const apiClient = setupAPIClient()
            const response = await apiClient.post('/subscribe/monthly')
            const { sessionId } = response.data
            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId })

        } catch (err) {
            console.log('erro', err)
        }
    }

    const handleCreatePortal = async () => {
        try {
            if (!premium) {
                return
            }

            const apiClient = setupAPIClient()
            const response = await apiClient.post('/create-portal')

            const { sessionId } = response.data

            window.location.href = sessionId

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
                            {premium ? (
                                <button className={styles.button} style={{ background: "#cecece", color: "#1e1e2a" }} onClick={handleCreatePortal}>ALTERAR ASSINATURA</button>
                            ) : (
                                <button className={styles.button} onClick={handleMyCourseYearly}>MATRICULAR-SE</button>
                            )}
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
                        <div className={styles.boxButton} >
                            {premium ? (
                                <button className={styles.button} style={{ background: "#cecece", color: "#1e1e2a" }} onClick={handleCreatePortal}>ALTERAR ASSINATURA</button>
                            ) : (
                                <button className={styles.button} onClick={handleMyCourseMonthly}>MATRICULAR-SE</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export const getServerSideProps = canSSRAuth(async (ctx) => {
    const apiClient = setupAPIClient(ctx)
    const response = await apiClient.get("/me")

    return {
        props: {
            premium: response.data?.subscriptions?.status === 'active' ? true : false
        }
    }
})