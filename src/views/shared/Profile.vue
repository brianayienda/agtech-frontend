<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">My Profile</h2>

    <form @submit.prevent="updateProfile" class="space-y-4 bg-white p-6 rounded shadow max-w-md">
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input v-model="profile.name" type="text" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input v-model="profile.email" type="email" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Phone</label>
        <input v-model="profile.phone" type="text" class="border p-2 w-full rounded" />
      </div>

      <button class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="loading">
        {{ loading ? "Saving..." : "Update Profile" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'
import { toast } from 'vue3-toastify'

const profile = ref({ name: '', email: '', phone: '' })
const loading = ref(false)

onMounted(async () => {
  try {
    // Fetch dashboard stats and reuse the profile data
    const { data } = await api.get('/dashboard/farmer')
    profile.value = data.profile || {}
  } catch (err) {
    console.error(err)
    toast.error('Failed to load profile from dashboard')
  }
})

const updateProfile = async () => {
  loading.value = true
  try {
    const { data } = await api.put('/profile', profile.value)
    toast.success(data.message || 'Profile updated successfully!')
  } catch (err) {
    console.error(err)
    toast.error('Failed to update profile')
  } finally {
    loading.value = false
  }
}
</script>
