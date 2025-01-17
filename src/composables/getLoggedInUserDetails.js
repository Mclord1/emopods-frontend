import {API_BASE_URL} from "@/config.js";
import {ref} from "vue";
import {useAuthStore} from "@/store/authStore";

const loading = ref(false);
const apiUrl = `${API_BASE_URL}/user-details`;
const userData = ref(null);

const fetchUserData = async () => {
    const authStore = useAuthStore()
    await authStore.checkAuthentication()
    const accessToken = authStore.getAccessToken

    if (accessToken) {
        try {
            loading.value = true;

            const response = await fetch(apiUrl, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            if (response.ok) {
                const result = await response.json();
                userData.value = result.user
            } else {
                console.log("response", response);
                console.error("Error fetching data from the API");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        } finally {
            loading.value = false;
        }
    }
};

const getUser = () => {
    return {userData, fetchUserData, loading}
}

export default getUser;