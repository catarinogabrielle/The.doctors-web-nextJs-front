import { createContext, ReactNode, useState, useEffect } from 'react'

import { api } from '../services/apiClient'

import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

import { toast } from 'react-toastify'

type AuthContextData = {
    user: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignInProps) => Promise<void>;
    signOut: () => void;
    update: () => void;
    signUp: (credentials: SignUpProps) => Promise<void>;
}

type UserProps = {
    id: string;
    name: string;
    email: string;
    type: string;
    mycourse_id: string[];
    stripe_customer_id: String;
}

type SignInProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string;
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut() {
    try {
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    } catch {
        console.log('erro ao deslogar')
    }
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn({ email, password }: SignInProps) {
        try {
            const response = await api.post('/session', {
                email,
                password,
            })

            const { id, name, token, type, mycourse_id, stripe_customer_id } = response.data
            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24 * 30, // expirar em 1 mes
                path: "/" // quais caminhos terao acesso ao cookie
            })

            setUser({
                id,
                name,
                email,
                type,
                mycourse_id,
                stripe_customer_id,
            })

            // passar para proximas requisicoes o nosso token
            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success("Logado com sucesso!")

            // redirecionar o user para /home
            Router.push('/home')

        } catch (err) {
            toast.error("Erro ao acessar!")
            console.log('erro', err)
        }
    }

    async function update() {
        api.get('/me').then(response => {
            const { id, name, email, type, mycourse_id, stripe_customer_id } = response.data

            setUser({
                id,
                name,
                email,
                type,
                mycourse_id,
                stripe_customer_id,
            })

        }).catch(() => {
            // se deu erro deslogar o user
            signOut()
        })
    }

    async function signUp({ name, email, password }: SignUpProps) {
        try {
            const response = await api.post('/users', {
                name,
                email,
                password
            })

            toast.success("Conta criada com sucesso!")

            // redirecionar o user para /login
            Router.push('/')

        } catch (err) {
            toast.error("Erro ao cadastrar!")
            console.log('erro', err)
        }
    }


    useEffect(() => {

        // tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies()

        if (token) {
            update()
        }

    }, [])

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn, signOut, signUp, update }}>
            {children}
        </AuthContext.Provider>
    )
}