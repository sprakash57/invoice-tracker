import { FETCH_STORIES, STORIES_SAGA, SET_VOTES } from '../../constants';

export const fetchStories = (data) => ({ type: FETCH_STORIES, data });
export const storiesSaga = (data) => ({ type: STORIES_SAGA, data });
export const storeVotes = data => ({ type: SET_VOTES, data });