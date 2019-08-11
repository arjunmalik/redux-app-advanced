import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => (dispatch, getState) => {
  dispatch(fetchPosts()).then(() =>{
    let  userIds = getState().posts.map(post => post.userId);
    userIds = userIds.filter((v,i) => userIds.indexOf(v) === i);
    userIds.map(u => {
      dispatch(fetchUser(u));
    });
  })
};

export const fetchPosts =  () => dispatch => {
  return jsonPlaceholder.get('/posts').then(response =>
    dispatch({
      type: 'FETCH_POSTS',
      payload: response.data
    }));
  }

export const fetchUser = (id) => dispatch => {
  return jsonPlaceholder.get( `/users/${id}`).then(response =>
    dispatch({
      type: 'FETCH_USER',
      payload: response.data
    }));
  }
