import PropTypes from "prop-types";
import { useState } from "react";
import Slick from "react-slick";
import { Global, Header, Indicator, Overlay, SlickWrapper } from "./style";
import styled from "styled-components";

const ImagesZoom = ({ images, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <Overlay>
      <Global />
      <Header>
        <h1>상세 이미지</h1>
        <button onClick={onClose}>✖️</button>
      </Header>
      <SlickWrapper>
        <div>
          <Slick
            initialSlide={0}
            afterChange={(slide) => setCurrentSlide(slide)}
            infinite
            arrows={false}
            slidesToShow={1}
            slidesToScroll={1}
          >
            {images.map((v) => (
              <ImageZoomWrapper key={v.src}>
                <img src={`http://localhost:3065${v.src}`} alt={v.src} />
              </ImageZoomWrapper>
            ))}
          </Slick>
          <Indicator>
            <div>
              {currentSlide + 1} / {images.length}
            </div>
          </Indicator>
        </div>
      </SlickWrapper>
    </Overlay>
  );
};
ImagesZoom.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
  onClose: PropTypes.func.isRequired,
};
const ImageZoomWrapper = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content:center;
  align-items:center;
`
export default ImagesZoom;
