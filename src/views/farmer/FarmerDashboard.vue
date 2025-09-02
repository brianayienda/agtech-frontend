<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">Farmer Dashboard</h1>
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">My Total Crops</p>
        <p class="text-3xl font-bold">{{ stats.myTotalCrops }}</p>
      </div>
      <div class="bg-white p-4 rounded shadow">
        <p class="text-gray-500">My Profile</p>
        <p class="font-semibold">{{ stats.profile?.name }}</p>
        <p class="text-sm text-gray-500">{{ stats.profile?.email }} • {{ stats.profile?.phone }}</p>
      </div>
    </div>
    <div class="bg-white p-4 rounded shadow mt-6">
      <h2 class="font-semibold mb-2">Crops by Type</h2>
      <canvas id="pie"></canvas>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
import { onMounted, reactive } from 'vue'
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js'
Chart.register(ArcElement, Tooltip, Legend)

const stats = reactive({ myTotalCrops:0, byType:[], profile:null })
onMounted(async ()=>{
  const { data } = await api.get('/dashboard/farmer')
  Object.assign(stats, data)
  new Chart(document.getElementById('pie'), {
    type: 'pie',
    data: {
      labels: stats.byType.map(x=>x.type),
      datasets: [{ data: stats.byType.map(x=>x.count) }]
    }
  })
})
</script>
