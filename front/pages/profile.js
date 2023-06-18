import Head from "next/dist/next-server/lib/head";
import NickNameEditForm from "../components/NickNameEditForm";
import FollowList from "../components/FollowList";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/dist/client/router";
import AppLayout from "../components/AppLayout";
import useSWR from "swr";
import axios from "axios";
import { backUrl } from "../config/config";
import wrapper from "../store/configureStore";
import { END } from "redux-saga";
import { LOAD_MY_INFO_REQUEST } from "../reducers/user";

const fetcher = (url) => axios.get(url, { withCredentials: true }).then((result) => result.data);

const Profile = () => {
  const [followersLimit, setFollowersLimit] = useState(3)
  const [followingsLimit, setFollowingsLimit] = useState(3)

  const { me } = useSelector((state) => state.user);
  const router = useRouter();
  const { data: followersData, error: follwersError, isLoading: follwerIsLoading } = useSWR(
    `${backUrl}/user/followers?limit=${followersLimit}`,
    fetcher
  );
  const { data: followingsData, error: followingsError, isLoading: follwingIsLoading } = useSWR(
    `${backUrl}/user/followings?limit=${followingsLimit}`,
    fetcher
  );

  useEffect(() => {
    if (!me) {
      router.push("/");
    }
  }, [me, router]);

  const loadMoreFollowers = ()=>{
    setFollowersLimit(prev => prev+3)
  }
  const loadMoreFollowings = ()=>{
    setFollowingsLimit(prev => prev+3)
  }
  if (!me) {
    return <div>내 정보 로딩중입니다</div>;
  }

  // if (follwersError || followingsError) {
  //   console.log(follwersError || followingsError);
  //   return <div>팔로잉/팔로워 로딩중 에러가 발생했습니다</div>;
  // }

  return (
    <div>
      <Head>
        <title>Profile | Twiiter</title>
      </Head>
      <div>
        <AppLayout />
        <NickNameEditForm />
        <FollowList header="팔로잉" data={followingsData} onClickMore={loadMoreFollowings} loading={follwingIsLoading} />
        <FollowList header="팔로워" data={followersData} onClickMore={loadMoreFollowers} loading={follwerIsLoading} />
      </div>
    </div>
  );
};
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      console.log("getServerSideProps start");
      console.log(req.headers);
      const cookie = req ? req.headers.cookie : "";
      axios.defaults.headers.Cookie = "";
      if (req && cookie) {
        axios.defaults.headers.Cookie = cookie;
      }
      store.dispatch({
        type: LOAD_MY_INFO_REQUEST,
      });
      store.dispatch(END);
      console.log("getServerSideProps end");  
      await store.sagaTask.toPromise();      
    }
);

export default Profile;
