import React, { Suspense } from "react";
import Header from "../components/Header";
import CardCollections from "../components/Collections/CardCollections";
import { useClearCardQuery } from "../hooks/useCardSearch";

export default function CollectionsPage() {
    const resetSearchParams = useClearCardQuery()
    resetSearchParams()
    return (
        <>
            <Header />
            <main className="mx-auto max-w-6xl px-4 py-8 space-y-8 flex-1 scrollbar-gutter">
                <h1 className="text-3xl font-bold w-full text-left">Collections</h1>
                <Suspense>
                    <CardCollections />
                </Suspense>
            </main>
        </>
    )
}