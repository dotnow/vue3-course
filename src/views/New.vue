<template>
	<form class="uk-margin-auto uk-margin-small uk-card uk-card-default uk-width-2-3@m uk-card-body uk-padding-small" @submit.prevent="onSubmit">
		<fieldset class="uk-fieldset">
			<legend class="uk-legend">Создать новую задачу</legend>

			<div class="uk-margin">
				<label class="uk-form-label" for="title">Название</label>
				<div class="uk-form-controls">
					<input class="uk-input" id="title" type="text" v-model.trim="title">
				</div>
			</div>

			<div class="uk-margin">
				<label class="uk-form-label" for="date">Дата дэдлайна</label>
				<div class="uk-form-controls">
					<input class="uk-input" id="date" type="date" v-model="date">
				</div>
			</div>

			<div class="uk-margin">
				<label class="uk-form-label" for="description">Описание</label>
				<div class="uk-form-controls">
					<textarea class="uk-textarea" id="description" rows="5" v-model.trim="description"/>
				</div>
			</div>
		</fieldset>

		<button class="uk-button uk-button-primary" :disabled="isDisabled">Создать</button>
	</form>
</template>


<script>
import { computed, ref, unref } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
	setup() {
		const msDay = 86400000 // Сутки в милисекундах
		const store = useStore()
		const router = useRouter()
		const title = ref('')
		const description = ref('')
		const date = ref(new Date().toISOString().split('T')[0])
		const isDisabled = computed(() => (title.value.length < 3 || description.value.length < 5 || !date.value.length))
		const isBefore = computed(() => new Date(date.value) < new Date() - msDay)

		const onSubmit = async () => {
			if (isDisabled.value) {
				return
			}

			const dateValue = new Date(date.value)

			await store.dispatch('tasks/newTask', {
				title: unref(title),
				status: isBefore.value ? 'canceled' : 'active',
				description: unref(description),
				date: dateValue
			})

			router.push({ name: 'tasks' })
		}

		return {
			title,
			date,
			description,
			onSubmit,
			isDisabled
		}
	}
}
</script>