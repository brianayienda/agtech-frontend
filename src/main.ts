import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

import 'vue3-toastify/dist/index.css'
import { toast, type ToastContainerOptions } from 'vue3-toastify'

// 👉 Import Chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,   // Pie/Doughnut
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js'

// 👉 Register Chart.js globally
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
)

const app = createApp(App)

app.use(router)

// optional default options for toasts
const toastOptions: ToastContainerOptions = {
  position: 'top-right',
  autoClose: 3000,
  closeOnClick: true,
}

app.mount('#app')

// make toast available globally (optional, since you can import { toast } directly in components)
export { toast }
