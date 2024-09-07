import { User } from "@types";
import { apiClient } from "./apiClient";
import { useSetUser, useSetRememberUser } from "../../hooks/useUser";

export async function login(email: string, password: string): Promise<User | false> {
    try {
        const response = await apiClient.post(`/auth/login`, {
            email: email,
            password: password,
        })

        const user: User = {
            ...response.data.user,
            jwt: response.data.token
        }

        return user;

    } catch (err) {
        console.error(err);
        return false;
    }
}

export async function register(name: string, email: string, password: string): Promise<User | false> {
    try {
        const response = await apiClient.post(`/auth/signup`, {
            name: name,
            email: email,
            password: password,
        })

        const user: User = {
            ...response.data.user,
            jwt: response.data.token
        }

        return user;

    } catch (err) {
        console.error(err);
        return false;
    }
}