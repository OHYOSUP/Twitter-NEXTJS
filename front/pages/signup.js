import { Form, Input, Checkbox, Button } from "antd";
import Head from "next/dist/next-server/lib/head";
import useInput from "../hooks/useInput";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SIGN_UP_REQUEST } from "../reducers/user";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/dist/client/router";
import AppLayout from "../components/AppLayout";

const Signup = () => {
  const [email, onChangeEmail] = useInput("");
  const [nickname, onChangeNickname] = useInput("");
  const [password, onChangePassword] = useInput("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const [passwordError, setPasswordError] = useState(false);

  const onChangePasswordCheck = useCallback(
    (e) => {
      setPasswordCheck(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password]
  );

  const [term, setTerm] = useState(false);
  const [termError, setTermError] = useState(false);
  const onChangeTerm = (e) => {
    setTerm(e.target.checked);
    setTermError(false);
  };

  const dispatch = useDispatch();
  const { signUpLoading, signUpDone, signUpError, me } = useSelector(
    (state) => state.user
  );
  const onSubmit = useCallback(
    (e) => {
      if (password !== passwordCheck) {
        return setPasswordError(true);
      }
      if (!term) {
        return setTermError(true);
      }
      console.log(email, password, nickname);
      dispatch({
        type: SIGN_UP_REQUEST,
        data: { email, password, nickname },
      });
    },
    [email, password, passwordCheck, term]
  );
  const router = useRouter();

  useEffect(() => {
    if (signUpDone) {
      router.replace("/");
    }
  }, [signUpDone]);

  useEffect(() => {
    if (me && me.id) {
      router.replace("/");
    }
  }, [me, router]);

  useEffect(() => {
    if (signUpError) {
      alert("이미 존재하는 이메일입니다");
    }
  }, [signUpError]);
  return (
    <AppLayout>
    <div>
      <Head>
        <title>회원가입 | Twitter</title>
      </Head>
      <LoginFormWrapper onFinish={onSubmit}>
        <h1>Join us</h1>
        <div>
          <label htmlFor="user-email">이메일</label>
          <br />
          <LoginInput
            name="user-email"
            type="email"
            value={email}
            onChange={onChangeEmail}
            required
          />
        </div>
        <div>
          <label htmlFor="user-nickname">닉네임</label>
          <br />
          <LoginInput
            name="user-nickname"
            type="text"
            value={nickname}
            onChange={onChangeNickname}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호</label>
          <br />
          <LoginInput
            name="user-password"
            type="password"
            value={password}
            onChange={onChangePassword}
            required
          />
        </div>
        <div>
          <label htmlFor="user-password">비밀번호 확인</label>
          <br />
          <LoginInput
            type="password"
            name="user-passwordCheck"
            value={passwordCheck}
            onChange={onChangePasswordCheck}
            required
          />
        </div>
        {passwordError ? (
          <ErrorWrapper>비밀번호가 일치하지 않습니다</ErrorWrapper>
        ) : null}
        <div>
          <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
            약관의 동의합니다
          </Checkbox>
          {termError && (
            <TermErrorWraper>약관에 동의 하셔야합니다</TermErrorWraper>
          )}
        </div>
        <div style={{ marginTop: 10 }}>
          <Button loading={signUpLoading} type="primary" htmlType="submit">
            가입하기
          </Button>
        </div>
      </LoginFormWrapper>
    </div>
    </AppLayout>
  );
};

const ErrorWrapper = styled.div`
  color: red;
`;
const TermErrorWraper = styled.div`
  color: red;
`;

const LoginFormWrapper = styled(Form)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;  
  margin-top: 50px;
  h1 {
    text-align: center;
  }
`;
const LoginInput = styled(Input)`
  width: 30vw;
  padding: 5px;
`;

export default Signup;
