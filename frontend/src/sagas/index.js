import axios from 'axios';
import { call, put, takeLatest} from 'redux-saga/effects';
import { FETCH_TODOS, fetchTodosSuccess, fetchTodosFail } from "../actions/todos";

function* fetchTodos() {
    try {
        const response = yield call(() => axios.get('http://localhost:4000/v1/todos/'));
        //throw new Error("Some error");
        yield put(fetchTodosSuccess(response.data));
    } catch (e) {
        yield put(fetchTodosFail(e.message));
    }
}

function* mySaga() {
    yield takeLatest(FETCH_TODOS, fetchTodos);
}

export default mySaga;
