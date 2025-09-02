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

<script setup lang="ts">
import api from '@/api'
import { onMounted, reactive } from 'vue'
import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js'
Chart.register(BarElement, CategoryScale, LinearScale)

const stats = reactive({ totalFarmers:0, totalCrops:0, cropsPerFarmer:[] })
onMounted(async () => {
  const { data } = await api.get('/dashboard/admin')
  Object.assign(stats, data)
  const ctx = document.getElementById('bar')
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: stats.cropsPerFarmer.map(f=>f.name),
      datasets: [{ data: stats.cropsPerFarmer.map(f=>f.crops_count) }]
    }
  })
})
</script>
