import axios from 'axios';

export const fetchPosts = () => async (dispatch) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    setTimeout(async () => {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        dispatch({ type: 'SET_POSTS', payload: response.data });
        dispatch({ type: 'SET_LOADING', payload: false });
    } , 5000)
}