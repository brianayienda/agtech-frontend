<template>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">My Profile</h2>

    <form @submit.prevent="updateProfile" class="space-y-4 bg-white p-6 rounded shadow max-w-md">
      <div>
        <label class="block text-sm font-medium">Name</label>
        <input v-model="form.name" type="text" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Email</label>
        <input v-model="form.email" type="email" class="border p-2 w-full rounded" />
      </div>

      <div>
        <label class="block text-sm font-medium">Phone</label>
        <input v-model="form.phone" type="text" class="border p-2 w-full rounded" />
      </div>

      <button class="bg-blue-600 text-white px-4 py-2 rounded" :disabled="loading">
        {{ loading ? "Saving..." : "Update Profile" }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { toast } from "vue3-toastify";

const form = ref({ name: "", email: "", phone: "" });
const loading = ref(false);

onMounted(async () => {
  try {
    const { data } = await axios.get("/api/profile", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    form.value = data;
  } catch (e) {
    toast.error("Failed to load profile");
  }
});

const updateProfile = async () => {
  loading.value = true;
  try {
    const { data } = await axios.put("/api/profile", form.value, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    });
    toast.success(data.message || "Profile updated successfully!");
  } catch (e) {
    toast.error("Error updating profile");
  } finally {
    loading.value = false;
  }
};
</script>
