import { all, fork } from "redux-saga/effects";
import postSaga from "./post";
import userSaga from "./user";
import axios from "axios";
import { backUrl } from '../config/config';
//? {withCredentials: true} = 브라우저와 서버는 서로 도메인이 다르다.
//? 그래서로그인을 하고 포스팅을 해도 서버는 이놈이 로그인한 그놈인지 알지 못한다.
//? 그걸 알려주는게 {withCredentials: true}
//? 서버에서 cors({origin: "*", credentials:true})설정해준것처럼 front에서도
//? 해줘야 한다.
//! withCredentials = true로 설정해줬으면 back에서는 front의 정확한 주소를 입력해줘야 한다.
axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
  yield all([fork(userSaga), fork(postSaga)]);
}
