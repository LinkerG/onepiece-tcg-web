import React from "react";
import Header from "../components/Header";
import LoginForm from "../components/Forms/LoginForm";

export default function Login() {
    return (
        <>
            <Header />
            <main className="mx-auto max-w-4xl py-8 flex justify-center items-center flex-1">
                <LoginForm />
                <img
                    className="absolute z-0 opacity-20"
                    src="/tcglogo.webp"
                    alt="One Piece TCG Logo"
                    width={800}
                    height={800}
                />
            </main>
        </>
    )
}