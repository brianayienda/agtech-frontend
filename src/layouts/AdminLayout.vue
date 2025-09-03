<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[collapsed ? 'w-20' : 'w-64', 'bg-white shadow-lg transition-all duration-300']"
    >
      <!-- Sidebar Header -->
      <div class="p-6 font-bold text-xl border-b flex justify-between items-center">
        <span v-if="!collapsed">Admin Panel</span>
        <button @click="collapsed = !collapsed" class="text-gray-600 hover:text-gray-900">
          <Menu v-if="collapsed" class="w-5 h-5" />
          <X v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Nav Links -->
      <nav class="p-4 space-y-2">
        <RouterLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          class="flex items-center p-2 rounded hover:bg-gray-200"
          :class="$route.path === link.to ? 'bg-gray-300 font-semibold text-blue-600' : ''"
        >
          <component :is="link.icon" class="w-5 h-5" />
          <span v-if="!collapsed" class="ml-2">{{ link.label }}</span>
        </RouterLink>

        <!-- Logout -->
        <button
          @click="logout"
          class="w-full text-left p-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center mt-4"
        >
          <LogOut class="w-5 h-5" />
          <span v-if="!collapsed" class="ml-2">Logout</span>
        </button>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col">
      <!-- Header -->
      <header class="bg-white shadow p-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">Welcome, Admin</h1>
        <!-- Optional: add user avatar or actions -->
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 p-6 overflow-y-auto">
        <RouterView />
      </main>

      <!-- Footer -->
      <!-- <footer class="bg-white shadow p-2 text-center text-gray-500">
        &copy; 2025 My Farm Management System
      </footer> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { BarChart2, Users, Leaf, User, LogOut, Menu, X } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

const collapsed = ref(false)

const links = [
  { to: '/admin', label: 'Dashboard', icon: BarChart2 },
  { to: '/admin/farmers', label: 'Farmers', icon: Users },
  { to: '/admin/crops', label: 'Crops', icon: Leaf },
  { to: '/admin/profile', label: 'Profile', icon: User }
]

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
