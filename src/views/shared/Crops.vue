<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Crops</h1>

    <!-- Add Form -->
    <form @submit.prevent="create" class="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-2 mb-4">
      <input v-model="form.name" class="border p-2" placeholder="Name" />
      <input v-model="form.type" class="border p-2" placeholder="Type" />
      <input v-model.number="form.quantity" class="border p-2" type="number" placeholder="Qty" />
      <button class="bg-green-600 text-white rounded px-4">Add</button>
    </form>

    <!-- Table -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="bg-gray-50">
          <th class="p-2 text-left">Name</th>
          <th class="p-2">Type</th>
          <th class="p-2">Qty</th>
          <th class="p-2">Farmer</th>
          <th class="p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="c in list.data" :key="c.id" class="border-t">
          <td class="p-2">{{ c.name }}</td>
          <td class="p-2">{{ c.type }}</td>
          <td class="p-2">{{ c.quantity }}</td>
          <td class="p-2">{{ c.farmer?.name ?? 'Me' }}</td>
          <td class="p-2">
            <button @click="openEdit(c)" class="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
            <button @click="remove(c.id)" class="px-2 py-1 bg-red-600 text-white rounded ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Edit Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 class="text-lg font-bold mb-4">Edit Crop</h2>
        <form @submit.prevent="update">
          <div class="mb-2">
            <label class="block text-sm font-medium">Name</label>
            <input v-model="editForm.name" class="border p-2 w-full rounded" />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium">Type</label>
            <input v-model="editForm.type" class="border p-2 w-full rounded" />
          </div>
          <div class="mb-2">
            <label class="block text-sm font-medium">Quantity</label>
            <input v-model.number="editForm.quantity" type="number" class="border p-2 w-full rounded" />
          </div>
          <div class="flex justify-end mt-4">
            <button type="button" @click="closeModal" class="px-4 py-2 bg-gray-300 rounded mr-2">Cancel</button>
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, reactive, ref } from 'vue'

const list = reactive({ data: [] })
const form = reactive({ name:'', type:'', quantity:0 })

// Modal state
const showModal = ref(false)
const editForm = reactive({ id:null, name:'', type:'', quantity:0 })

// Load crops
const load = async ()=> { 
  const { data } = await api.get('/crops') 
  list.data = data.data ?? data 
}
onMounted(load)

// Create crop
const create = async ()=> { 
  await api.post('/crops', form) 
  Object.assign(form,{name:'',type:'',quantity:0}) 
  await load() 
}

// Delete crop
const remove = async (id)=> { 
  await api.delete(`/crops/${id}`) 
  await load() 
}

// Open modal with crop data
const openEdit = (c)=> {
  editForm.id = c.id
  editForm.name = c.name
  editForm.type = c.type
  editForm.quantity = c.quantity
  showModal.value = true
}

// Close modal
const closeModal = ()=> { showModal.value = false }

// Update crop
const update = async ()=> {
  await api.put(`/crops/${editForm.id}`, { 
    name: editForm.name, 
    type: editForm.type,
    quantity: editForm.quantity 
  })
  showModal.value = false
  await load()
}
</script>
