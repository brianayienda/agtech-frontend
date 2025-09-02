<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="w-full max-w-md bg-white p-6 rounded shadow">
      <h1 class="text-2xl font-bold mb-4">Login</h1>
      <form @submit.prevent="login">
        <input v-model="email" class="w-full border p-2 mb-2" type="email" placeholder="Email" />
        <input v-model="password" class="w-full border p-2 mb-4" type="password" placeholder="Password" />
        <button class="w-full bg-blue-600 text-white py-2 rounded">Login</button>
      </form>
      <p class="text-xs mt-3 text-gray-500">Farmer? Register below</p>
      <form @submit.prevent="register" class="mt-2 grid gap-2">
        <input v-model="name" class="border p-2" placeholder="Name" />
        <input v-model="phone" class="border p-2" placeholder="Phone" />
        <input v-model="rEmail" class="border p-2" type="email" placeholder="Email" />
        <input v-model="rPassword" class="border p-2" type="password" placeholder="Password" />
        <button class="bg-green-600 text-white py-2 rounded">Register as Farmer</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
const router = useRouter()
const email = ref(''); const password = ref('');
const name = ref(''); const phone = ref(''); const rEmail = ref(''); const rPassword = ref('');

function persist(user, token) {
  localStorage.setItem('user', JSON.stringify(user))
  localStorage.setItem('token', token)
  const dest = user.role === 'admin' ? '/admin' : '/farmer'
  router.push(dest)
}
const login = async () => {
  const { data } = await api.post('/login', { email: email.value, password: password.value })
  persist(data.user, data.token)
}
const register = async () => {
  const { data } = await api.post('/register', { name: name.value, email: rEmail.value, password: rPassword.value, phone: phone.value })
  persist(data.user, data.token)
}
</script>
