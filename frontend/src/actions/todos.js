export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';
export const FETCH_TODOS_SUCCESS = 'FETCH_TODOS_SUCCESS';
export const FETCH_TODOS_FAIL = 'FETCH_TODOS_FAIL';

export function addTodo(todo) {
    return {
        type: ADD_TODO,
        todo: {
            description: todo,
            complete: false
        }
    }
}

export function fetchTodos() {
    return {
        type: FETCH_TODOS
    }
}

export function fetchTodosSuccess(todos) {
    return {
        type: FETCH_TODOS_SUCCESS,
        todos
    }
}

export function fetchTodosFail(message) {
    return {
        type: FETCH_TODOS_FAIL,
        message
    }
}

export function deleteTodo(id) {
    return {
        type: DELETE_TODO,
        id
    }
}
