import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import {
  MdKeyboardArrowDown, MdKeyboardArrowUp, MdKeyboardArrowLeft, MdKeyboardArrowRight,
} from 'react-icons/md';

const Container = styled.div.attrs(
  ({ expand }) => ({
    style: {
      maxHeight: expand,
    },
  }),
)`

  transition: max-height 0.8s ${(props) => props.transition};


  position: relative;
  width: 80vw;
  margin: 20px auto;
  overflow: hidden;
  .content{
    width: 80vw;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-gap: 40px;
  }

  .show-more{
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
  
  .change-photo{
    margin: 10px;
    cursor: pointer;
  }

  .show-more,
  .change-photo{
    font-size: 4rem;
    border: none;
    border-radius: 50%;
    width: 70px;
    height: 70px;
    
    display: flex;
    align-items: center;
    justify-content: center;

    background: ${(props) => props.eventTheme.secondary};
    color: ${(props) => props.eventTheme.primary};
  }
`;

const Photo = styled.div` 
  overflow: hidden;
  height: 0;
  padding: 50% 0;
  position: relative;
  cursor: pointer;

  img {
    min-width: 100%;
    min-height: 100%;
    max-width: 150%;
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Modal = styled.div`
  .backdrop{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.7);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 303;
  }
  .backdrop img{
    max-width: 60%;
    max-height: 80%;
    box-shadow: 3px 5px 7px rgba(0,0,0,0.5);
  }
`;

export default function Photos({ eventPhotos, eventTheme }) {
  const [expand, setExpand] = useState(false);
  const [selected, setSelected] = useState(null);

  const totalPhotos = eventPhotos.length;

  const modalRef = useRef();

  function unselectImage(e) {
    if (e.target.classList.contains('backdrop')) {
      setSelected(null);
    }
  }

  function changeSelected(step) {
    const newId = (((selected + step) % totalPhotos) + totalPhotos) % totalPhotos;
    setSelected(newId);
  }

  const escKeys = [' ', 'Escape', 'Enter'];
  function handleKey(e) {
    if (escKeys.includes(e.key)) setSelected(null);
    if (e.key === 'ArrowRight') changeSelected(1);
    if (e.key === 'ArrowLeft') changeSelected(-1);
  }

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }
  }, [selected]);

  return (
    <Container
      expand={expand ? `${1000 * (totalPhotos / 3)}px` : '500px'}
      transition={expand ? 'ease-in-out' : 'cubic-bezier(0, 1, 0, 1)'}
      eventTheme={eventTheme}
    >
      <div className="content">
        {eventPhotos.map((photo, index) => (
          <Photo
            key={index}
            onClick={() => setSelected(index)}
          >
            <img src={photo} alt="Foto do evento" />
          </Photo>
        ))}
        <Modal>
          {selected !== null
          && (
          <div
            ref={modalRef}
            role="button"
            tabIndex={0}
            className="backdrop"
            onClick={(e) => unselectImage(e)}
            onKeyDown={(e) => handleKey(e)}
          >
            <button type="button" className="change-photo" onClick={() => changeSelected(-1)}>
              <MdKeyboardArrowLeft />
            </button>
            <img src={eventPhotos[selected]} alt="Foto do evento" loading={selected < 7 ? 'eager' : 'lazy'} />
            <button type="button" className="change-photo" onClick={() => changeSelected(1)}>
              <MdKeyboardArrowRight />
            </button>
          </div>
          )}
        </Modal>
      </div>
      <button type="button" className="show-more" onClick={() => setExpand(!expand)}>{expand ? (<MdKeyboardArrowUp />) : (<MdKeyboardArrowDown />)}</button>
    </Container>
  );
}
