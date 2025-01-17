import { ref } from "vue";
import { API_BASE_URL } from "@/config";
import { useAuthStore } from "@/store/authStore";

export default function getDashboardStats() {
    const dashboardStats = ref({
        totalUsers: 0,
        activeUsers: 0,
        totalWaitList: 0,
        convertedWaitList: 0,
        adminUsers: 0
    });
    const statsLoader = ref(false);

    const fetchDashboardStats = async () => {
        try {
            statsLoader.value = true;
            const authStore = useAuthStore();
            await authStore.checkAuthentication();
            const accessToken = authStore.getAccessToken;

            const response = await fetch(`${API_BASE_URL}/admin/statistics`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            const result = await response.json();

            if (response.ok && result.status === "success") {
                dashboardStats.value = result.data;
            }
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
        } finally {
            statsLoader.value = false;
        }
    };

    return {
        dashboardStats,
        statsLoader,
        fetchDashboardStats
    };
} 