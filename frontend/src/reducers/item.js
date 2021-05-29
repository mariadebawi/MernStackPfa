import { ACTION_TYPES } from "../actions/item";

const initialState = {
    items: [],
    itemMeta: {}
}

export const item = (state = initialState, action) => {
    switch (action.type) {
        case ACTION_TYPES.ITEM_FETCH_ALL:
            return {
                ...state,
                items: [...action.payload]
            }
        case ACTION_TYPES.ITEM_CREATE:
            return {
                ...state,
                items: [...state.items, action.payload]
            }
        case ACTION_TYPES.ITEM_UPDATE:
            return {
                ...state,
                items: state.items.map(x => x.id === action.payload.id ? action.payload : x)
            }
        case ACTION_TYPES.ITEM_DELETE:
            return {
                ...state,
                items:state.items.filter(x => x.id !== action.payload)
            }
        case ACTION_TYPES.ITEM_PAGINATION:
            return {
                ...state,
                items: [...action.payload.items],
                itemMeta: action.payload.meta
            }
        default:
            return state;
    }
}