import React, { Fragment, useEffect, useState } from 'react';
import config from '../app/config';
import { getCardTraderPrices } from '../app/api/cardTrader';

export default function PruebasCardTrader() {
    const [expansions, setExpansions] = useState<any>([]);
    useEffect(() => {
        const fetchGames = async () => {
            await getCardTraderPrices("OP01-001")
            const response = await fetch('https://api.cardtrader.com/api/v2/expansions', {
                headers: {
                    Authorization: `Bearer ${config.CARD_TRADER_TOKEN}`

                }
            });
            if (response.ok) {
                const jsonData = await response.json();
                const OnePieceExpansions = jsonData.filter((expansion: { game_id: number; }) => expansion.game_id === 15)
                setExpansions(OnePieceExpansions);
                //console.log(OnePieceExpansions);
            } else {
                console.error("XD");
            }
        }
        fetchGames()
    }, [])

    return (
        <Fragment>
            <h1>Test</h1>
        </Fragment>
    )
}