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
  width: 1000px;
  height: 500px;
  background: #7167E3;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  position: relative;
  animation: ${animate} 0.3s;
  @media (max-width: 600px) {
    width: 360px;
    height: 465px;
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
    margin: 0 70px;
    font-weight: bold;
    // font-size: 15px;
    align-items: center;
    justify-content: center;
`;

export const ModalTitle = styled.h2 `
    font-family: 'Gumball';
    font-weight: 400;
    font-size: 64px;
    color: #F9F871;
    text-align: center;
    @media (max-width: 600px) {
      font-size: 33px;
    }
`;

export const ModalSubTitle = styled.h3 `
    font-family: 'Upheaval';
    font-size: 24px;
    font-weight: 10;
    color: #fff;
    line-height: 2;
    letter-spacing: 2px;
    text-align: left;
    @media (max-width: 600px) {
      font-size: 21px;
      line-height: 1;
    }
`;

export const ModalText = styled.p `
    font-family: 'Renomono';
    font-size: 20px;
    color: #fff;
    font-weight: 100;
    text-align: left;
    line-height: 1.2;
    @media (max-width: 600px) {
      font-size: 10px;
      line-height: 1.5;
    }
`;


export const Modal = ({ setShowModal }) => {
  // close the modal when clicking outside the modal.
  const modalRef = useRef();
  const closeModal = (e) => {
    if (e.target === modalRef.current) {
      setShowModal(false);
    }
  };
  //render the modal JSX in the portal div.
  return ReactDom.createPortal(
    <Container ref={modalRef} onClick={closeModal}>
      <ContainerModal>
      <GlobalStyle />
          <ModalDetails>
              <ModalTitle>
                How to Mint?
              </ModalTitle>
              <s.SpacerLarge />
              
            <ol>
              
                <ModalSubTitle>
                    <li> Connect to your wallet </li>
                </ModalSubTitle>
                <ul>
                    <li> <ModalText>
                        Click "Connect Wallet" and authorize connection in your wallet.
                    </ModalText> </li>
                </ul>
                <s.SpacerSmall />
                <ModalSubTitle>
                    <li> Choose how many NFT(s) you would like to mint </li>
                </ModalSubTitle>
                <ul>
                    <li> <ModalText>
                        You are entitled to mint up to 5 Gadjah Society NFTs.
                    </ModalText> </li>
                </ul>
                <s.SpacerSmall />
                <ModalSubTitle>
                    <li> Confirm in your wallet </li>
                </ModalSubTitle>
                <ul>
                    <li> <ModalText>
                        You have to have enough ETH in your wallet to cover 'Max gas fees' + mint cost, check FAQ.
                    </ModalText> </li>
                </ul>

            </ol>
            <s.SpacerLarge />
          </ModalDetails>
        
        <ModalButton onClick={() => setShowModal(false)}>X</ModalButton>
      </ContainerModal>
    </Container>,
    document.getElementById("portal")
  );
};