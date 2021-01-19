export default {
    all: [],
    loading: true,
    ccurrentDate: new Date(),
    currentStatus: 'all',
    statusList: [
        { name: 'active', className: 'uk-label-success', title: 'Активна' },
        { name: 'pending', className: 'uk-label-warning', title: 'В работе' },
        { name: 'canceled', className: 'uk-label-danger', title: 'Отмена' },
        { name: 'done', className: 'uk-button-primary', title: 'Выполнена' }
    ],
}