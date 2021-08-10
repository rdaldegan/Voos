import React, { useRef, useState } from 'react';
import styled from 'styled-components';

const CustomButton = styled.button`
  position: relative;
  background: ${(props) => props.colors.btnBg};
  border: none;
  border-radius: 15px;
  padding: 15px 20px;
  margin: 0;
  border-radius: 15px;
  font-size: 1.7rem;
  letter-spacing: 1px;
  font-family: 'Chau Philomene One', sans-serif;
  cursor: pointer;
  pointer-events: all;
  overflow: hidden;
  box-shadow:
        0 2.8px 2.2px ${(props) => `${props.colors.btnBg}15`},
        0 6.7px 5.3px ${(props) => `${props.colors.btnBg}20`},
        0 12.5px 10px ${(props) => `${props.colors.btnBg}25`},
        0 22.3px 17.9px ${(props) => `${props.colors.btnBg}30`};
  :hover{
    div{
      width: 1000px;
      height: 1000px;
      transition: width 0.8s, height 0.8s;
    }
  }
  :active{
    div{
      transition: width 0.1s, height 0.1s;
      width: 0px;
      height: 0px;
    }
  }
  span{
    color: ${(props) => props.colors.textColor};
    position: relative;
    pointer-events: none;
    z-index: 1;
  }
`;

const BgDiv = styled.div.attrs(
  ({ coordX, coordY }) => ({
    style: {
      top: `${coordY}%`,
      left: `${coordX}%`,
    },
  }),
)`
  pointer-events: none;
  content: '';
  position: absolute;
  transform: translate(-45%, -35%);
  background: ${(props) => props.colors.effectBg};
  border-radius: 50%;
  width: 0;
  height: 0;
  transition: width 0.4s, height 0.4s;
 `;

export default function CustomBtn({
  handleClick, text, btnTheme,
}) {
  const buttonRef = useRef(null);
  const [coordX, setCoordX] = useState(0);
  const [coordY, setCoordY] = useState(0);

  function handleMouseMove(e) {
    setCoordX(e.nativeEvent.offsetX);
    setCoordY(e.nativeEvent.offsetY);
  }
  return (
    <CustomButton
      ref={buttonRef}
      colors={btnTheme}
      type="button"
      className="button"
      onMouseUp={(e) => handleClick(e)}
      onMouseMove={(e) => handleMouseMove(e)}
    >
      <BgDiv
        colors={btnTheme}
        coordX={
        buttonRef.current ? Math.floor((coordX / buttonRef.current.clientWidth) * 100) : 0
      }
        coordY={
        buttonRef.current ? Math.floor((coordY / buttonRef.current.clientHeight) * 100) : 0
      }
      />
      <span>{text}</span>
    </CustomButton>
  );
}
