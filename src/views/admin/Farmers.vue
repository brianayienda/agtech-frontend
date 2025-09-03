<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Farmer Management</h1>

    <!-- Create Farmer Form -->
    <form
      @submit.prevent="create"
      class="bg-white p-4 rounded shadow grid md:grid-cols-5 gap-2 mb-4"
    >
      <input v-model="form.name" class="border p-2" placeholder="Name" />
      <input v-model="form.email" class="border p-2" type="email" placeholder="Email" />
      <input v-model="form.phone" class="border p-2" placeholder="Phone" />

      <!-- Password field with toggle -->
      <div class="relative">
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          class="border p-2 w-full"
          placeholder="Password"
        />
        <button
          type="button"
          @click="showPassword = !showPassword"
          class="absolute right-2 top-2 text-gray-500"
        >
          <EyeOff v-if="showPassword" class="w-5 h-5" />
          <Eye v-else class="w-5 h-5" />
        </button>
      </div>

      <!-- Confirm Password field with toggle -->
      <div class="relative">
        <input
          v-model="form.password_confirmation"
          :type="showConfirmPassword ? 'text' : 'password'"
          class="border p-2 w-full"
          placeholder="Confirm Password"
        />
        <button
          type="button"
          @click="showConfirmPassword = !showConfirmPassword"
          class="absolute right-2 top-2 text-gray-500"
        >
          <EyeOff v-if="showConfirmPassword" class="w-5 h-5" />
          <Eye v-else class="w-5 h-5" />
        </button>
      </div>

      <button class="bg-green-600 text-white rounded px-4">Add Farmer</button>
    </form>

    <!-- Farmer List -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="bg-gray-50">
          <th class="p-2 text-left">Name</th>
          <th class="p-2">Email</th>
          <th class="p-2">Phone</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="f in list.data" :key="f.id" class="border-t">
          <td class="p-2">{{ f.name }}</td>
          <td class="p-2">{{ f.email }}</td>
          <td class="p-2">{{ f.phone }}</td>
          <td class="p-2 flex gap-2">
            <button @click="edit(f)" class="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
            <button @click="remove(f.id)" class="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, reactive, ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'

const list = reactive({ data: [] })
const form = reactive({ name: '', email: '', phone: '', password: '', password_confirmation: '' })

// toggles for showing password
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const load = async () => {
  const { data } = await api.get('/farmers')
  list.data = data.data ?? data
}
onMounted(load)

const create = async () => {
  if (form.password !== form.password_confirmation) {
    alert('Passwords do not match!')
    return
  }

  await api.post('/farmers', form)
  Object.assign(form, { name: '', email: '', phone: '', password: '', password_confirmation: '' })
  await load()
}

const remove = async (id) => {
  await api.delete(`/farmers/${id}`)
  await load()
}

const edit = async (f) => {
  const name = prompt('Name', f.name)
  if (!name) return
  await api.put(`/farmers/${f.id}`, { name })
  await load()
}
</script>
