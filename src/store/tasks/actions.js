import { getAll, addOrUpdate, remove } from '@/api'

export default {
    fetchAll: async ({ commit }) => {
        let tasks = await getAll()

        if (tasks) {
            commit('SET_TASKS', Object.values(tasks))
        }

        commit('SET_LOADING_STATE', false)
    },

    newTask: async ({ commit }, payload) => {
        const task = await addOrUpdate(payload)
        commit('ADD_TASK', task)
    },

    updateTask: async ({ commit }, payload) => {
        let task = await addOrUpdate(payload)

        if (task) {
            commit('UPDATE_TASK', task)
        }
    },

    removeTask: async ({ commit }, payload) => {
        await remove(payload)
        commit('REMOVE_TASK', payload)
    }
}