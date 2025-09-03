<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    
    <!-- Header -->
    <header class="bg-green-600 text-white py-4 shadow">
      <div class="max-w-4xl mx-auto px-4 flex justify-between items-center">
        <h1 class="text-xl font-bold">AgTech ERP</h1>
        <nav>
          <a href="#" class="hover:underline">Home</a>
          <a href="#" class="ml-4 hover:underline">About</a>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 flex items-center justify-center">
      <div class="w-full max-w-md bg-white p-6 rounded shadow">
        <h1 class="text-2xl font-bold mb-4">Login</h1>

        <!-- Login Form -->
        <form @submit.prevent="login" class="mb-4">
          <input v-model="email" class="w-full border p-2 mb-2" type="email" placeholder="Email" />
          <input v-model="password" class="w-full border p-2 mb-4" type="password" placeholder="Password" />
          <button class="w-full bg-green-600 text-white py-2 rounded">Login</button>
        </form>

        <p class="text-xs mt-3 text-gray-500">Farmer? Register below</p>

        <!-- Register Form -->
        <form @submit.prevent="register" class="mt-2 grid gap-2">
          <input v-model="name" class="border p-2" placeholder="Name" />
          <input v-model="phone" class="border p-2" placeholder="Phone" />
          <input v-model="rEmail" class="border p-2" type="email" placeholder="Email" />
          <input v-model="rPassword" class="border p-2" type="password" placeholder="Password" />
          <button class="bg-green-600 text-white py-2 rounded">Register as Farmer</button>
        </form>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-200 text-gray-700 py-4 mt-auto">
      <div class="max-w-4xl mx-auto px-4 text-center text-sm">
        &copy; 2025 AgTech ERP. All rights reserved.
      </div>
    </footer>

  </div>
</template>

<script setup>
import api from '@/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const router = useRouter()

// Login refs
const email = ref('')
const password = ref('')

// Register refs
const name = ref('')
const phone = ref('')
const rEmail = ref('')
const rPassword = ref('')

// Persist user and token
function persist(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  const dest = user.role === 'admin' ? '/admin' : '/farmer'
  router.push(dest)
}

// Login function
const login = async () => {
  try {
    const { data } = await api.post('/login', { email: email.value, password: password.value })
    persist(data.user, data.token)
    toast.success('Login successful!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Login failed. Please try again.')
  }
}

// Register function
const register = async () => {
  try {
    const { data } = await api.post('/register', {
      name: name.value,
      email: rEmail.value,
      password: rPassword.value,
      phone: phone.value
    })
    persist(data.user, data.token)
    toast.success('Registration successful!')
  } catch (err) {
    toast.error(err.response?.data?.message || 'Registration failed. Please try again.')
  }
}
</script>
