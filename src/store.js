import {  createStore } from 'redux'
import { applyMiddleware } from 'redux'
import { thunk } from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
    posts : [],
    currentPage : 1,
    perPage : 6 ,
     loading: true,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.payload,
            }
        case 'SET_PAGE':
            return {
                ...state,
                currentPage: action.payload
            }
        case 'REMOVE_POST': 
            const updatedPosts = state.posts.filter(post => post.id !== action.payload)
            return {
                ...state,
                posts: updatedPosts
            }
        case 'SET_LOADING': {
            return {
                ...state,
                loading: action.payload
            }
        }
        default:
            return state
    }
}


const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))

);

export default store;


