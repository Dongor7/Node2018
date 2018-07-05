import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { FETCH_TODOS } from "../actions/todos";

function* fetchTodos() {
    try {
        const data = yield call(
            () => {

                let todos;

                axios.get('http://localhost:4000/v1/todos/')
                    .then(res => {
                        todos = res.data
                    })
                    .catch(error => this.setState({ error: error.message }));
            }
        );
        yield put({type: FETCH_TODOS, data});
    } catch (e) {
        console.log(e.message);
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery(FETCH_TODOS, fetchTodos);
}


export default mySaga;
