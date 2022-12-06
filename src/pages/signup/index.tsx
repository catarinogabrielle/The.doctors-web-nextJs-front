import { useContext, FormEvent, useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.png';

import { Input } from '../../components/ui/Input/index'
import { Button } from '../../components/ui/Button/index'

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link'

export default function SignUp() {
    const { signUp } = useContext(AuthContext)

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [loading, setLoading] = useState(false)

    async function handleSignUp(event: FormEvent) {
        event.preventDefault();

        if (name === '' || email === '' || password === '') {
            toast.warning("Preencha todos os campos!")
            return
        }

        setLoading(true)

        let data = {
            name,
            email,
            password
        }

        await signUp(data)

        setLoading(false)
    }

    return (
        <>
            <Head>
                <title>Faça seu cadastro agora!</title>
            </Head>

            <div className={styles.containerCenter}>
                <Image width="350" height="90" src={logoImg} alt="logo community" />

                <div className={styles.login}>
                    <p>Criando sua conta</p>

                    <form onSubmit={handleSignUp}>
                        <Input
                            placeholder="Digite seu usuário"
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <Input
                            placeholder="Digite seu email"
                            type="text"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            placeholder="Sua senha"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <Button
                            type="submit"
                            loading={loading}
                        >
                            Cadastrar
                        </Button>
                    </form>

                    <Link href="/">
                        <a className={styles.text}>Já possui uma conta? Faça login!</a>
                    </Link>
                </div>
            </div>
        </>
    )
}
