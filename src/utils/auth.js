import {ref} from 'vue';
import useRefreshToken from '@/utils/refreshToken';
import {getValidToken} from "@/utils/helpers";
import {jwtDecode} from "jwt-decode";


// Reactive variable to track token expiration
const isTokenExpired = ref(false);

// Function to check and update token expiration status
const checkTokenExpiration = () => {
    const token = getValidToken();

    if (token) {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000;

        isTokenExpired.value = decodedToken.exp < currentTime;
    } else {
        isTokenExpired.value = false;
    }
};


// Utility function to check token expiration and refresh if needed
const checkAndRefreshToken = async () => {
    checkTokenExpiration();

    if (isTokenExpired.value) {
        // Token is expired, refresh it
        const {refreshToken} = useRefreshToken()
        await refreshToken()

    }
};

export {checkAndRefreshToken, isTokenExpired};
