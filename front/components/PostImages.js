import React, { useCallback, useState } from "react";
import PropTypes from "prop-types";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import ImagesZoom from "./ImagesZom";
import { backUrl } from "../config/config";

const PostImages = ({ images }) => {
  const [showImagesZoom, setShowImagesZoom] = useState(false);

  
  const onZoom = useCallback(() => {
    setShowImagesZoom(true);
  }, []);

  const onClose = useCallback(() => {
    setShowImagesZoom(false);
  }, []);

  if (images.length === 1) {
    return (
      <>
        <PostImageWrapperHalf src={`${backUrl}/${images[0].src}`} onClick={onZoom} />
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  if (images.length === 2) {
    return (
      <>
        <div>
          <img style={{ width: "50%", display:'flex', justifyContent:'center',alignItems:'center'}} src={`${backUrl}/${images[0].src}`}  onClick={onZoom} />
          <img style={{ width: "50%", display:'flex', justifyContent:'center',alignItems:'center'}} src={`${backUrl}/${images[1].src}`}  onClick={onZoom} />
        </div>
        {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
      </>
    );
  }
  return (
    <>
      <PostImageThreewrapper>
        <img style={{ width: "50%", display:'flex', justifyContent:'center',alignItems:'center'}}  src={images[0].src} onClick={onZoom} />
        <MoreViewWrapper onClick={onZoom}>
          <PlusOutlined />
          <br />
          {images.length - 1}
          개의 사진 더보기
        </MoreViewWrapper>
      </PostImageThreewrapper>
      {showImagesZoom && <ImagesZoom images={images} onClose={onClose} />}
    </>
  );
};

PostImages.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      src: PropTypes.string,
    })
  ).isRequired,
};

const PostImageThreewrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PostImageWrapperHalf = styled.img`
  display: flex;
  justify-content: center;
  align-items:center;a
  width: 50%;
`;

const MoreViewWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  cursor: pointer;
`;

export default PostImages;
