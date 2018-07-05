import { ADD_TODO, FETCH_TODOS } from '../actions/todos';

let initialState = {
    todos: {
        items: [],
        isLoading: false,
        error: ''
    }
};

export default function (state = initialState, action) {

    switch (action.type) {
        case ADD_TODO:
            return {
                ...state,
                todos: {
                    items: state.todos.items.concat(action.todo)
                }
            };
        case FETCH_TODOS:
            return {
                ...state,
                todos: action.todos
            };
        default:
            return state;
    }

}