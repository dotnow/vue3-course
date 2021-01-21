<template>
	<span :class="['uk-label', label.className]">{{ label.title }}</span>
</template>

<script>
import { computed, inject, toRefs } from 'vue'

export default {
	props: ['status'],

	setup(props) {
		const { status } = toRefs(props)
		const statusList = inject('statusList')
		const label = computed(() => statusList.find(s => s.name === (status.value ?? 'active')))

		return { label }
	}
}
</script>