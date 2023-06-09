import React, { useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import shortId from "shortid";
import { Avatar, Button, Card, Comment, List, Popover } from "antd";
import {
  EllipsisOutlined,
  HeartOutlined,
  MessageOutlined,
  RetweetOutlined,
  HeartTwoTone,
} from "@ant-design/icons";
import PostImages from "./PostImages";
import { useDispatch, useSelector } from "react-redux";
import CommentForm from "./CommentForm";
import PostCardContent from "./PostCardContent";
import {
  LIKE_POST_REQUEST,
  REMOVE_POST_REQUEST,
  RETWITT_REQUEST,
  UNLIKE_POST_REQUEST,
} from "../reducers/post";
import FollowBtn from "./FollowBtn";
import Link from "next/link";
import moment from "moment";

moment.locale("ko");


const PostCard = ({post} ) => {
  const [commentFormOpen, setCommentFormOpen] = useState(false);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.user.me?.id);
  const Like = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({
      type: LIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const Unlike = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({
      type: UNLIKE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const toggleCommentFormOpen = useCallback(() => {
    setCommentFormOpen((prev) => !prev);
  }, []);

  const { removePostLoading, retwittError } = useSelector(
    (state) => state.post
  );

  const onRemovePost = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    dispatch({
      type: REMOVE_POST_REQUEST,
      data: post.id,
    });
  }, []);
  const isLiked = post.Likers.find((v) => v.id === id);

  const onRetwitt = useCallback(() => {
    if (!id) {
      return alert("로그인이 필요합니다");
    }
    return dispatch({
      type: RETWITT_REQUEST,
      data: post.id,
    });
  }, [id]);

  return (
    <PostCardWrapper>
      <Card
        cover={post.Images[0] && <PostImages images={post.Images} />}
        actions={[
          <RetweetOutlined key="retweet" onClick={onRetwitt} />,
          isLiked ? (
            <HeartTwoTone twoToneColor="eb2f96" onClick={Unlike} key="heart" />
          ) : (
            <HeartOutlined key="heart" onClick={Like} />
          ),
          <MessageOutlined onClick={toggleCommentFormOpen} key="comment" />,
          <Popover
            key="more"
            content={[
              <Button.Group key={shortId.generate()}>
                {id && post?.User?.id === id ? (
                  <>
                    <Button>수정</Button>
                    <Button
                      onClick={onRemovePost}
                      type="primary"
                      loading={removePostLoading}
                    >
                      삭제
                    </Button>{" "}
                  </>
                ) : (
                  <Button>신고</Button>
                )}
              </Button.Group>,
            ]}
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
        title={
          post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다` : null
        }
        extra={id && <FollowBtn post={post} />}
      >
        {post.RetweetId && post.Retweet ? (
          <Card
            cover={
              post.Retweet.Images[0] && (
                <PostImages images={post.Retweet.Images} />
              )
            }
          >
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post?.User?.id}`}>
                  <a>
                    <Avatar>{post?.Retweet?.User?.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post?.Retweet?.User?.nickname}
              description={
                <PostCardContent
                  postData={post?.Retweet?.content}
                ></PostCardContent>
              }
            ></Card.Meta>
          </Card>
        ) : (
          <>
            <div style={{ float: "right" }}>
              {moment(post.createdAt).format("YYYY.MM.DD")}
            </div>
            <Card.Meta
              avatar={
                <Link href={`/user/${post?.User?.id}`}>
                  <a>
                    <Avatar>{post?.User?.nickname[0]}</Avatar>
                  </a>
                </Link>
              }
              title={post?.User?.nickname}
              description={
                <PostCardContent postData={post?.content}></PostCardContent>
              }
            ></Card.Meta>
          </>
        )}
      </Card>
      {commentFormOpen && (
        <>
          <List
            header={`${post?.Comments.length}개의 댓글`}
            itemLayout="horizontal"
            dataSource={post?.Comments}
            renderItem={(item) => (
              <li>
                <Comment
                  author={item?.User?.nickname}
                  avatar={
                    <Link href={`/user/${post?.User?.id}`}>
                      <a>
                        <Avatar>{item?.User?.nickname[0]}</Avatar>
                      </a>
                    </Link>
                  }
                  content={item?.content}
                />
              </li>
            )}
          ></List>
          <CommentForm post={post} />
        </>
      )}
    </PostCardWrapper>
  );
};
const PostCardWrapper = styled.div`
  width: 70%;
  margin-bottom: 20px;
`;

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    User: PropTypes.object,
    content: PropTypes.string,
    Images: PropTypes.arrayOf(PropTypes.any),
    Comments: PropTypes.arrayOf(PropTypes.any),
    createdAt: PropTypes.string,
    Likers: PropTypes.arrayOf(PropTypes.object),
    RetweetId: PropTypes.number,
    Retweet: PropTypes.objectOf(PropTypes.any),
  }),
};

export default PostCard;
