<template>
  <div class="flex h-screen bg-gray-100">
    <!-- Sidebar -->
    <aside
      :class="[collapsed ? 'w-20' : 'w-64', 'bg-white shadow-lg transition-all duration-300']"
    >
      <!-- Header -->
      <div class="p-6 font-bold text-xl border-b flex justify-between items-center">
        <span v-if="!collapsed">{{ isAdmin ? 'Admin Panel' : 'Farmer Panel' }}</span>
        <button @click="collapsed = !collapsed" class="text-gray-600 hover:text-gray-900">
          <X v-if="!collapsed" class="w-5 h-5" />
          <Menu v-else class="w-5 h-5" />
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
          class="w-full text-left p-2 rounded bg-red-500 text-white hover:bg-red-600 flex items-center"
        >
          <LogOut class="w-5 h-5" />
          <span v-if="!collapsed" class="ml-2">Logout</span>
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
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

// 👉 Import Lucide icons
import {
  BarChart2,
  Users,
  Leaf,
  User,
  LogOut,
  Menu,
  X,
} from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()

// Sidebar collapse state
const collapsed = ref(false)

// Check if current layout is admin or farmer
const isAdmin = route.path.startsWith('/admin')

// Define sidebar links dynamically
const links = isAdmin
  ? [
      { to: '/admin', label: 'Dashboard', icon: BarChart2 },
      { to: '/admin/farmers', label: 'Farmers', icon: Users },
      { to: '/admin/crops', label: 'Crops', icon: Leaf },
      { to: '/admin/profile', label: 'Profile', icon: User },
    ]
  : [
      { to: '/farmer', label: 'Dashboard', icon: BarChart2 },
      { to: '/farmer/crops', label: 'Crops', icon: Leaf },
      { to: '/farmer/profile', label: 'Profile', icon: User },
    ]

// Logout
const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  router.push('/login')
}
</script>
