import { Header } from '../../components/Header/index'
import { canSSRAuth } from '../../utils/canSSRAuth'
import styles from './styles.module.scss'
import Head from 'next/head'

export default function Classes() {
    return (
        <>
            <Head>
                <title>The.Doctors - Aulas</title>
            </Head>

            <Header />

            <div className={styles.container}>
                <div className={styles.content}>
                    <h1>aqui</h1>
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