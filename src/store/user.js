import { defineStore } from "pinia";
import { getCurrentUser } from "@/utils/helpers";

export const useUserStore = defineStore('user', {
    state: () => ({
        user: getCurrentUser() || null,
        userLoading: false,
    }),

    actions: {
        setUserDetails(newUser) {
            if (!newUser) return;
            this.user = {
                ...this.user,
                ...newUser
            }
            // Save to localStorage for persistence
            localStorage.setItem('rt_user', JSON.stringify(this.user))
        },

        clearUser() {
            this.user = null
            localStorage.removeItem('rt_user')
        }
    },

    getters: {
        getUserDetails: (state) => state.user,
        isUserLoading: (state) => state.userLoading
    }
})