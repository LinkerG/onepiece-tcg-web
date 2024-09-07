import { useDispatch, useSelector } from 'react-redux';
import { setQuery, clearQuery } from '../app/store/slices/cardSearch'
import { CardAttribute, CardColor, CardsQuery, CardType, Rarity } from '../app/types'
import { RootState } from '../app/store/store';
import { useNavigate } from 'react-router-dom';

export const useCardQuery = () => {
    return useSelector((state: RootState) => state.cardSearch.query);
};

export const useSetCardQuery = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const setQueryParams = (query: CardsQuery) => {
        // Actualiza el estado en la store
        dispatch(setQuery(query));

        // Convierte el objeto CardsQuery en parámetros de URL
        const queryParams = new URLSearchParams();

        if (query.card_id) queryParams.append('card_id', query.card_id);
        if (query.name) queryParams.append('name', query.name);
        if (query.rarity) queryParams.append('rarity', query.rarity);
        if (query.type) queryParams.append('type', query.type);
        if (query.attribute) query.attribute.forEach(attr => queryParams.append('attribute', attr));
        if (query.color) query.color.forEach(col => queryParams.append('color', col));
        if (query.card_type) query.card_type.forEach(ct => queryParams.append('card_type', ct));

        // Actualiza la URL con los parámetros
        navigate(`?${queryParams.toString()}`, { replace: true });
    };

    return setQueryParams;
};

export const useSetCardQueryFromSearchParams = () => {
    const dispatch = useDispatch();

    const convertSearchParamsToQuery = (searchParams: URLSearchParams): CardsQuery => {
        const query: CardsQuery = {};

        // Recolecta valores múltiples para parámetros que pueden tener varios valores
        const collectValues = (key: string): string[] => {
            const values = searchParams.getAll(key);
            return values.length > 0 ? values : [];
        };

        // Procesa los parámetros de búsqueda
        if (searchParams.has('card_id')) query.card_id = searchParams.get('card_id') || '';
        if (searchParams.has('name')) query.name = searchParams.get('name') || '';
        if (searchParams.has('rarity')) query.rarity = searchParams.get('rarity') as any; // Ajusta según tu definición
        if (searchParams.has('type')) query.type = searchParams.get('type') as any; // Ajusta según tu definición
        if (searchParams.has('attribute')) query.attribute = collectValues('attribute') as any;
        if (searchParams.has('color')) query.color = collectValues('color') as any;
        if (searchParams.has('card_type')) query.card_type = collectValues('card_type') as any;

        // Asegúrate de que attribute, color y card_type siempre sean arrays
        if (query.attribute && !Array.isArray(query.attribute)) query.attribute = [query.attribute];
        if (query.color && !Array.isArray(query.color)) query.color = [query.color];
        if (query.card_type && !Array.isArray(query.card_type)) query.card_type = [query.card_type];

        console.log(query);

        return query;
    };

    const setCardQueryFromSearchParams = (searchParams: URLSearchParams) => {
        const query = convertSearchParamsToQuery(searchParams);
        dispatch(setQuery(query));
    };

    return setCardQueryFromSearchParams;
};

export const useClearCardQuery = () => {
    const dispatch = useDispatch();

    const clearQueryParams = () => {
        dispatch(clearQuery());
    };

    return clearQueryParams;
};