import * as types from "./actionTypes";
import axios from "axios";

// api_url = https://create-event-mern-stack-app.vercel.app

const getList = (params = {}) => (dispatch) => {

    dispatch({ type: types.GET_TO_LIST_REQUEST });

    axios
        .get('https://create-event-mern-stack-app.vercel.app/create', params)
        .then((res) => {
            // console.log('res: ', res);
            dispatch({ type: types.GET_TO_LIST_SUCCESS, payload: res.data });
        })
        .catch((error) => {
            console.log('error: ', error);
            dispatch({ type: types.GET_TO_LIST_FAILURE });
        })
}



const addToList = (body) => (dispatch) => {

    dispatch({ type: types.POST_TO_LIST_REQUEST });

    return axios
        .post('https://create-event-mern-stack-app.vercel.app/create/addtolist', body)
        .then((res) => {
            // console.log('res: ', res);
            alert(res.data.message);
            dispatch({ type: types.POST_TO_LIST_SUCCESS });
        })
        .catch((error) => {
            console.log('error: ', error);
            dispatch({ type: types.POST_TO_LIST_FAILURE });
        })
}



const postEvent = (body) => (dispatch) => {

    dispatch({ type: types.POST_EVENT_REQUEST });

    return axios
        .post('https://create-event-mern-stack-app.vercel.app/create/addevent', body)
        .then((res) => {
            alert(res.data.message);
            dispatch({ type: types.POST_TO_LIST_SUCCESS });
        })
        .catch((error) => {
            console.log('error: ', error);
            dispatch({ type: types.POST_TO_LIST_FAILURE });
        })
}



const getEvent = (params = {}) => (dispatch) => {

    dispatch({ type: types.GET_EVENT_REQUEST });

    axios
        .get('https://create-event-mern-stack-app.vercel.app/create/getevent', params)
        .then((res) => {
            // console.log('res: ', res);
            dispatch({ type: types.GET_EVENT_SUCCESS, payload: res.data });
        })
        .catch((error) => {
            console.log('error: ', error);
            dispatch({ type: types.GET_EVENT_FAILURE });
        })
}



const deleteEvent = (id) => (dispatch) => {

    dispatch({ type: types.DELETE_EVENT_REQUEST });

    return axios
        .delete(`https://create-event-mern-stack-app.vercel.app/create/delete/${id}`)
        .then((res) => {
            alert(res.data.message);
            dispatch({ type: types.DELETE_EVENT_SUCCESS });
        })
        .catch((error) => {
            console.log('error: ', error);
            dispatch({ type: types.DELETE_EVENT_FAILURE });
        })
}



export { getList, addToList, postEvent, getEvent, deleteEvent };
