import { User, UserCollection } from "@types";
import { apiClient } from "./apiClient";

export async function getUserCollection(user: User): Promise<UserCollection | false> {
    try {
        if (!user.jwt) return false;

        const response = await apiClient.get(`/collection/${user._id}`, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });
        return response.data as UserCollection;

    } catch (err) {
        console.error(err);
        return false

    }
}

export async function saveIntoCollection(user: User, card_id: string, quantity: number): Promise<boolean> {
    try {
        if (!user.jwt) return false;
        console.log(user.jwt);
        const response = await apiClient.put(`/collection/${user._id}/saveCard`,
            {
                "card_id": card_id,
                "quantity": quantity,
            },
            {
                headers: {
                    Authorization: `Bearer ${user.jwt}`
                }
            });
        if (response) return true;
        else return false;

    } catch (err) {
        console.error(err);
        return false

    }
}