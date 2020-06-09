import { put, takeLatest } from 'redux-saga/effects';
import { URL, FETCH_STORIES } from "../../constants";
import { storiesSaga } from "../actions";

function* dispatchStories(action) {
    let response = { message: 'Internal Server Error' };
    try {
        response = yield fetch(`${URL}/?query=page=${action.data}`).then(data => data.json())
        yield put(storiesSaga(response));
    } catch (error) {
        yield put(storiesSaga(response));
    }
}

export default function* watchStories() {
    yield takeLatest(FETCH_STORIES, dispatchStories);
}