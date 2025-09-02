import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './index.css'

// 👉 Import Chart.js
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,   // needed for Pie/Doughnut
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from 'chart.js'

// 👉 Register only once here
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

createApp(App).use(router).mount('#app')
