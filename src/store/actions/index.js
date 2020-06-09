import { FETCH_STORIES, STORIES_SAGA } from '../../constants';

export const fetchStories = (data) => ({ type: FETCH_STORIES, data });
export const storiesSaga = (data) => ({ type: STORIES_SAGA, data });