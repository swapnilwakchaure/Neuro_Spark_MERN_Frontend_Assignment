import * as types from "./actionTypes";

const initState = {
    eventlist: [],
    list: [],
    isLoading: false,
    isError: false
}

// action = { type, payload };

const reducer = (state = initState, { type, payload }) => {
    switch (type) {

        // get the list of participants
        case types.GET_TO_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.GET_TO_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: payload,
                isError: false
            }
        case types.GET_TO_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // post the new participant data into the database
        case types.POST_TO_LIST_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.POST_TO_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: [...state.list, payload],
                isError: false
            }
        case types.POST_TO_LIST_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // post events with title and participants cases
        case types.POST_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.POST_EVENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventlist: [...state.eventlist, payload],
                isError: false
            }
        case types.POST_EVENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        // get the all event with title and number of participants
        case types.GET_EVENT_REQUEST:
            return {
                ...state,
                isLoading: true,
                isError: false
            }
        case types.GET_EVENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                eventlist: payload
            }
        case types.GET_EVENT_FAILURE:
            return {
                ...state,
                isLoading: false,
                isError: true
            }

        default:
            return state;
    }
}


export { reducer };
