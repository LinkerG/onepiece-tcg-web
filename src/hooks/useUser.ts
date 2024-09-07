import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../app/store/store";
import { setUser, setRememberUser, resetUser } from "../app/store/slices/user";
import { User } from "@types";

export const useUser = () => {
    return useSelector((state: RootState) => state.user.user);
};

export const useSetUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (user: User) => dispatch(setUser(user));
};

export const useSetRememberUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    return (user: User) => dispatch(setRememberUser(user));
};

export const useResetUser = () => {
    const dispatch = useDispatch<AppDispatch>();
    return () => dispatch(resetUser());
};