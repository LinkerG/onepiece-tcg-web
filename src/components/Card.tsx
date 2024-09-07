import React from 'react';
import { Card as TCard } from '@types';
import Tilt from 'react-parallax-tilt';

interface Props {
    card: TCard;
    shadow?: boolean;
    setCenteredCard?: (params: any) => void;
}

export function CardTiltable({ card, shadow, setCenteredCard }: Props) {
    return (
        <Tilt
            glareEnable={true}
            glareMaxOpacity={0.4}
            glareColor="lightblue"
            glarePosition="all"
        >
            <img
                src={`/cards/${card.card_id.split("-")[0]}/${card.card_id}.png`}
                alt={card.card_id}
                className={`
                    w-full h-auto object-contain rounded-lg select-none
                    ${shadow ? 'shadow-lg' : ''}
                    `}
                loading="lazy"
                onClick={() => setCenteredCard && setCenteredCard(card)}
                width={100}
                height={100}
            />
        </Tilt>
    );
}

export function Card({ card, shadow, setCenteredCard }: Props) {
    return (
        <img
            src={`/cards/${card.card_id.split("-")[0]}/${card.card_id}.png`}
            alt={card.card_id}
            className={`
                w-full h-auto object-contain rounded-lg select-none
                ${shadow ? 'shadow-lg' : ''}
                `}
            loading="lazy"
            onClick={() => setCenteredCard && setCenteredCard(card)}
        />
    )
}