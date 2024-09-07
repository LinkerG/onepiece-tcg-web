import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CardTiltable } from '../Card';
import { getAllCards } from '../../app/api/cards';
import { useCardQuery } from '../../hooks/useCardSearch';
import { Card } from '@types';

interface Props {
    cardsPerPage: number;
    maxVisibleButtons: number;
}

export function CardGrid({ cardsPerPage, maxVisibleButtons }: Props) {
    const [cards, setCards] = useState<Card[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);

    const location = useLocation();
    const navigate = useNavigate();
    const params = useCardQuery();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const page = queryParams.get('page');
        const pageNumber = page ? parseInt(page, 10) : 1;
        setCurrentPage(pageNumber);
    }, [location.search]);

    useEffect(() => {
        const fetchCards = async () => {
            const fetchedCards = await getAllCards(params);
            setCards(fetchedCards);
            setTotalPages(Math.ceil(fetchedCards.length / cardsPerPage));
        };

        fetchCards();
    }, [params, cardsPerPage]);

    useEffect(() => {
        if (currentPage > totalPages) {
            navigate('?page=1');
        }
    }, [currentPage, totalPages, navigate]);

    const indexOfLastCard = currentPage * cardsPerPage;
    const indexOfFirstCard = indexOfLastCard - cardsPerPage;
    const currentCards = cards.slice(indexOfFirstCard, indexOfLastCard);

    const renderPageButtons = () => {
        const buttons = [];
        let startPage = Math.max(currentPage - Math.floor(maxVisibleButtons / 2), 1);
        let endPage = Math.min(startPage + maxVisibleButtons - 1, totalPages);

        if (endPage - startPage + 1 < maxVisibleButtons) {
            startPage = Math.max(endPage - maxVisibleButtons + 1, 1);
        }

        // Botón para la primera página
        if (startPage > 1) {
            buttons.push(
                <button
                    key="first"
                    onClick={() => goToPage(1)}
                    className="w-10 focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:bg-red-700 focus:ring-red-600 font-medium rounded-l-lg text-sm px-3 py-2.5"
                >
                    1
                </button>
            );
            if (startPage > 2) {
                buttons.push(
                    <span key="ellipsis-start" className="px-3 w-10 py-2.5 text-sm text-center bg-gray-300 text-gray-600">
                        ...
                    </span>
                );
            }
        }

        // Botones de página
        for (let i = startPage; i <= endPage; i++) {
            buttons.push(
                <button
                    key={i}
                    onClick={() => goToPage(i)}
                    className={`w-10 focus:outline-none px-3 py-2.5 text-sm ${i === currentPage
                        ? 'bg-red-700 text-white'
                        : 'bg-red-500 text-white hover:bg-red-600'
                        }
                        ${i === 1 && 'rounded-l-lg'}
                        ${i === totalPages && 'rounded-r-lg'}
                    `}
                >
                    {i}
                </button>
            );
        }

        // Botón para la última página
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                buttons.push(
                    <span key="ellipsis-end" className="w-10 px-3 py-2.5 text-sm text-center bg-gray-300 text-gray-600">
                        ...
                    </span>
                );
            }
            buttons.push(
                <button
                    key="last"
                    onClick={() => goToPage(totalPages)}
                    className="w-10 focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-2 focus:bg-red-700 focus:ring-red-600 font-medium rounded-r-lg text-sm px-3 py-2.5"
                >
                    {totalPages}
                </button>
            );
        }

        return buttons;
    };

    // Función para manejar la actualización de la página en la URL
    const goToPage = (page: number) => {
        // Asegurarse de que la página esté dentro de los límites
        const validPage = Math.min(Math.max(page, 1), totalPages);
        // Actualiza el parámetro de la URL
        navigate(`?page=${validPage}`);
    };

    if (cards.length === 0) {
        return <p className="text-center text-gray-500">No se encontraron cartas con los criterios de búsqueda especificados.</p>;
    }

    return (
        <>
            <div className="m-2 p-2 flex justify-center items-center z-10 bg-white bg-opacity-80 sticky top-2 rounded">
                {renderPageButtons()}
            </div>
            <section className="flex flex-wrap justify-start w-full">
                {currentCards.map((card) => (
                    <div key={card.card_id} className="p-3 w-1/2 md:w-1/3 lg:w-1/4">
                        <CardTiltable
                            card={card}
                            shadow
                        />
                    </div>
                ))}
            </section>
        </>
    );
}
