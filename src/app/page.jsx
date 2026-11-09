import { ACESSO } from '@/lib/acesso';
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Link from 'next/link';

export default async function Home() {
    const user = await currentUser();

    const rotas = Object.keys(ACESSO).filter((rota) =>
        ACESSO[rota].includes(user?.publicMetadata.role),
    );
    return (
        <main className='card'>
            {!user ? (
                <>
                    <h1>faça login </h1>
                    <SignInButton mode='modal'>Entrar</SignInButton>
                    <SignUpButton mode='modal'>Criar a sua conta</SignUpButton>
                </>
            ) : (
                <>
                    <UserButton appearance={{
                        elements: { userButtonAvatarBox: { width: 150, height: 150 } }
                    }}
                    />
                    <h1>{rotas.length ?'escolha seu acesso':'Sem acesso'}</h1>
                    {rotas.map((rota)=>(
                        <Link key={rota} className='btn' href={`/${rota}`}>{rota}</Link>
                    ))}
                </>
            )}
        </main>
    )
}