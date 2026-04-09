// pages/404.js
import Link from 'next/link';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Página Não Encontrada</title>
      </Head>
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4">
        <h1 className="font-display text-6xl lg:text-8xl font-bold text-gold mb-4">404</h1>
        <div className="gold-line w-20 mb-6" />
        <p className="text-white/50 text-lg mb-8 text-center max-w-md">
          A página que você está procurando não existe ou foi movida.
        </p>
        <Link href="/">
          <a className="shimmer inline-flex items-center justify-center gap-2 text-white font-semibold px-8 py-3 rounded-lg text-sm transition-all hover:scale-105 hover:shadow-lg hover:shadow-[oklch(0.55_0.22_20/0.3)]">
            Voltar para a página inicial
          </a>
        </Link>
      </div>
    </>
  );
}