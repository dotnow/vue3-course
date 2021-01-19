import UIkit from 'uikit'
import { v4 as uuid } from 'uuid'

const sendMessage = message => {
    UIkit.notification({ message, status: 'success' })
}

const sendError = message => {
    UIkit.notification({ message, status: 'danger' })
}

export const getAll = async () => {
    let tasks = {}

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }

    await fetch(`https://vue-course-9bd3f-default-rtdb.firebaseio.com/tasks.json`, requestOptions)
        .then(response => response.json())
        .then(data => (tasks = data))
        .catch(error => (sendError(`Ошибка: ${error.message}`)))

    return tasks
}

export const addOrUpdate = async payload => {
    const id = payload.id

    if (!id) {
        payload.id = uuid()
    }

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    }

    await fetch(`https://vue-course-9bd3f-default-rtdb.firebaseio.com/tasks/${payload.id}.json`, requestOptions)
        .then(response => response.json())
        .then(() => sendMessage(`Задача успешно ${id ? 'обновлена' : 'создана'}`))
        .catch(error => (sendError(`Ошибка: ${error.message}`)))

    return payload
}

export const remove = async id => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    }

    await fetch(`https://vue-course-9bd3f-default-rtdb.firebaseio.com/tasks/${id}.json`, requestOptions)
        .then(response => response.json())
        .then(() => (sendMessage('Задача успешно удалена')))
        .catch(error => (sendError(`Ошибка: ${error.message}`)))
}