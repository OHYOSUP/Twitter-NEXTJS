import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOAD_POST_REQUEST } from "../reducers/post";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";
import PostForm from "../components/Postform";
import PostCard from "../components/PostCard";
import AppLayout from "../components/AppLayout";
import wrapper from "../store/configureStore";
import axios from "axios";
import { END } from "redux-saga";

const Home = () => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { mainPosts, hasMorePost, loadPostLoading, retwittError } = useSelector(
    (state) => state.post
  );

  useEffect(() => {
    if (retwittError) {
      alert(retwittError);
    }
  }, [retwittError]);

  // useEffect(() => {
  //   dispatch({
  //     type: LOAD_USER_REQUEST,
  //   });
  //   dispatch({
  //     type: LOAD_POST_REQUEST,
  //   });
  // }, []);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMorePost && !loadPostLoading) {
          const lastId = mainPosts[mainPosts.length - 1]?.id;
          dispatch({
            type: LOAD_POST_REQUEST,
            lastId,
          });
        }
      }
    }
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [hasMorePost, loadPostLoading]);
  return (
    <AppLayout children={undefined}>
      {me && <PostForm />}
      {mainPosts?.map((post) => {
        return <PostCard post={post} />;
      })}
    </AppLayout>
  );
};




export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      // 프론트서버에서 쿠키를 공유하는 문제 해결하기 위한 로직
      // 서버와 쿠키가 있을때만 쿠키를 넣어준다.
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch({
        type: LOAD_POST_REQUEST,
      });
      store.dispatch(END);
      await store.sagaTask.toPromise();
      
      
    }
);

export default Home;
