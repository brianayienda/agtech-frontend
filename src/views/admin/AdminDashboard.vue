<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Admin Dashboard</h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Total Farmers</p>
        <p class="text-3xl font-bold">{{ stats.totalFarmers }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">Total Crops</p>
        <p class="text-3xl font-bold">{{ stats.totalCrops }}</p>
      </div>
    </div>
    <div class="bg-white p-4 rounded shadow mt-6">
      <h2 class="font-semibold mb-2">Crops per Farmer</h2>
      <canvas id="bar"></canvas>
    </div>
  </div>
</template>
<script setup>
import api from '@/api'
import { onMounted, reactive } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

const stats = reactive({ totalFarmers: 0, totalCrops: 0, cropsPerFarmer: [] })

// Utility to generate color
const getColor = (index, total) => `hsl(${(index * 360) / total}, 70%, 50%)`

onMounted(async () => {
  const { data } = await api.get('/dashboard/admin')
  Object.assign(stats, data)

  const ctx = document.getElementById('bar')

  // Create a dataset per farmer
  const datasets = stats.cropsPerFarmer.map((f, index) => ({
    label: f.name,
    data: [f.crops_count],
    backgroundColor: getColor(index, stats.cropsPerFarmer.length),
  }))

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Number of Crops'], // single label on x-axis
      datasets: datasets,
    },
    options: {
      responsive: true,
      plugins: {
        legend: { display: true },
      },
    },
  })
})
</script>


