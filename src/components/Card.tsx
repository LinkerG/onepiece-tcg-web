import React from 'react';
import { Card as TCard } from '@types';
import Tilt from 'react-parallax-tilt';
import { useSetCenteredCard } from '../hooks/useCenteredCard';

interface Props {
    card: TCard;
    shadow?: boolean;
    centerCard?: boolean
}

export function CardTiltable({ card, shadow, centerCard }: Props) {
    const setCenteredCard = useSetCenteredCard();

    function handleCardClick(card: TCard) {
        if (centerCard) {
            setCenteredCard(card)
        }
    }

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
                width={100}
                height={100}
                onClick={() => handleCardClick(card)}
            />
        </Tilt>
    );
}

export function Card({ card, shadow, centerCard }: Props) {
    const setCenteredCard = useSetCenteredCard();

    function handleCardClick(card: TCard) {
        if (centerCard) {
            setCenteredCard(card)
        }
    }

    return (
        <img
            src={`/cards/${card.card_id.split("-")[0]}/${card.card_id}.png`}
            alt={card.card_id}
            className={`
                w-full h-auto object-contain rounded-lg select-none
                ${shadow ? 'shadow-lg' : ''}
                `}
            loading="lazy"
            onClick={() => handleCardClick(card)}
        />
    )
}