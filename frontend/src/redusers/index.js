import { combineReducers } from 'redux';
import todos, { TODOS_DEFAULT_STATE } from './todos'

const todoAPP = combineReducers({
   todos
});

export const DEFAULT_STATE = {
    todos: TODOS_DEFAULT_STATE
};

export default todoAPP;
