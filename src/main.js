import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)


// Initialize the app
router.isReady().then(async () => {
    try {
        app.mount('#app')

        const loader = document.getElementById('loader')
        if (loader) {
            loader.style.display = 'none'
        }
    } catch (error) {
        console.error('Failed to initialize app:', error)
        // Still mount the app even if user data fetch fails
        app.mount('#app')
    }
})
