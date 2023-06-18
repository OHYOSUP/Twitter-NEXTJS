import { Form, Input } from "antd";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { NICKNAME_CHANGE_REQUEST } from "../reducers/user";

const NickNameEditForm = () => {
  const { Search } = Input;
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || "");
  const dispatch = useDispatch();
  const onSubmit = useCallback(() => {
    dispatch({
      type: NICKNAME_CHANGE_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  return (
    <NickNameFormWrapper>
      <Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </NickNameFormWrapper>
  );
};

const NickNameFormWrapper = styled(Form)`
  margin-top: 20px;
  border: 1px solid #d9d9d9;
  padding: 20px;
`;
export default NickNameEditForm;
