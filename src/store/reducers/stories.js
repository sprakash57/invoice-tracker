import { STORIES_SAGA } from "../../constants"

const initState = {
    stories: { hits: [] }
}

const storyReducer = (state = initState, action) => {
    switch (action.type) {
        case STORIES_SAGA:
            return { ...state, stories: action.data }
        default:
            return state;
    }
}

export default storyReducer;