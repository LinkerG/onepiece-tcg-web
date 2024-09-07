import React, { useEffect, useState } from "react";
import { useCenteredCard } from "../../hooks/useCenteredCard";
import { useUser } from "../../hooks/useUser";
import { getUserCollection, saveIntoCollection } from "../../app/api/collection";
import { User, UserCollection } from "@types";

export function UserCollectionControls() {
    const [userCollection, setUserCollection] = useState<UserCollection | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState<number>(0);
    const centeredCard = useCenteredCard();
    const user = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (!centeredCard || !user) {
                console.log("Falta algo");
                return;
            }
            try {
                const response = await getUserCollection(user as User);
                if (response) {
                    setUserCollection(response);
                } else {
                    alert("Unknown error"); // Mejorar mensaje de error si es necesario
                }
            } catch (error) {
                alert("Error al obtener la colección del usuario");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [centeredCard, user]); // Dependencias para asegurarse de que se actualiza cuando cambian

    useEffect(() => {
        if (userCollection && centeredCard) {
            const cardEntry = userCollection.user_collection.find(entry => entry.card_id === centeredCard.card_id);
            if (cardEntry) {
                setQuantity(cardEntry.quantity);
            } else {
                setQuantity(0); // Si no está en la colección, asegúrate de que la cantidad sea 0
            }
        }
    }, [userCollection, centeredCard]); // Dependencias para actualizar la cantidad cuando cambian

    const handleSetQuantity = (delta: number) => {
        setQuantity(prevQuantity => Math.max(prevQuantity + delta, 0));
    };

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuantity = parseInt(e.target.value, 10);
        if (!isNaN(newQuantity)) {
            setQuantity(newQuantity);
        }
    };

    const handleSaveIntoCollection = async () => {
        try {
            const response = await saveIntoCollection(user as User, centeredCard?.card_id as string, quantity);
            if (response) {
                alert("Carta añadida a la colección");
            } else {
                alert("Error al añadir la carta a la colección");
            }
        } catch (error) {
            alert("Error al añadir la carta a la colección");
        }
    };

    if (!centeredCard || !user) return null;
    if (loading) return <div>Loading...</div>;

    const cardEntry = userCollection?.user_collection?.find(entry => entry.card_id === centeredCard.card_id);

    return (
        <div>
            {cardEntry ? (
                <p>La carta está en tu colección.</p>
            ) : (
                <p>La carta no está en tu colección.</p>
            )}
            <button onClick={() => handleSetQuantity(-1)}>-</button>
            <input
                type="number"
                value={quantity}
                onChange={handleQuantityChange}
                min="0"
            />
            <button onClick={() => handleSetQuantity(1)}>+</button>
            <button onClick={() => handleSaveIntoCollection()}>
                Save
            </button>
        </div>
    );
}
