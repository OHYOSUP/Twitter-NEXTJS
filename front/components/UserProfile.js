import { Avatar, Card, Button } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutRequestAction } from "../reducers/user";
import Link from "next/link";

const UserProfile = () => {
  const { Meta } = Card;
  const dispatch = useDispatch();
  const { me, logOutLoading } = useSelector((state) => state.user);

  const onLogout = useCallback(() => {
    dispatch(logoutRequestAction());
  }, []);

  return (
    <div>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <div key="Twitt">
            <Link href={`user/${me.id}`}>
              <a>
                내 트윗
                <br />
                {me?.Posts?.length}
              </a>
            </Link>
          </div>,
          <div key="Followrs">
            <Link href={`/profile`}>
              <a>
                팔로워
                <br />
                {me?.Followers?.length}
              </a>
            </Link>
          </div>,
          <div key="Like">
            <Link href={`/profile`}>
              <a>
                팔로잉
                <br />
                {me?.Followings?.length}
              </a>
            </Link>
          </div>,
        ]}
      >
        <Meta
          avatar={
            <Link href={`/user/${me.id}`}>
              <a>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel">
                  가나다
                </Avatar>
              </a>
            </Link>
          }
          title={me?.nickname}
          description={
            <Button loading={logOutLoading} onClick={onLogout}>
              로그이웃
            </Button>
          }
        />
      </Card>
    </div>
  );
};
export default UserProfile;
