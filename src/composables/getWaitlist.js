import { ref, computed } from "vue";
import { API_BASE_URL } from "@/config";
import { useAuthStore } from "@/store/authStore";
import { formatDate } from "@/utils/helpers";

export default function getWaitlist() {
    const waitlistData = ref([]);
    const waitlistPayload = ref(null);
    const waitlistLoader = ref(false);

    const fetchWaitlistData = async () => {
        try {
            waitlistLoader.value = true;
            const authStore = useAuthStore();
            await authStore.checkAuthentication();
            const accessToken = authStore.getAccessToken;

            const response = await fetch(`${API_BASE_URL}/admin/waitlist`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                waitlistData.value = result.data.payload;
                waitlistPayload.value = result.data;
            }
        } catch (error) {
            console.error("Error fetching waitlist:", error);
        } finally {
            waitlistLoader.value = false;
        }
    };

    const approveUser = async (userId) => {
        try {
            const authStore = useAuthStore();
            await authStore.checkAuthentication();
            const accessToken = authStore.getAccessToken;

            const response = await fetch(`${API_BASE_URL}/admin/waitlist/${userId}/convert`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();
            return { success: response.ok && result.status === "success", message: result.message };
        } catch (error) {
            console.error("Error approving user:", error);
            return { success: false, message: "An error occurred while approving the user" };
        }
    };

    const formattedWaitlistData = computed(() => {
        return waitlistData.value.map(user => ({
            name: `${user.first_name} ${user.last_name}`,
            email: user.email,
            phone: user.phone_number || '-',
            created_at: formatDate(user.created_at)
        }));
    });

    return {
        fetchWaitlistData,
        waitlistData,
        waitlistPayload,
        formattedWaitlistData,
        waitlistLoader,
        approveUser
    };
} 