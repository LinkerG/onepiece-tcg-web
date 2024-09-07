import React from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../../app/api/auth'
import { useSetRememberUser, useSetUser } from '../../hooks/useUser'

export default function RegisterForm() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [remember, setRemember] = useState(false)

    const setRememberUser = useSetRememberUser()
    const setUser = useSetUser()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const formData = { name, email, password };
        const result = await register(name, email, password)
        if (result) {
            if (remember) {
                setRememberUser(result)
            } else {
                setUser(result)
            }
        } else {
            alert("invalid credentials")
        }
    }

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1)
    };

    return (
        <form onSubmit={handleSubmit}
            className='rounded-2xl md:border p-10 bg-white md:bg-gray-50 mb-5 z-10'
        >
            <img
                className='mt-2 mb-6'
                src="/logo.png"
                alt="One Piece TCG Logo"
            />
            <div className="mb-6">
                <label htmlFor="name" className="block mb-2 text-md font-medium text-gray-900">Name</label>
                <input type="text" id="name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
            </div>
            <div className="mb-6">
                <label htmlFor="email" className="block mb-2 text-md font-medium text-gray-900">Email</label>
                <input type="email" id="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                />
            </div>
            <div className="mb-6">
                <label htmlFor="password" className="block mb-2 text-md font-medium text-gray-900">Password</label>
                <input type="password" id="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                />
            </div>
            <div>
                <p id="helper-text-explanation"
                    className="mt-2 mb-6 text-sm text-gray-500"
                >
                    {"Already have an account? "} {/** Esto es un template string porque el linter no deja un espacio al final de la linea */}
                    <Link to="/login" className="font-medium text-blue-600 hover:underline">Log in!</Link>
                </p>
            </div>
            <div className='flex justify-between items-center'>
                <button type="submit"
                    className="w-1/2 focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:bg-red-700 focus:ring-red-600 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                    Register
                </button>
                <button onClick={goBack}
                    className="w-1/2 text-center focus:outline-none text-gray-700 border bg-white hover:bg-gray-100 focus:ring-2 focus:bg-gray-200 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
                >
                    Go back
                </button>
            </div>
        </form>
    )
}