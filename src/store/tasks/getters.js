export default {
    loading: state => state.loading,

    statusList: state => state.statusList,

    currentStatus: state => state.currentStatus,

    all: state => state.all,

    filtered: state => state.currentStatus === 'all' ? state.all : state.all.filter(t => t.status === state.currentStatus),

    taskByID: state => id => state.all.find(t => t.id === id),

    tasksByStatus: state => status => state.all.filter(t => t.status === status)
}