import { all, call, delay, fork, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  ADD_COMMENT_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_POST_FAILURE,
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  UNLIKE_POST_REQUEST,
  UNLIKE_POST_SUCCESS,
  LIKE_POST_FAILURE,
  LIKE_POST_REQUEST,
  LIKE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  UPLOAD_IMAGES_FAILURE,
  RETWITT_REQUEST,
  RETWITT_SUCCESS,
  RETWITT_FAILURE,
  LOAD_A_POST_SUCCESS,
  LOAD_A_POST_FAILURE,
  LOAD_A_POST_REQUEST,
  LOAD_USER_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_USER_POSTS_FAILURE,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from "../reducers/post";
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";

function loadPostAPI(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}
function* loadPost(action) {
  try {
    const result = yield call(loadPostAPI, action.lastId);
    // const id = shortId.generate();
    yield put({
      type: LOAD_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: LOAD_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addPostAPI(data) {
  //{withCredentials: true} = 브라우저와 서버는 서로 도메인이 다르다.
  // 그래서로그인을 하고 포스팅을 해도 서버는 이놈이 로그인한 그놈인지 알지 못한다.
  // 그걸 알려주는게 {withCredentials: true}
  // 서버에서 cors({origin: "*", credentials:true})설정해준것처럼 front에서도
  // 해줘야 한다.
  // 근데 이부부은 중복되는 부분이니 index에서 axios.defaults.withCredentials = true; 로 한번에 설정해 주도록 하자
  return axios.post("/post", data);
}
function* addPost(action) {
  try {
    const result = yield call(addPostAPI, action.data);
    yield put({
      type: ADD_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: ADD_POST_TO_ME,
      data: result.data.id,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function removePostAPI(data) {
  return axios.delete(`post/${data}`);
}
function* removePost(action) {
  try {
    const result = yield call(removePostAPI, action.data);
    yield put({
      type: REMOVE_POST_SUCCESS,
      data: result.data,
    });
    yield put({
      type: REMOVE_POST_OF_ME,
      data: action.data,
    });
  } catch (err) {
    console.log(err);
    yield put({
      type: REMOVE_POST_FAILURE,
      data: err.response.data,
    });
  }
}

function addCommentAPI(data) {
  return axios.post(`/post/${data.postId}/comment`, data);
}
function* addComment(action) {
  try {
    const result = yield call(addCommentAPI, action.data);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: ADD_COMMENT_FAILURE,
      error: err.response.data,
    });
  }
}
function likePostAPI(data) {
  return axios.patch(`/post/${data}/like`);
}

function* likePost(action) {
  try {
    const result = yield call(likePostAPI, action.data);
    yield put({
      type: LIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: LIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function unLikePostAPI(data) {
  return axios.delete(`/post/${data}/like`);
}

function* unLikePost(action) {
  try {
    const result = yield call(unLikePostAPI, action.data);
    yield put({
      type: UNLIKE_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: UNLIKE_POST_FAILURE,
      error: err.response.data,
    });
  }
}
function uploadImagestAPI(data) {
  return axios.post(`/post/images`, data);
}

function* uploadImages(action) {
  try {
    const result = yield call(uploadImagestAPI, action.data);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: UPLOAD_IMAGES_FAILURE,
      error: err.response.data,
    });
  }
}

function retwittAPI(data) {
  return axios.post(`/post/${data}/retwitt`, data);
}

function* retwitt(action) {
  try {
    const result = yield call(retwittAPI, action.data);
    yield put({
      type: RETWITT_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: RETWITT_FAILURE,
      error: err.response.data,
    });
  }
}

function loadAPostAPI(data) {
  return axios.get(`/post/${data}`);
}
function* loadAPost(action) {
  try {
    const result = yield call(loadAPostAPI, action.data);
    yield put({
      type: LOAD_A_POST_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err)
    yield put({
      type: LOAD_A_POST_FAILURE,
      error: err.response.data,
    });
  }
}

function loadUserPostsAPI(data, lastId){
  return axios.get(`/user/${data}/posts?lastId=${lastId || 0}`)
}
function* loadUserPosts(action){
  try{
    const result = yield call(loadUserPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      data: result.data
    })
  }catch(err){
    console.error(err)
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      error: err.response.data,
    })
  }
}

function loadHAshTagPostsAPI(data, lastId){
  return axios.get(`/hashtag/${encodeURIComponent(data)}?lastId=${lastId || 0}`);
}
function* loadHashtagPosts(action){
  try{
    console.log('loadHashtag console');
    const result = yield call(loadHAshTagPostsAPI, action.data, action.lastId)
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      data: result.data
    })
  }catch(err){
    console.error(err)
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      data: err.response.data
    })
  }

}

function* watchAddPost() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* loadMorePost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchUnLikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}
function* watchUploadImages() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImages);
}
function* watchRetwitt() {
  yield takeLatest(RETWITT_REQUEST, retwitt);
}
function* watchAPost() {
  yield takeLatest(LOAD_A_POST_REQUEST, loadAPost);
}
function* watchUserAPost() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}
function* watchHashtagPost() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchRemovePost),
    fork(watchAddComment),
    fork(loadMorePost),
    fork(watchLikePost),
    fork(watchUnLikePost),
    fork(watchUploadImages),
    fork(watchRetwitt),
    fork(watchAPost),
    fork(watchUserAPost),
    fork(watchHashtagPost),

  ]);
}
