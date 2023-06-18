import { Button, Form, Input } from "antd";
import useInput from "../hooks/useInput";
import { useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { ADD_COMMENT_REQUEST } from "../reducers/post";

const CommentForm = ({ post }) => {
  const dispatch = useDispatch();
  const [commentText, onChangeCommentText, setCommentText] = useInput("");
  const id = useSelector((state) => state.user.me?.id);
  const onSubmit = useCallback(() => {
    // console.log(post.id, commentText);
    dispatch({
      type: ADD_COMMENT_REQUEST,
      data: { content: commentText, postId: post.id, userId: id },
    });
  }, [commentText, id]);

  const { addCommentDone, addCommentLoading } = useSelector((state) => state.post);
  
  useEffect(() => {
    setCommentText("");
  }, [addCommentDone]);

  const ButtonStyle = { width: "100px" };

  return (
    <Form onFinish={onSubmit}>
      <Form.Item>
        <Input.TextArea
          value={commentText}
          onChange={onChangeCommentText}
          rows={4}
        />
        <Button htmlType="submit" type="primary" loading={addCommentLoading} style={ButtonStyle}>
          Twitt
        </Button>
      </Form.Item>
    </Form>
  );
};

CommentForm.propTypes = {
  post: PropTypes.object.isRequired,
};

export default CommentForm;
