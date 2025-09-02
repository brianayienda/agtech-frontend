<template>
  <div class="flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-green-700 text-white h-screen p-4">
      <h2 class="text-xl font-bold mb-6">Farmer Panel</h2>
      <nav class="space-y-2">
        <RouterLink to="/farmer" class="block p-2 rounded hover:bg-green-600">Dashboard</RouterLink>
        <RouterLink to="/crops" class="block p-2 rounded hover:bg-green-600">My Crops</RouterLink>
      </nav>
    </aside>

    <!-- Main content -->
    <main class="flex-1 p-6 bg-gray-100">
      <router-view />
    </main>
  </div>
</template>
