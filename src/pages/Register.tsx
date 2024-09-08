import React from "react";
import Header from "../components/Header";
import RegisterForm from "../components/Forms/RegisterForm";

export default function RegisterPage() {
    return (
        <>
            <Header />
            <main className="mx-auto max-w-4xl py-8 flex justify-center items-center flex-1">
                <RegisterForm />
                <img
                    className="absolute z-0 opacity-20"
                    src="/images/tcglogo.webp"
                    alt="One Piece TCG Logo"
                    width={800}
                    height={800}
                />
            </main>
        </>
    )
}