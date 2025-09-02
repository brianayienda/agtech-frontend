<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-gray-800 text-white h-screen p-4">
      <h2 class="text-xl font-bold mb-6">Admin Panel</h2>
      <nav class="space-y-2">
        <RouterLink to="/admin" class="block p-2 rounded hover:bg-gray-700">Dashboard</RouterLink>
        <RouterLink to="/admin/farmers" class="block p-2 rounded hover:bg-gray-700">Farmers</RouterLink>
        <RouterLink to="/crops" class="block p-2 rounded hover:bg-gray-700">Crops</RouterLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6 bg-gray-100">
      <router-view />
    </main>
  </div>
</template>
