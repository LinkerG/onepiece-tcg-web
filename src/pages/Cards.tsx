import React, { useEffect } from "react";
import { Suspense, useState } from "react";
import { CardGrid } from "../components/Cards/CardGrid";
import { FilterCardForm } from "../components/Forms/FilterCardForm";
import Header from "../components/Header";
import { CardsQuery } from "@types";
import { useCardQuery, useSetCardQueryFromSearchParams } from "../hooks/useCardSearch";
import CardControl from "../components/Cards/CardControl";

export default function CardBrowserPage() {
    const setQueryFromSearchParams = useSetCardQueryFromSearchParams();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        setQueryFromSearchParams(searchParams);
    }, [])

    return (
        <>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-8 space-y-8 flex-1">
                <h1 className="text-3xl font-bold w-full text-left">Card browser</h1>
                <div className="flex flex-col md:flex-row md:space-x-8 md:h-[calc(100vh-200px)]">
                    <aside className="w-full md:w-1/3 mb-8 md:mb-0">
                        <div className="sticky top-2 2xl:top-6 md:h-full overflow-auto shadow-lg border border-black rounded-lg flex">
                            <FilterCardForm />
                        </div>
                    </aside>
                    <div className="min-w-2/3 w-full md:w-2/3 md:h-full overflow-auto shadow-lg border border-black rounded-lg scrollbar-gutter">
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
    );
}