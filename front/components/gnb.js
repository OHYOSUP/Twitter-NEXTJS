import { Menu, Input } from "antd";
import Link from "next/link";
import React from 'react';
import styled, { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
.ant-row{
  margin-right: 0 !important;
  margin-left: 0 !important;
}
.ant-col:first-child{
  padding-left: 0 !important;
}
.ant-col:last-child{
  padding-right: 0 !important;
}
`
const Gnb = () => {

  return (
    <div>
      <Global />
       <Menu mode="horizontal">
        <Menu.Item key="home">
          <Link href="/">
            <a>Twitter</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='profile'>
          <Link href="/profile">
            <a>프로필</a>
          </Link>
        </Menu.Item>
        <Menu.Item key='search'>
          <SearchInput placeholder="input search text" enterButton />
        </Menu.Item>
        <Menu.Item key='sognup'>
          <Link href="/signup">
            <a>회원가입</a>
          </Link>
        </Menu.Item>
      </Menu> 
    </div>
  );
};

const SearchInput = styled(Input.Search)`
  vertical-align: middle;
`;
export default Gnb;
