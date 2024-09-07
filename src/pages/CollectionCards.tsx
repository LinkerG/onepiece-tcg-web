import React, { Suspense, useEffect } from "react";
import Header from "../components/Header";
import { useParams } from "react-router-dom";
import { CardsQuery } from "@types";
import { useClearCardQuery, useSetCardQuery } from "../hooks/useCardSearch";
import { CardGrid } from "../components/Cards/CardGrid";
import CardControl from "../components/Cards/CardControl";

export default function CollectionCardsPage() {
    const { collectionName } = useParams();
    const setSearchParams = useSetCardQuery()

    const cardsQuery: CardsQuery = { card_id: collectionName }
    useEffect(() => {
        setSearchParams(cardsQuery)
    }, [])

    return (
        <>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-8 space-y-8 flex-1 scrollbar-gutter">
                <h1 className="text-3xl font-bold w-full text-left">{collectionName} cards</h1>
                <div className="flex flex-col md:flex-row md:space-x-8 md:h-[calc(100vh-200px)]">
                    <div className="min-w-2/3 w-full md:h-full overflow-auto shadow-lg border border-black rounded-lg scrollbar-gutter">
                        <Suspense fallback={<div>cargando...</div>}>
                            <CardGrid
                                cardsPerPage={24}
                                maxVisibleButtons={10}
                            />
                        </Suspense>
                    </div>
                </div>
                <CardControl />
            </main>
        </>
    )
}