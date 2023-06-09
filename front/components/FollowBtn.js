import { Button } from "antd";
import React, { useCallback } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from "../reducers/user";

const FollowBtn = ({ post }) => {
  const { me, followLoading, unFollowLoading } = useSelector(
    (state) => state.user
  );
  const isFollowing = me?.Followings?.find((v) => v.id === post.User.id);
  const dispatch = useDispatch();
  const onFollowClick = useCallback(() => {
    if (isFollowing) {
      dispatch({
        type: UNFOLLOW_REQUEST,
        data: post.User.id,
      });
    } else {
      dispatch({
        type: FOLLOW_REQUEST,
        data: post.User.id,
      });
    }
  }, [isFollowing]);
  if(post.User.id ===me.id){
    return null
  }
  return (
    <Button loading={followLoading || unFollowLoading} onClick={onFollowClick}>
      {isFollowing ? "언팔로우" : "팔로우"}
    </Button>
  );
};

FollowBtn.propTypes = {
  post: PropTypes.object.isRequired,
};

export default FollowBtn;
