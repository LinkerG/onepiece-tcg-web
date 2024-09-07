import { Card, CardsQuery } from "@types";
import { apiClient } from "./apiClient";

export async function getAllCards(parameters?: CardsQuery): Promise<Card[]> {
    const queryParams = new URLSearchParams();

    if (parameters) {
        // Itera sobre los parámetros y añádelos a la query si existen
        if (parameters.card_id) queryParams.append('card_id', parameters.card_id);
        if (parameters.name) queryParams.append('name', parameters.name);
        if (parameters.rarity) queryParams.append('rarity', parameters.rarity);
        if (parameters.type) queryParams.append('type', parameters.type);

        // Añadir arrays como parámetros de consulta
        if (parameters.attribute && parameters.attribute.length > 0) {
            parameters.attribute.map(attribute => queryParams.append('attribute', attribute))
        }
        if (parameters.color && parameters.color.length > 0) {
            parameters.color.map(color => queryParams.append('color', color))
        }
        if (parameters.card_type && parameters.card_type.length > 0) {
            parameters.card_type.map(card_type => queryParams.append('card_type', card_type))
        }
    }

    const url = `/card${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    console.log(url);

    try {
        const response = await apiClient.get(url);
        return response.data;
    } catch (err) {
        return []
    }

}

export async function getCollections(): Promise<string[]> {
    try {
        const response = await apiClient.get("/card/collections");
        return response.data;
    } catch (err) {
        return []
    }
}