<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside class="w-64 bg-white shadow-lg">
      <div class="p-6 font-bold text-xl border-b">Farmer Panel</div>
      <nav class="p-4 space-y-2">
        <RouterLink to="/farmer" class="block p-2 rounded hover:bg-gray-200">Dashboard</RouterLink>
        <RouterLink to="/farmer/crops" class="block p-2 rounded hover:bg-gray-200">Crops</RouterLink>
        <RouterLink to="/farmer/profile" class="block p-2 rounded hover:bg-gray-200">Profile</RouterLink>
        <button @click="logout" class="w-full text-left p-2 rounded bg-red-500 text-white hover:bg-red-600">
          Logout
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
