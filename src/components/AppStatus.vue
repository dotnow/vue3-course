<template>
	<span :class="['uk-label', label.className]">{{ label.title }}</span>
</template>

<script>
import { computed, toRefs } from 'vue'
import { useStore } from 'vuex'

export default {
	props: {
		status: {
			type: String,
			default: 'active'
		}
	},

	setup(props) {
		const { status } = toRefs(props)
		const store = useStore()
		const statusList = computed(() => store.getters['tasks/statusList'])
		const label = computed(() => statusList.value.find(s => s.name === (status.value ?? 'active')))

		return { label }
	}
}
</script>