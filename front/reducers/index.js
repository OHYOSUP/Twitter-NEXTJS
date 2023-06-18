import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";
import user from "./user";
import post from "./post";

//? HYDRATE : 서버사이드 랜더링을 위한 것
// combineReducers = reducer 합치기
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      // console.log('HYDRATE', action);
      const nextState = {
        ...state, 
        ...action.payload,
      };
      if (state.user) nextState.user = state.user;
      // if (state.post) nextState.post = state.post;

      return nextState;
    default: {
      const combinedReducer = combineReducers({
        user,
        post,
      });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
