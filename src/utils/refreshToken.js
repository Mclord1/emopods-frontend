import {API_BASE_URL} from "@/config";
import {getValidToken} from "@/utils/helpers";
import {useAuthStore} from "@/store/authStore";

export default function () {

    const refreshToken = async (refreshToken) => {
        if (refreshToken) {
            try {
                const apiUrl = `${API_BASE_URL}/refresh-token`;
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        'refresh_token': refreshToken
                    })
                });

                if (!response.ok) {
                    console.log('response', response)
                    console.error('Error message: ', response.message);
                    return response.statusText;
                }

                // Assuming the response contains the new token
                const data = await response.json();
                const newToken = data.access_token;

                document.cookie = `uid=${newToken}; path=/`
                console.log('Token refreshed.')

                return newToken;
            } catch (error) {
                console.error('Error refreshing token:', error);
            }
        } else {
            console.log('No refresh token available')
        }
    };

    return {refreshToken};
}
