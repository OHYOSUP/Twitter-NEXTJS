import React, { useCallback, useEffect, useRef } from "react";
import { Form, Input, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  ADD_POST_REQUEST,
  REMOVE_IMAGE,
  UPLOAD_IMAGES_REQUEST,
} from "../reducers/post";
import useInput from "../hooks/useInput";
import styled from "styled-components";
import { backUrl } from "../config/config";

const PostForm = () => {
  const [twittText, onChangeText, setTwittText] = useInput("");
  const { imagePaths } = useSelector((state) => state.post);
  const { addPostDone } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const imageInput = useRef();
  const imageUpload = useCallback(() => {
    imageInput.current.click();
  }, [imageInput.current]);

  const onsubmit = useCallback(() => {
    if (!twittText || !twittText.trim()) {
      alert("게시글을 입력해주세요");
    }
    const formData = new FormData();
    imagePaths.forEach((v) => {
      formData.append("image", v);
    });
    if (twittText) {
      formData.append("content", twittText);
      return dispatch({
        type: ADD_POST_REQUEST,
        data: formData,
      });
    }
  }, [imagePaths, twittText]);

  useEffect(() => {
    if (addPostDone) {
      setTwittText("");
    }
  }, [addPostDone]);

  const onChangeImages = useCallback((e) => {
    console.log("images", e.target.files);
    const imageFormData = new FormData();
    Array().forEach.call(e.target.files, (f) => {
      imageFormData.append("image", f);
    });
    dispatch({
      type: UPLOAD_IMAGES_REQUEST,
      data: imageFormData,
    });
  }, []);

  const deleteImage = useCallback(
    (index) => () => {
      dispatch({
        type: REMOVE_IMAGE,
        data: index,
      });
    },
    []
  );

  return (
    <PostFormWrapper onFinish={onsubmit} encType="multipart/form-data">
      <Input.TextArea
        value={twittText}
        onChange={onChangeText}
        maxLength={140}
        style={{ height: "100px" }}
        placeholder="어떤 신기한 일이 있었나요?"
      />
      <div>
        <input
          name="image"
          type="file"
          multiple
          hidden
          ref={imageInput}
          onChange={onChangeImages}
        />
        <Button onClick={imageUpload}>이미지 업로드</Button>
        <Button type="primary" style={{ float: "right" }} htmlType="submit">
          Twitt
        </Button>
      </div>
      <div>
        {imagePaths.map((v, i) => (
          <div key={v} style={{ display: "inline-block" }}>
            <img
              src={`${backUrl}/${v}`}
              style={{ width: "200px" }}
              alt={v}
            />
            <div>
              <Button onClick={deleteImage(i)}>제거</Button>
            </div>
          </div>
        ))}
      </div>
    </PostFormWrapper>
  );
};

const PostFormWrapper = styled(Form)`
  margin: 10px 0 20px;
  width: 70%;
`;
export default PostForm;
