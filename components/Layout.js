import React from 'react';
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

const Layout = ({children, title}) => {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content="Generated by create next app"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <header className="bg-slate-900 py-10 mb-10">
                <Link href="/">
                    <a>
                        <h1 className="capitalize text-6xl text-center text-amber-400">{title}</h1>
                    </a>
                </Link>
            </header>

            <main className="container mx-auto">
                {children}
            </main>

            <footer className="flex justify-center items-center mt-10 mb-5">
                <a
                    className="flex flex-col items-center"
                    href="https://web-portfolio-ten.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"   
                >
                Powered by{' '}
                    <Image src="/favicon_io/apple-touch-icon.png" alt="Dylan Wang" width= {40} height= {40} layout="fixed"/>
                </a>
            </footer>
        </div>
    );
};

export default Layout;