<template>
	<div class="uk-margin-auto uk-margin-small uk-card uk-card-default uk-width-2-3@m uk-card-body uk-padding-small" v-if="task">
		<div class="uk-flex uk-flex-between">
			<h3 class="uk-card-title">{{ task.title }}</h3>
			<a href="#" uk-icon="trash" style="color: red" @click="removeTask(id)"></a>
		</div>
		<p>
			<strong>ID</strong>: {{ task.id }}
		</p>
		<p>
			<strong>Статус</strong>: <app-status :status="task.status"></app-status>
		</p>
		<p>
			<strong>Дэдлайн</strong>: {{ new Date(task.date).toLocaleDateString() }}
		</p>
		<p>
			<strong>Описание</strong>: {{ task.description }}
		</p>

		<div v-if="task.status !== 'canceled' && task.status !== 'done'">
			<button
				class="uk-margin-right uk-button uk-label-warning uk-button-small"
				@click="changeStatus('pending')"
				v-if="task.status !== 'pending'"
			>Взять в работу</button>

			<button
				class="uk-margin-right uk-button uk-button-primary uk-button-small"
				@click="changeStatus('done')"
				v-if="task.status !== 'done'"
			>Завершить</button>

			<button
				class="uk-margin-right uk-button uk-button-danger uk-button-small"
				@click="changeStatus('canceled')"
			>Отменить</button>
		</div>
	</div>

	<div class="uk-margin-auto uk-text-center" v-else>
		<h3>Задачи с id = <strong>{{ id }}</strong> не существует</h3>

		<router-link :to="{ name: 'tasks' }" custom v-slot="{ navigate }">
			<button class="uk-button uk-button-primary" @click="navigate">Показать список</button>
		</router-link>
	</div>
</template>

<script>
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { computed, unref } from 'vue'
import AppStatus from '@/components/AppStatus'

export default {
	setup() {
		const store = useStore()
		const router = useRouter()
		const id = useRoute().params.id
		const task = computed(() => store.getters['tasks/taskByID'](id))

		const changeStatus = async status => {
			task.value.status = status
			await store.dispatch('tasks/updateTask', unref(task))
			router.push({ name: 'tasks' })
		}

		const removeTask = async () => {
			await store.dispatch('tasks/removeTask', id)
			router.push({ name: 'tasks' })
		}

		return {
			id,
			task,
			removeTask,
			changeStatus
		}
	},
	
	components: { AppStatus }
}
</script>
