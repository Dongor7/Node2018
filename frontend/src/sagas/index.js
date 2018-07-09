import axios from 'axios';
import { call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import { FETCH_TODOS, DELETE_TODO, fetchTodosSuccess, fetchTodosFail, deleteTodo } from "../actions/todos";


function* fetchTodos() {
    try {
        const response = yield call(() => axios.get('http://localhost:4000/v1/todos/'));
        yield put(fetchTodosSuccess(response.data));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* fetchDeleteTodo(action) {
    try {
        yield call(() => axios.delete(`http://localhost:4000/v1/todos/${action.id}`));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* mySaga() {
    yield all([
        takeLatest(FETCH_TODOS, fetchTodos),
        takeEvery(DELETE_TODO, fetchDeleteTodo)
    ]);
}

export default mySaga;
