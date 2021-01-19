<template>
	<div class="uk-text-center" v-if="loading">
		<span uk-spinner="ratio: 4.5"></span>
	</div>

	<div class="uk-text-center" v-else-if="!all.length">
		<h1>Задач пока нет</h1>
		<p>
			<router-link :to="{ name: 'tasks-new' }" custom v-slot="{ navigate }">
				<button class="uk-button uk-button-primary" @click="navigate">Создать задачу</button>
			</router-link>
		</p>
	</div>

	<template v-else>
		<div class="uk-text-center">
			<div class="uk-margin-small">
				<button
					:class="[ 'uk-button', 'uk-label-secondary', { 'uk-button-small': currentStatus !== 'all' } ]"
					@click="setCurrentStatus('all')"
				>Все задачи ({{ all.length }})</button>
				<button 
					v-for="status of statusList"
					:key="status.name"
					:class="[ 'uk-button', status.className, { 'uk-button-small': currentStatus !== status.name } ]" 
					@click="setCurrentStatus(status.name)"
				>
					{{ status.title }} ({{ tasksByStatus(status.name).length }})
				</button>
			</div>
		</div>

		<template v-if="tasks.length">
			<div class="uk-margin-auto uk-margin-small uk-card uk-card-default uk-width-2-3@m uk-card-body uk-padding-small"
				v-for="(task, idx) of tasks"
				:class="[ `uk-animation-slide-${idx%2 ? 'right' : 'left'}` ]"
				:key="task.id"
			>
				<div class="uk-flex uk-flex-between">
					<h3 class="uk-card-title">{{ task.title }}</h3>
					<app-status :status="task.status"></app-status>
				</div>
				<p>
					<strong>
						<small>{{ new Date(task.date).toLocaleDateString() }}</small>
					</strong>
				</p>
				<router-link :to="{ name: 'tasks-id', params: { id: task.id } }" custom v-slot="{ navigate }">
					<button class="uk-button uk-button-primary uk-button-small" @click="navigate">Посмотреть</button>
				</router-link>
			</div>
		</template>

		<div class="uk-text-center" v-else>
			<h3>Пусто</h3>
		</div>
	</template>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
import AppStatus from '@/components/AppStatus'

export default {
	setup() {
		const store = useStore()

		const setCurrentStatus = status => (store.commit('tasks/SET_CURRENT_STATUS', status))

		return {
			setCurrentStatus,
			statusList: store.getters['tasks/statusList'], 
			loading: computed(() => store.getters['tasks/loading']), 
			currentStatus: computed(() => store.getters['tasks/currentStatus']), 
			all: computed(() => store.getters['tasks/all']), 
			tasks: computed(() => store.getters['tasks/filtered']),
			tasksByStatus: computed(() => store.getters['tasks/tasksByStatus'])
		}
	},

	components: { AppStatus }
}
</script>
