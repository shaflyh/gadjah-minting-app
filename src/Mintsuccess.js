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
  // border: 8px solid #00C2A0;
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
    font-size: 75px;
    color: #00C2A0;
    text-align: center;
`;

export const ModalSubTitle = styled.h3 `
    font-family: 'Upheaval';
    font-size: 40px;
    font-weight: 10;
    color: #7167E3;
    letter-spacing: 2px;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 32px;
    }
`;

export const ModalText = styled.p `
    font-family: 'Renomono';
    font-size: 20px;
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
  width: 200px;
  @media (min-width: 767px) {
    width: 250px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;


export const Mintsuccess = ({ setShowMintsuccess }) => {
  // close the modal when clicking outside the modal.
  const mintsuccessRef = useRef();
  const closeMintsuccess = (e) => {
    if (e.target === mintsuccessRef.current) {
        setShowMintsuccess(false);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <Container ref={mintsuccessRef} onClick={closeMintsuccess}>
      <ContainerModal>
      <GlobalStyle />
          <ModalDetails>
          <s.SpacerLarge />
              {/* <ModalTitle>
              CONGRATS!
              </ModalTitle>
              <s.SpacerLarge /> */}

              <StyledLogo alt={"logo"} src={"/config/images/winking.png"} />
              <s.SpacerLarge />
                            
              <ModalSubTitle>
                    Minting success!
              </ModalSubTitle>
              <s.SpacerLarge />
              <ModalText>
              Go check your Metamask or go to Opensea!
              </ModalText>
                

            <s.SpacerLarge />
          </ModalDetails>
        
        {/* <ModalButton onClick={() => setShowMintsuccess(false)}>X</ModalButton> */}
      </ContainerModal>
    </Container>,
    document.getElementById("portal")
  );
};