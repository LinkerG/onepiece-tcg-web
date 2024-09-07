import React from "react";
import { Card } from "../Card";
import { Card as TCard, User } from "@types"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCenteredCard, useResetCenteredCard } from "../../hooks/useCenteredCard";
import { useUser } from "../../hooks/useUser";
import { UserCollectionControls } from "./UserCollectionControls";

export default function CardControl() {
    const centeredCard = useCenteredCard();
    const user = useUser();
    const resetCenteredCard = useResetCenteredCard()

    function close(e: any) {
        if (e.target.classList.contains("full-screen")) {
            resetCenteredCard()
        }
    }

    if (centeredCard)
        return (
            <div className="full-screen flex items-center justify-center" onClick={(e) => close(e)}>
                <div className="
                    mx-auto max-w-6xl w-full h-100 bg-gray-100 rounded-lg shadow-xl px-4 py-8 z-50
                    flex flex-row justify-center
                "
                >
                    <div className="w-1/3 h-100 flex justify-center items-center">
                        <Card
                            card={centeredCard}
                        />
                    </div>
                    <div className="w-2/3 h-100 flex flex-col wrap">
                        <div className="w-full h-1/2 flex items-center justify-center">
                            {/* card trader info */}
                        </div>
                        <div className="w-full h-1/2 flex items-center justify-center">
                            {user ? (
                                <UserCollectionControls />
                            ) : (
                                <p className="text-2xl"><Link to="/login" className="text-blue-500">Log in</Link> to keep track of your collection</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        )
    else return null
}