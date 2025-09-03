<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Farmer Dashboard</h1>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">My Total Crops</p>
        <p class="text-3xl font-bold">{{ stats.myTotalCrops }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">My Profile</p>
        <p class="font-semibold">{{ stats.profile?.name }}</p>
        <p class="text-sm text-gray-500">
          {{ stats.profile?.email }} • {{ stats.profile?.phone }}
        </p>
      </div>
    </div>

    <!-- Chart -->
  <div class="bg-white p-4 rounded shadow mt-6 relative">
  <h2 class="font-semibold mb-2">Crops by Type</h2>

  <div class="h-64">
    <canvas ref="pieCanvas"></canvas>

    <!-- Show message only if no data -->
    <p
      v-if="stats.byType.length === 0"
      class="absolute inset-0 flex items-center justify-center text-gray-500 font-medium"
    >
      No crop data available
    </p>
  </div>
</div>

  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, onBeforeUnmount, reactive, ref } from 'vue'
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js'

Chart.register(ArcElement, Tooltip, Legend, PieController)

const stats = reactive({ myTotalCrops: 0, byType: [], profile: null })
const pieCanvas = ref(null)
let chartInstance = null

onMounted(async () => {
  const { data } = await api.get('/dashboard/farmer')
  Object.assign(stats, data)

  // destroy old chart if exists
  if (chartInstance) {
    chartInstance.destroy()
  }

  chartInstance = new Chart(pieCanvas.value, {
    type: 'pie',
    data: {
      labels: stats.byType.map(x => x.type),
      datasets: [
        {
          data: stats.byType.map(x => x.count),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  })
})

onBeforeUnmount(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
