import { all } from 'redux-saga/effects';
import watchStories from '../sagas/stories';

export default function* rootSaga() {
    yield all([
        watchStories()
    ])
}