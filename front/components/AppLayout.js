import PropTypes from "prop-types";
import UserProfile from "./UserProfile";
import LoginForm from "./LoginForm";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import { Menu, Input } from "antd";
import Link from "next/link";
import styled from "styled-components";
import useInput from "../hooks/useInput";
import { useRouter } from "next/router";
import { useCallback } from "react";

const AppLayout = ({ children }) => {
  const { me } = useSelector((state) => state.user);
  const [searchInput, onChangeSearchInput] = useInput("");
  const router = useRouter();

  const onSearchClick = useCallback(() => {
    router.push(`/hashtag/${searchInput}`);
  }, [searchInput]);

  return (
    <div>
      <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Twitter</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="profile">
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="search">
          <SearchInput
            value={searchInput}
            onChange={onChangeSearchInput}
            onSearch={onSearchClick}
            placeholder="input search text"
            enterButton
          />
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu>
      <Row gutter={8}>
        <Col xs={24} md={6}>
          {me ? <UserProfile /> : <LoginForm />}
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          xs={24}
          md={12}
        >
          {children}
        </Col>
        <Col xs={24} md={6}>
          <a
            href="https://velog.io/@oued445"
            target="_blank"
            rel="noreffrrer noopener"
          >
            요섭의 개발 블로그
          </a>
        </Col>
      </Row>
    </div>
  );
};
const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppLayout;
