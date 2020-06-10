import { FETCH_STORIES, STORIES_SAGA, SET_VOTES, SET_NEWS } from '../../constants';

export const fetchStories = (data) => ({ type: FETCH_STORIES, data });
export const storiesSaga = (data) => ({ type: STORIES_SAGA, data });
export const storeVotes = data => ({ type: SET_VOTES, data });
export const storeNews = data => ({ type: SET_NEWS, data });