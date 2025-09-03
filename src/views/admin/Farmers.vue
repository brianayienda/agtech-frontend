<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Farmer Management</h1>

    <!-- Create Farmer Form -->
    <form
      @submit.prevent="create"
      class="bg-white p-4 rounded shadow grid md:grid-cols-5 gap-2 mb-4"
    >
      <input v-model="form.name" class="border p-2" placeholder="Name" required />
      <input v-model="form.email" class="border p-2" type="email" placeholder="Email" required />
      <p v-if="errors.email" class="text-red-600 text-sm">{{ errors.email[0] }}</p>

      <input v-model="form.phone" class="border p-2" placeholder="Phone" required />

      <!-- Password field with toggle -->
      <div class="relative">
        <input
          v-model="form.password"
          :type="showPassword ? 'text' : 'password'"
          class="border p-2 w-full"
          placeholder="Password"
          required
        />
        <p v-if="errors.password" class="text-red-600 text-sm">{{ errors.password[0] }}</p>
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
          required
        />
        <p v-if="errors.password_confirmation" class="text-red-600 text-sm">{{ errors.password_confirmation[0] }}</p>
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
            <button @click="openEdit(f)" class="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
            <button @click="confirmDelete(f.id)" class="px-2 py-1 bg-red-600 text-white rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="editModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 class="text-lg font-bold mb-4">Edit Farmer</h2>
        <form @submit.prevent="update">
          <input v-model="editForm.name" class="border p-2 w-full mb-2" placeholder="Name" required />
          <input v-model="editForm.email" type="email" class="border p-2 w-full mb-2" placeholder="Email" required />
          <input v-model="editForm.phone" class="border p-2 w-full mb-4" placeholder="Phone" required />

          <div class="flex justify-end gap-2">
            <button type="button" @click="editModal = false" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation -->
    <div v-if="deleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-6 rounded shadow w-full max-w-sm">
        <h2 class="text-lg font-bold mb-4">Confirm Delete</h2>
        <p class="mb-4">Are you sure you want to delete this farmer?</p>
        <div class="flex justify-end gap-2">
          <button @click="deleteConfirm = null" class="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button @click="remove(deleteConfirm)" class="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, reactive, ref } from 'vue'
import { Eye, EyeOff } from 'lucide-vue-next'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const list = reactive({ data: [] })
const form = reactive({ name: '', email: '', phone: '', password: '', password_confirmation: '' })
const errors = reactive({})
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const editModal = ref(false)
const editForm = reactive({ id: null, name: '', email: '', phone: '' })
const deleteConfirm = ref(null)

const load = async () => {
  const { data } = await api.get('/farmers')
  list.data = data.data ?? data
}
onMounted(load)

const create = async () => {
  Object.keys(errors).forEach(k => delete errors[k])
  if (form.password !== form.password_confirmation) {
    errors.password_confirmation = ['Passwords do not match']
    toast.error('Passwords do not match')
    return
  }
  try {
    await api.post('/farmers', form)
    Object.assign(form, { name: '', email: '', phone: '', password: '', password_confirmation: '' })
    await load()
    toast.success('Farmer created successfully')
  } catch (e) {
    if (e.response?.status === 422) {
      Object.assign(errors, e.response.data.errors)
      toast.error('Validation error')
    } else {
      toast.error('Something went wrong ')
    }
  }
}

const openEdit = (f) => {
  editForm.id = f.id
  editForm.name = f.name
  editForm.email = f.email
  editForm.phone = f.phone
  editModal.value = true
}

const update = async () => {
  try {
    await api.put(`/farmers/${editForm.id}`, {
      name: editForm.name,
      email: editForm.email,
      phone: editForm.phone
    })
    editModal.value = false
    await load()
    toast.success('Farmer updated successfully ✅')
  } catch (e) {
    console.error(e.response?.data || e)
    toast.error('Update failed ❌')
  }
}

const confirmDelete = (id) => {
  deleteConfirm.value = id
}

const remove = async (id) => {
  try {
    await api.delete(`/farmers/${id}`)
    deleteConfirm.value = null
    await load()
    toast.success('Farmer deleted successfully ✅')
  } catch (e) {
    toast.error('Delete failed ❌')
  }
}
</script>

