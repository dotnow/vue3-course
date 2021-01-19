import { createRouter, createWebHistory } from 'vue-router'

const routes = [
	{
		path: '/',
		name: 'home',
		redirect: 'tasks',
		component: () => import('@/views/Tasks.vue')
	},
	{
		path: '/tasks',
		name: 'tasks',
		component: () => import('@/views/Tasks.vue'),
	},
	{
		path: '/tasks/new',
		name: 'tasks-new',
		component: () => import('@/views/New.vue')
	},
	{
		path: '/tasks/:id',
		name: 'tasks-id',
		component: () => import('@/views/Task.vue'),
	},
	{
		path: '/:pathMatch(.*)*',
		redirect: 'tasks'
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
