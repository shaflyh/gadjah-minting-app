//Modal.js
import React, { useRef } from "react";
import ReactDom from "react-dom";
import styled from "styled-components";
import { keyframes } from 'styled-components';
import GlobalStyle from "./fonts";
import * as s from "./styles/globalStyles";

export const Container = styled.div `
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.6);
`;

export const animate = keyframes`
    from {
    transform: scale(0.5);
  }
  to {
    transform: scale(1);
`;

export const ContainerModal = styled.div `
  z-index: 1;
  width: 650px;
  height: 450px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 30px;
  // border: 8px solid #DD3B3E;
  position: relative;
  animation: ${animate} 0.3s;
  @media (max-width: 600px) {
    width: 320px;
    height: 400px;
  }
`;

export const ModalButton = styled.button `
    position: absolute;
    top: 7px;
    right: 7px;
    padding: 8px 11px;
    background: crimson;
    color: white;
    font-weight: bold;
    border: none;
    outline: none;
    border-radius: 2px;
    cursor: pointer;
`;

export const ModalDetails = styled.div`
    text-decoration: none;
    margin: 0 45px;
    font-weight: bold;
    // font-size: 15px;
    align-items: center;
    justify-content: center;
`;

export const ModalTitle = styled.h2 `
    font-family: 'Gumball';
    font-weight: 400;
    font-size: 84px;
    color: #DD3B3E;
    text-align: center;
`;

export const ModalSubTitle = styled.h3 `
    font-family: 'Upheaval';
    font-size: 36px;
    font-weight: 10;
    color: #DD3B3E;
    letter-spacing: 2px;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 32px;
    }
`;

export const ModalText = styled.p `
    font-family: 'Renomono';
    font-size: 22px;
    color: #000;
    font-weight: 100;
    text-align: center;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 18px;
    }
`;

export const StyledLogo = styled.img`
  display: block;
  margin: auto;
  width: 240px;
  @media (min-width: 767px) {
    width: 280px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const Notwl = ({ setShowNotwl }) => {
  // close the modal when clicking outside the modal.
  const notwlRef = useRef();
  const closeNotwl = (e) => {
    if (e.target === notwlRef.current) {
        setShowNotwl(false);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <Container ref={notwlRef} onClick={closeNotwl}>
      <ContainerModal>
      <GlobalStyle />
          <ModalDetails>
          <s.SpacerLarge />
              {/* <ModalTitle>
                SORRY!
              </ModalTitle> */}
              {/* <s.SpacerLarge /> */}

              <StyledLogo alt={"logo"} src={"/config/images/cry.png"} />
              <s.SpacerLarge />
                            
              <ModalSubTitle>
                    You can't mint NFT!
              </ModalSubTitle>
              <s.SpacerLarge />
              <ModalText>
              You are not listed in the whitelist.
              </ModalText>
                

            <s.SpacerLarge />
          </ModalDetails>
        
        {/* <ModalButton onClick={() => setShowNotwl(false)}>X</ModalButton> */}
      </ContainerModal>
    </Container>,
    document.getElementById("portal")
  );
};