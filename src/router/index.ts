import { createRouter, createWebHistory } from 'vue-router';
import Login from '../views/Login.vue';
import AdminLayout from '../layouts/AdminLayout.vue';
import FarmerLayout from '../layouts/FarmerLayout.vue';

import AdminDashboard from '../views/admin/AdminDashboard.vue';
import Farmers from '../views/admin/Farmers.vue';
import Crops from '../views/shared/Crops.vue';
import FarmerDashboard from '../views/farmer/FarmerDashboard.vue';
import Profile from '../views/shared/Profile.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { role: 'admin', auth: true },
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
      { path: 'farmers', name: 'Farmers', component: Farmers },
      { path: 'crops', name: 'AdminCrops', component: Crops },
      { path: 'profile', name: 'AdminProfile', component: Profile },
    ],
  },

  {
    path: '/farmer',
    component: FarmerLayout,
    meta: { role: 'farmer', auth: true },
    children: [
      { path: '', name: 'FarmerDashboard', component: FarmerDashboard },
      { path: 'crops', name: 'FarmerCrops', component: Crops },
      { path: 'profile', name: 'FarmerProfile', component: Profile },
    ],
  },

  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  if (to.meta.auth && !token) return next('/login');
  if (to.meta.role && user?.role !== to.meta.role) return next('/login');

  next();
});

export default router;
