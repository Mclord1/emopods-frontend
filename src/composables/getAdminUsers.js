import { API_BASE_URL } from "@/config.js";
import { capitalizeFirstLetter, formatDateTime, getValidToken } from "@/utils/helpers.js";
import { computed, ref } from "vue";
import { useAuthStore } from "@/store/authStore";

const adminLoader = ref(false);
const apiUrl = `${API_BASE_URL}/admin/user`;
const adminsList = ref([]);
const adminsPayload = ref(null);

const fetchAdminsData = async (page = 1, pageSize = 20) => {
    try {
        const authStore = useAuthStore();
        await authStore.checkAuthentication();

        const accessToken = getValidToken();
        if (!accessToken) {
            console.error("Access token not available.");
            return;
        }

        adminLoader.value = true;
        const response = await fetch(apiUrl, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const result = await response.json();

        if (response.ok && result.status === "success") {
            if (result.data && Array.isArray(result.data.payload)) {
                adminsList.value = result.data.payload;
                adminsPayload.value = {
                    pagination: result.data.paging,
                    links: result.data.links
                };
            } else {
                console.error("Invalid data structure:", result);
            }
        } else {
            console.error("API Error:", result.message || 'Unknown error');
        }
    } catch (error) {
        console.error("An error occurred:", error);
    } finally {
        adminLoader.value = false;
    }
};

const formattedAdminsData = computed(() => {
    return adminsList.value.map((item) => {
        const { date, time } = item.created_at ? formatDateTime(item.created_at) : { date: 'N/A', time: '' };

        return {
            name: capitalizeFirstLetter(item.first_name, item.last_name),
            email: item.email,
            role: capitalizeFirstLetter(item.role.replace('_', ' ')),
            status: item.status,
            created_at: item.created_at ? `${date}, ${time}` : 'N/A'
        };
    });
});

const getAdminUsers = () => {
    return { fetchAdminsData, adminsList, adminsPayload, formattedAdminsData, adminLoader };
};

export default getAdminUsers;
