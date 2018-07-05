export const ADD_TODO = 'ADD_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';

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