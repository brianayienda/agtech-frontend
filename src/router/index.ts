import { createRouter, createWebHistory } from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import Login from '../views/Login.vue';
import AdminDashboard from '../views/admin/AdminDashboard.vue';
import FarmerDashboard from '../views/farmer/FarmerDashboard.vue';
import Farmers from '../views/admin/Farmers.vue';
import Crops from '../views/shared/Crops.vue';

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/admin', name: 'admin', component: AdminDashboard, meta: { role: 'admin', auth: true } },
  { path: '/admin/farmers', name: 'farmers', component: Farmers, meta: { role: 'admin', auth: true } },
  { path: '/crops', name: 'crops', component: Crops, meta: { auth: true } },
  { path: '/farmer', name: 'farmer', component: FarmerDashboard, meta: { role: 'farmer', auth: true } },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Add the beforeEach guard
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Check authentication
  if (to.meta.auth && !token) return next('/login');

  // Check role
  if (to.meta.role && user?.role !== to.meta.role) return next('/login');

  next();
});

export default router;
