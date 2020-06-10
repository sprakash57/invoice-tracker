import { STORIES_SAGA, SET_VOTES, SET_NEWS } from "../../constants"

const initState = {
    stories: { hits: [] },
    votes: [],
    news: [],
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case STORIES_SAGA:
            return { ...state, stories: action.data }
        case SET_VOTES:
            return { ...state, votes: action.data }
        case SET_NEWS:
            return { ...state, news: action.data }
        default:
            return state;
    }
}

export default storyReducer;