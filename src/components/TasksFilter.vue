<template>
    <div class="uk-text-center">
        <div class="uk-margin-small">
            <button
                :class="[ 'uk-button', 'uk-label-secondary', { 'uk-button-small': currentStatus !== 'all' } ]"
                @click="setFilter('all')"
            >Все задачи ({{ length }})</button>

            <button 
                v-for="status of statusList"
                :key="status.name"
                :class="[ 'uk-button', status.className, { 'uk-button-small': currentStatus !== status.name } ]" 
                @click="setFilter(status.name)"
            >
                {{ status.title }} ({{ tasksByStatus(status.name).length }})
            </button>
        </div>
    </div>
</template>

<script>
import { computed, inject } from 'vue'
import { useStore } from 'vuex'

export default {
    props: ['length'],

    setup() {
		const store = useStore()
        const setFilter = status => (store.commit('tasks/SET_FILTER', status))
        
        return {
			setFilter,
			statusList: inject('statusList'), 
			currentStatus: computed(() => store.getters['tasks/currentStatus']), 
			tasksByStatus: computed(() => store.getters['tasks/tasksByStatus'])
        }
    }
}
</script>
