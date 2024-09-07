import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store/store";
import { setCenteredCard, resetCenteredCard } from "../app/store/slices/centeredCard";
import { Card } from "@types";

export const useCenteredCard = (): Card | null => {
    return useSelector((state: RootState) => state.centeredCard.card);
};

export const useSetCenteredCard = () => {
    const dispatch = useDispatch();

    return (card: Card | null) => {
        dispatch(setCenteredCard(card));
    };
};

export const useResetCenteredCard = () => {
    const dispatch = useDispatch();

    return () => {
        dispatch(resetCenteredCard());
    };
};
