<template>
  <div class="p-6">
    <h1 class="text-xl font-bold mb-4">Crops</h1>
    <form @submit.prevent="create" class="bg-white p-4 rounded shadow grid md:grid-cols-4 gap-2 mb-4">
      <input v-model="form.name" class="border p-2" placeholder="Name" />
      <input v-model="form.type" class="border p-2" placeholder="Type" />
      <input v-model.number="form.quantity" class="border p-2" type="number" placeholder="Qty" />
      <button class="bg-green-600 text-white rounded px-4">Add</button>
    </form>

    <table class="w-full bg-white rounded shadow">
      <thead><tr class="bg-gray-50">
        <th class="p-2 text-left">Name</th><th class="p-2">Type</th><th class="p-2">Qty</th><th class="p-2">Farmer</th><th class="p-2">Actions</th>
      </tr></thead>
      <tbody>
        <tr v-for="c in list.data" :key="c.id" class="border-t">
          <td class="p-2">{{ c.name }}</td>
          <td class="p-2">{{ c.type }}</td>
          <td class="p-2">{{ c.quantity }}</td>
          <td class="p-2">{{ c.farmer?.name ?? 'Me' }}</td>
          <td class="p-2">
            <button @click="edit(c)" class="px-2 py-1 bg-blue-600 text-white rounded">Edit</button>
            <button @click="remove(c.id)" class="px-2 py-1 bg-red-600 text-white rounded ml-2">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import api from '@/api'
import { onMounted, reactive } from 'vue'

const list = reactive({ data: [] })
const form = reactive({ name:'', type:'', quantity:0 })

const load = async ()=> { const { data } = await api.get('/crops'); list.data = data.data ?? data }
onMounted(load)

const create = async ()=> { await api.post('/crops', form); Object.assign(form,{name:'',type:'',quantity:0}); await load() }
const remove = async (id)=> { await api.delete(`/crops/${id}`); await load() }
const edit = async (c)=> {
  const name = prompt('Name', c.name) ?? c.name
  const quantity = parseInt(prompt('Quantity', c.quantity) ?? c.quantity, 10)
  await api.put(`/crops/${c.id}`, { name, quantity }); await load()
}
</script>
