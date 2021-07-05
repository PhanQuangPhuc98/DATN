import {
    FETCH_ROOM_SUCCESS,
    FETCH_ROOM_ERROR,
    REGISTER_ROOM,
    FECTH_MESSSAGE_SUCCESS,
    FECTH_MESSSAGE_ERROR
} from '../actions/types';

const INITIAL = {
    loading: false,
    messages: [],
    roomKey: null
};

export default function (state = INITIAL, action) {
    switch (action.type) {
        case FETCH_ROOM_SUCCESS:
            return { ...state, loading: false, roomKey: action.roomKey };
        case FETCH_ROOM_ERROR:
            return { ...state, loading: true };
        case REGISTER_ROOM:
            return { ...state, roomKey: action.payload.roomKey };
        case FECTH_MESSSAGE_SUCCESS:
            return { ...state, loading: false, messages: action.messages };
        case FECTH_MESSSAGE_ERROR:
            return { ...state, loading: false };
        default:
            break;
    }
    return state;
}
