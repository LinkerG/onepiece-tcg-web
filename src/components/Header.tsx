import React from "react";
import { Link } from "react-router-dom";
import { useResetUser, useUser } from "../hooks/useUser";

export default function Header() {
    const user = useUser()
    const resetUser = useResetUser();

    function handleLogout() {
        console.log("logging out");
        resetUser();
    }

    return (
        <header className="bg-gradient-to-r from-red-500 to-red-700 text-white shadow-lg flex p-3 z-10">
            <nav className="ml-3">
                <ul className="flex justify-center items-center pt-1">
                    <li className="mr-5">
                        <Link
                            to={
                                user != null ?
                                    // If user is logged, redirect to dashboard
                                    "/dashboard" :
                                    // If user is not logged, redirect to landing page
                                    "/"
                            }
                            className="flex justify-center items-center">
                            <img
                                src='/tcglogo.webp'
                                className="black-to-white"
                                alt="One Piece TCG Logo"
                                width={35}
                                height={35}
                            />
                            <span className="text-white text-2xl ml-3 font-bold hover">One Piece TCG</span>
                        </Link>
                    </li>
                    <li className="px-4">
                        <Link
                            to="/cards"
                            className="text-white text-xl py-2 rounded-md hover:underline transition-all"
                        >
                            Cards
                        </Link>
                    </li>
                    <li className="px-4">
                        <Link
                            to="/collections"
                            className="text-white text-xl py-2 rounded-md hover:underline transition-all"
                        >
                            Collections
                        </Link>
                    </li>
                    {user != null && (
                        <>
                            <li className="h-8 w-1 ml-1 border-l border-gray-300"></li>
                            <li className="px-4">
                                <Link
                                    to="/dashboard/collection"
                                    className="text-white text-xl py-2 rounded-md hover:underline transition-all"
                                >
                                    My collection
                                </Link>
                            </li>
                            <li className="px-4">
                                <Link
                                    to="/dashboard/deck-builder"
                                    className="text-white text-xl py-2 rounded-md hover:underline transition-all"
                                >
                                    Deck builder
                                </Link>
                            </li>
                        </>
                    )}
                    {/* <li className="px-4">
                        <Link
                            href="/play"
                            className="text-white text-xl py-2 rounded-md hover:underline transition-all"
                        >
                            Play
                        </Link>
                    </li> */}
                </ul>
            </nav>
            <div className="ml-auto flex justify-center items-center">
                {user != null ? (
                    <>
                        <p className="">{user.name}</p>
                        <button onClick={() => handleLogout()}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link
                            to="/login"
                            className="text-white text-xl px-4 py-2 rounded-md hover:underline transition-all"
                        >
                            Login
                        </Link>
                        <Link
                            to="/register"
                            className="text-white text-xl px-4 py-2 rounded-md hover:underline transition-all"
                        >
                            Register
                        </Link>
                    </>
                )
                }
            </div>
        </header >
    )
}