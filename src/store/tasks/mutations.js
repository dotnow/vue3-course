export default {
    SET_TASKS: (state, payload) => state.all = payload,

    // SET_STATUS: (state, payload) => state.all.find(s => s.id === payload.id).status = payload.status,

    SET_LOADING_STATE: (state, payload) => state.loading = !!payload,

    SET_CURRENT_STATUS: (state, payload) => state.currentStatus = payload,

    ADD_TASK: (state, payload) => state.all.unshift(payload),

    UPDATE_TASK: (state, payload) => {
        const index = state.all.findIndex(t => t.id === payload.id)

        if (index !== -1) {
            state.all[index] = JSON.parse(JSON.stringify(payload))
            console.log(state.all[index]);
        }

    },

    REMOVE_TASK: (state, payload) => state.all = state.all.filter(t => t.id !== payload)
}