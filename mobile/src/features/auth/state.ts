import type { RootState } from "../../app/store";

export type AuthState = {
    token: string | null;
    username: string | null;
    loginTime: number | null;
    loading: boolean;
    error: string | null;
};

export const selectAuthState = (state: RootState) => state.auth;