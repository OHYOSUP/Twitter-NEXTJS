import { produce } from "immer";

const initialState = {
  mainPosts: [],
  imagePaths: [],
  hasMorePost: true,
  loadUserPostLoading: false,  // 로드 포스트 한개
  loadUserPostDone: false,
  loadUserPostError: null,
  loadAPostLoading: false,  // 로드 포스트 한개
  loadAPostDone: false,
  loadAPostError: null,
  loadPostLoading: false,  // 로드 포스트
  loadPostDone: false,
  loadPostError: null,
  addPostLoading: false, // 포스트 올리기
  addPostDone: false,
  addPostError: null,
  removePostLoading: false, // 포스트 삭제
  removePostDone: false,
  removePostError: null,
  addCommentLoading: false, // 댓글
  addCommentDone: false,
  addCommentError: null,
  likePostLoading: false, // 좋아요
  likePostDone: false,
  likePostError: null,
  unLikePostLoading: false, // 좋아요 해제
  unLikePostDone: false,
  unLikePostError: null,
  uploadImagesLoading: false, // 이미지 업로드
  uploadImagesDone: false,
  uploadImagesError: null,
  retwittLoading: false, // 리트윗
  retwittDone: false,
  retwittError: null,
  singlePost:null,
};
export const LOAD_HASHTAG_POSTS_REQUEST = "LOAD_HASHTAG_POST_REQUEST";
export const LOAD_HASHTAG_POSTS_SUCCESS = "LOAD_HASHTAG_POST_SUCCESS";
export const LOAD_HASHTAG_POSTS_FAILURE = "LOAD_HASHTAG_POST_FAILURE";

export const LOAD_USER_POSTS_REQUEST = "LOAD_USER_POST_REQUEST";
export const LOAD_USER_POSTS_SUCCESS = "LOAD_USER_POST_SUCCESS";
export const LOAD_USER_POSTS_FAILURE = "LOAD_USER_POST_FAILURE";

export const LOAD_A_POST_REQUEST = "LOAD_A_POST_REQUEST";
export const LOAD_A_POST_SUCCESS = "LOAD_A_POST_SUCCESS";
export const LOAD_A_POST_FAILURE = "LOAD_A_POST_FAILURE";

export const RETWITT_REQUEST = "RETWITT_REQUEST";
export const RETWITT_SUCCESS = "RETWITT_SUCCESS";
export const RETWITT_FAILURE = "RETWITT_FAILURE";

export const REMOVE_IMAGE = "REMOVE_IMAGE";

export const UPLOAD_IMAGES_REQUEST = "UPLOAD_IMAGES_REQUEST";
export const UPLOAD_IMAGES_SUCCESS = "UPLOAD_IMAGES_SUCCESS";
export const UPLOAD_IMAGES_FAILURE = "UPLOAD_IMAGES_FAILURE";

export const LIKE_POST_REQUEST = "LIKE_POST_REQUEST";
export const LIKE_POST_SUCCESS = "LIKE_POST_SUCCESS";
export const LIKE_POST_FAILURE = "LIKE_POST_FAILURE";

export const UNLIKE_POST_REQUEST = "UNLIKE_POST_REQUEST";
export const UNLIKE_POST_SUCCESS = "UNLIKE_POST_SUCCESS";
export const UNLIKE_POST_FAILURE = "UNLIKE_POST_FAILURE";

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST";
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS";
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE";

export const ADD_POST_REQUEST = "ADD_POST_REQUEST";
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS";
export const ADD_POST_FAILURE = "ADD_POST_FAILURE";

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST";
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS";
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE";

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE";

export const addPost = (data) => ({
  type: ADD_POST_REQUEST,
  data,
});
export const removePost = (data) => ({
  type: REMOVE_POST_REQUEST,
  data,
});
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      
      case LOAD_A_POST_REQUEST:
        draft.loadAPostLoading = true;
        draft.loadAPostError = null;
        draft.loadAPostDone = false;
        break;
      case LOAD_A_POST_SUCCESS:
        {          
          draft.singlePost = action.data
          draft.loadAPostLoading = false;
          draft.loadAPostDone = true;
        }
        break;
      case LOAD_A_POST_FAILURE:
        draft.loadAPostDone = false;
        draft.loadAPostError = action.error;
        break;
      case RETWITT_REQUEST:
        draft.retwittLoading = true;
        draft.retwittError = null;
        draft.retwittDone = false;
        break;
      case RETWITT_SUCCESS:
        {          
          draft.mainPosts.unshift(action.data)
          draft.retwittLoading = false;
          draft.retwittDone = true;
        }
        break;
      case RETWITT_FAILURE:
        draft.retwittDone = false;
        draft.retwittError = action.error;
        break;
      case REMOVE_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((v,i) => i !== action.data)
        break;
      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesError = null;
        draft.uploadImagesDone = false;
        break;
      case UPLOAD_IMAGES_SUCCESS:
        {
          draft.imagePaths = action.data
          draft.uploadImagesLoading = false;
          draft.uploadImagesDone = true;
        }
        break;
      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesDone = false;
        draft.uploadImagesError = action.error;
        break;
      case UNLIKE_POST_REQUEST:
        draft.unLikePostLoading = true;
        draft.unLikePostError = null;
        draft.unLikePostDone = false;
        break;
      case UNLIKE_POST_SUCCESS:
        {
          const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
          post.Likers = post.Likers.filter((v) => v.id !== action.data.UserId);
          draft.unLikePostLoading = false;
          draft.unLikePostDone = true;
        }
        break;
      case UNLIKE_POST_FAILURE:
        draft.unLikePostDone = false;
        draft.unLikePostError = action.error;
        break;
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostError = null;
        draft.likePostDone = false;
        break;
      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Likers.push({ id: action.data.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }
      case LIKE_POST_FAILURE:
        draft.likePostDone = false;
        draft.likePostError = action.error;
        break;
        case LOAD_HASHTAG_POSTS_REQUEST:
          draft.loadPostLoading = true;
          draft.loadPostDone = false;
          draft.loadPostError = null;
          break;
        case LOAD_HASHTAG_POSTS_SUCCESS:
          draft.loadPostLoading = false;
          draft.loadPostDone = true;
          draft.mainPosts = draft.mainPosts.concat(action.data);
          // 불러오는 개수가 10개 미만이면 hasmorePost가 false
          draft.hasMorePost = action.data.length === 10;
          break;
        case LOAD_HASHTAG_POSTS_FAILURE:
          draft.loadPostLoading = false;
          draft.loadPostError = action.error;
          break;
        case LOAD_USER_POSTS_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_USER_POSTS_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        // 불러오는 개수가 10개 미만이면 hasmorePost가 false
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_USER_POSTS_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;
      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.data);
        // 불러오는 개수가 10개 미만이면 hasmorePost가 false
        draft.hasMorePost = action.data.length === 10;
        break;
      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.error;
        break;
      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;
      case REMOVE_POST_SUCCESS:
        draft.mainPosts = draft.mainPosts.filter(
          (v) => v.id !== action.data.PostId
        );
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.error;
        break;
      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;
      case ADD_POST_SUCCESS:
        draft.mainPosts.unshift(action.data);
        draft.imagePaths = [];
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.imagePaths = []
        break;
      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.error;
        break;
      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        draft.addCommentError = null;
        break;
      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.data.PostId);
        post.Comments.unshift(action.data);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }
      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addCommentError = action.error;
        break;
      default:
        break;
    }
  });
export default reducer;
