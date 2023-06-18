import { Form, Input, Button } from "antd";
import { useCallback, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import useInput from "../hooks/useInput";
import { loginRequestAction } from "../reducers/user";


const LoginForm = () => {
  const [email, onChangeEmaill] = useInput("");
  const [password, onChangePassword] = useInput("");
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector(
    (state) => state.user
  );
  const onFinish = useCallback(() => {
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  useEffect(() => {
    if (logInError) {
      alert(logInError);      
    }
  }, [logInError]);

  return (
    <FormWrapper onFinish={onFinish}>
      <label htmlFor="user-email">이메일</label>
      <br />
      <Form.Item
        name="user-email"
        label="user-email"
        rules={[{ required: true }]}
      >
        <Input onChange={onChangeEmaill} value={email} type="email" />
      </Form.Item>
      <label htmlFor="user-password">비밀번호</label>
      <br />
      <Form.Item
        name="password-id"
        label="password-id"
        rules={[{ required: true }]}
      >
        <Input onChange={onChangePassword} value={email} type="password" />
      </Form.Item>
      <ButtonWrapper>
        <Button type="primary" htmlType="submit" loading={logInLoading}>
          로그인
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </ButtonWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled(Form)`
  padding: 10px;
`;
const ButtonWrapper = styled.div`
  margin-top: 10px;
`;
export default LoginForm;
