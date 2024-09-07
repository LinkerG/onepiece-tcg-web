import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCollections } from "../../app/api/cards";
import { ImageWithFallback } from "../ImageWithFallback";

export default function CardCollections() {
    const [boosterPacks, setBoosterPacks] = useState<string[]>([]);
    const [starterPacks, setStarterPacks] = useState<string[]>([]);

    useEffect(() => {
        const fetchCollections = async () => {
            const collections = await getCollections();
            setBoosterPacks(collections.filter(collection => collection.startsWith("EB") || collection.startsWith("OP")));
            setStarterPacks(collections.filter(collection => collection.startsWith("ST")));
        };

        fetchCollections();
    }, []); // Empty dependency array means this will only run once after initial render

    return (
        <>
            <h2 className="font-semibold text-xl">Booster Packs</h2>
            <div className="flex w-full overflow-x-auto shadow-xl border border-black rounded-lg">
                {boosterPacks.map(collection => (
                    <div key={collection} className="m-5 min-w-40">
                        <Link to={`/collections/${collection}`} className="w-full">
                            <ImageWithFallback
                                className="object-contain w-full"
                                src={`/collections/${collection}.png`}
                                fallback="/collections/OP_EB_DEFAULT.png"
                                alt={collection}
                            />
                        </Link>
                        <p className="text-center font-semibold text-xl">{collection}</p>
                    </div>
                ))}
            </div>

            <h2 className="font-semibold text-xl">Starter Packs</h2>
            <div className="flex w-full overflow-x-auto shadow-xl border border-black rounded-lg">
                {starterPacks.map(collection => (
                    <div key={collection} className="m-5 min-w-40">
                        <Link to={`/collections/${collection}`} className="w-full">
                            <ImageWithFallback
                                className="object-contain w-full"
                                src={`/collections/${collection}.png`}
                                fallback="/collections/ST_DEFAULT.png"
                                alt={collection}
                                width={1000}
                                height={1000}
                            />
                        </Link>
                        <p className="text-center font-semibold text-xl">{collection}</p>
                    </div>
                ))}
            </div>

            <h2 className="font-semibold text-xl">Other collections</h2>
            <div className="flex w-full overflow-x-auto shadow-xl border border-black rounded-lg">
                <div key="P" className="m-5 min-w-40 max-w-40 w-40">
                    <Link to={`/collections/P`} className="w-full">
                        <ImageWithFallback
                            className="object-contain w-full"
                            src={`/collections/PROMO.png`}
                            fallback="/collections/OP_EB_DEFAULT.png"
                            alt="PROMO"
                        />
                    </Link>
                    <p className="text-center font-semibold text-xl">Promotional</p>
                </div>
                <div key="DON" className="m-5 min-w-40 max-w-40 w-40">
                    <Link to={`/collections/DON`} className="w-full">
                        <ImageWithFallback
                            className="object-contain w-full"
                            src={`/collections/DON.png`}
                            fallback="/collections/OP_EB_DEFAULT.png"
                            alt="DON"
                        />
                    </Link>
                    <p className="text-center font-semibold text-xl">DON!</p>
                </div>
            </div>
        </>
    );
}
