import axios from 'axios';
import { call, put, takeLatest, takeEvery, all} from 'redux-saga/effects';
import { FETCH_TODOS, DELETE_TODO, ADD_TODO, fetchTodosSuccess, fetchTodosFail} from "../actions/todos";


function* fetchTodos() {
    try {
        const response = yield call(() => axios.get('http://localhost:8000/v1/todos/'));
        yield put(fetchTodosSuccess(response.data));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* fetchDeleteTodo({id}) {
    try {
        yield call(() => axios.delete(`http://localhost:8000/v1/todos/${id}`));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* fetchAddTodo({todo}) {
    try {
        yield call(() => axios.post('http://localhost:8000/v1/todos/', {
            todo: {
                description: todo.description,
                complete: todo.complete
            }
        }));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* mySaga() {
    yield all([
        takeLatest(FETCH_TODOS, fetchTodos),
        takeEvery(DELETE_TODO, fetchDeleteTodo),
        takeEvery(ADD_TODO, fetchAddTodo)
    ]);
}

export default mySaga;
