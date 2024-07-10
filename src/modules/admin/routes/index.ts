import type { RouteRecordRaw } from "vue-router";

export const adminRoutes: RouteRecordRaw = {
    path: '/admin',
    name: 'admin',
    component: () => import('@/modules/admin/layouts/AdminLayout.vue')
}