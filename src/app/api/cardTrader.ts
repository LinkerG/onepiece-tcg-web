import { Card } from "@types";
import { cardTraderApiClient } from "./apiClient";

export type CardTraderExpansion = {
    id: string;
    game_id: number;
    code: string;
    name: string;
}

export async function getCardTraderPrices(card_id: string): Promise<number | false> {
    try {
        const response = await cardTraderApiClient.get(`/expansions`);
        if (!response) throw new Error("error getting expansions response");
        const responseData: CardTraderExpansion[] = response.data;
        const onePieceExpansions = responseData.filter(expansion => expansion.game_id === 15)

        console.log(onePieceExpansions);

        const expansionsQuery = new URLSearchParams();
        onePieceExpansions.forEach(expansion => {
            expansionsQuery.append("expansion_id", expansion.id);
        })

        console.log(expansionsQuery.toString());

        return 1
    } catch (err) {
        console.error(err);
        return false;
    }
}