import { STORIES_SAGA, SET_VOTES } from "../../constants"

const initState = {
    stories: { hits: [] },
    votes: []
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case STORIES_SAGA:
            return { ...state, stories: action.data }
        case SET_VOTES:
            return { ...state, votes: action.data }
        default:
            return state;
    }
}

export default storyReducer;