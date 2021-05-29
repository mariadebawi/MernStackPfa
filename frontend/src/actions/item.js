import API from "../utils/api";

export const ACTION_TYPES = {
    ITEM_CREATE: 'ITEM_CREATE',
    ITEM_UPDATE: 'ITEM_UPDATE',
    ITEM_DELETE: 'ITEM_DELETE',
    ITEM_FETCH: 'ITEM_FETCH',
    ITEM_FETCH_ALL: 'ITEM_FETCH_ALL',
    ITEM_PAGINATION: 'ITEM_PAGINATION'
}

const formatingInput = (input) => {

    return input
}

export const fetchAll = () => dispatch => {
    API.item().fetchAll()
        .then(res => {
            dispatch({
                type: ACTION_TYPES.ITEM_FETCH_ALL,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const Pagination = (page = 1, limit = 10, name = "") => dispatch => {
    API.item().fetchPagination(page, Math.abs(limit), name)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.ITEM_PAGINATION,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}

export const fetchById = (id, onSuccess) => dispatch => {
    API.item().fetchById(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.ITEM_FETCH,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}

export const create = (input, onSuccess) => dispatch => {
    const formattedData = formatingInput(input)
    API.item().create(formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.ITEM_CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, input, onSuccess) => dispatch => {
    const formattedData = formatingInput(input)
    API.item().update(id, formattedData)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.ITEM_UPDATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    API.item().delete(id)
        .then(res =>{
            dispatch({
                type: ACTION_TYPES.ITEM_DELETE,
                payload: res.data.id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}