import {
    ADD_TODO,
    FETCH_TODOS,
    FETCH_TODOS_SUCCESS,
    FETCH_TODOS_FAIL,
    DELETE_TODO } from '../actions/todos';

let initialState = {
    todos: {
        items: [],
        isLoading: true,
        error: ''
    }
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    items: state.todos.items.concat(action.todo)
                }
            };
        case FETCH_TODOS:
            return state;
        case FETCH_TODOS_SUCCESS:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    items: action.todos,
                    isLoading: false
                }
            };
        case FETCH_TODOS_FAIL:
            return {
                ...state,
                todos: {
                    ...state.todos,
                    error: action.message
                }
            };
        case DELETE_TODO:
            return {
                ...state.todos,
                todos: state.todos.filter((todo) => todo.id !== action.id)
            };
        default:
            return state;
    }

}
