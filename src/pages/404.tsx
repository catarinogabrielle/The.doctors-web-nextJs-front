// pages/404.js
import Link from 'next/link';

export default function Custom404() {
  return (
    <div>
      <h1>404 - Página Não Encontrada</h1>
      <p>A página que você está procurando não existe.</p>
      <Link href="/">
        <a>Voltar para a página inicial</a>
      </Link>
    </div>
  );
}