import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";
import { getValidToken } from "@/utils/helpers";

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        accessToken: getValidToken(),
        isTokenExpired: false,
        user: null,
        userLoading: false,
    }),

    actions: {
        setAuthentication(isAuthenticated) {
            this.isAuthenticated = isAuthenticated
        },

        setAccessToken(token) {
            this.accessToken = token;
        },

        setTokenExpiration(isTokenExpired) {
            this.isTokenExpired = isTokenExpired;
        },

        async checkTokenExpiration() {
            const token = this.getAccessToken

            if (token !== null) {
                const decodedToken = jwtDecode(token);
                const currentTime = Date.now() / 1000;

                this.setTokenExpiration(decodedToken.exp < currentTime);
            } else {
                this.setTokenExpiration(true);
            }
        },

        async checkAuthentication() {
            const token = this.getAccessToken

            if (!token) {
                this.setAuthentication(false);
                this.setTokenExpiration(true);
                return;
            }

            if (!token.match(/^[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+\.[a-zA-Z0-9-_]+$/)) {
                this.setAuthentication(false);
                this.setTokenExpiration(true);
                return;
            }

            const decodedToken = jwtDecode(token);
            const currentTime = Date.now() / 1000;

            const isTokenExpired = decodedToken.exp < currentTime;
            this.setAuthentication(!isTokenExpired);
            this.setTokenExpiration(isTokenExpired);
        }
    },

    getters: {
        isUserAuthenticated: (state) => state.isAuthenticated,
        getAccessToken: (state) => state.accessToken,
        getTokenExpirationStatus: (state) => state.isTokenExpired,
        getUser: (state) => state.user,
        getUserLoadingStatus: (state) => state.userLoading,
    }
})