import { CloseOutlined } from "@ant-design/icons";
import styled, { createGlobalStyle } from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  z-index: 9999;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
export const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  display: flex;
  justify-content: center;
  & h1 {
    margin: 0;
    font-size: 17px;
    color: #333;
    line-height: 44px;
  }
  & button {
    position: fixed;
    right: 45px;
    top: 10px;    
    display: flex;
    justify-content: flex-end;
    align-items: center;    
    background: white;
    border: 0;
    cursor: pointer;
  }
`;
export const SlickWrapper = styled.div`
  height: calc(100% - 44px);
  background: #090909;
`;
export const CloseBtn = styled(CloseOutlined)`
  position: absolute;
  right: 0;
  top: 0;
  padding: 15px;
  line-height: 14px;
  cursor: pointer;
`;

export const Global = createGlobalStyle`
  .slick-slide{
    display: inline-block;
    text-align: center;
  }
`;

export const Indicator = styled.div`
  text-align: center;    
  & > div {
    width: 75px;
    height: 30px;
    border-radius: 15px;
    background-color: #888;
    color: white;
    text-align: center;
    vertical-align: middle;
    display: inline-block;
  }
`;
