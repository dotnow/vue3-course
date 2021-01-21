<template>
	<div class="uk-text-center" v-if="loading">
		<span uk-spinner="ratio: 4.5"></span>
	</div>

	<div class="uk-text-center" v-else-if="!all.length">
		<h1>Задач пока нет</h1>
		<div>
			<router-link :to="{ name: 'tasks-new' }" custom v-slot="{ navigate }">
				<button class="uk-button uk-button-primary" @click="navigate">Создать задачу</button>
			</router-link>
		</div>
	</div>

	<template v-else>

		<tasks-filter :length="all.length"></tasks-filter>

		<template v-if="tasks.length">
			<div class="uk-margin-auto uk-margin-small uk-card uk-card-default uk-width-2-3@m uk-card-body uk-padding-small"
				v-for="(task, idx) of tasks"
				:class="[ `uk-animation-slide-${idx % 2 ? 'right' : 'left'}` ]"
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
import TasksFilter from '@/components/TasksFilter'

export default {
	setup() {
		const store = useStore()

		return {
			loading: computed(() => store.getters['tasks/loading']), 
			all: computed(() => store.getters['tasks/all']), 
			tasks: computed(() => store.getters['tasks/filtered'])
		}
	},

	components: { AppStatus, TasksFilter }
}
</script>
