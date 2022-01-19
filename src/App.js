import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {
  faInstagram,
  faDiscord,
  faTwitter,
  faMedium
} from '@fortawesome/free-brands-svg-icons';

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: 'Upheaval';
  padding: 10px;
  font-size: 24px;
  border-radius: 6px;
  border: 4px solid #49FCE3;
  background-color: #fff;
  padding: 10px;
  letter-spacing: 6px;
  // font-weight: bold;
  color: #7167E3;
  width: 450px;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 6px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  border: 4px solid #F8A9FF;
  background-color: #fff;
  // font-weight: bold;
  font-size: 50px;
  color: #7167E3;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  // margin: auto;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const ResponsiveWrapperHeader = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  margin: 10px 10px 10px 100px;
  width: 100px;
  @media (min-width: 767px) {
    width: 150px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const SocialMediaImage = styled.img`
  display: inline;
  width: 33px;
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  // border: 4px dashed var(--secondary);
  // background-color: var(--accent);
  // border-radius: 100%;
  width: 300px;
  @media (min-width: 900px) {
    width: 350px;
  }
  @media (min-width: 1000px) {
    width: 400px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const WalletBox = styled.div`
  margin: 10px 100px 10px 10px;
  text-decoration: none;
  border-radius: 10px;
  border: 2px solid white;
  background-color: #363076;
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  width: 250px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
`;

export const SocialMedia = styled.a `
  color: #fff;
  margin: 18px;
  vertical-align: middle;
`;

export const SocialMediaDiv = styled.div `
  font-size: 32px;
  padding: 16px;
`;

export const HowToMint = styled.a`
  color: var(--primary-text);
  font-family: "Upheaval";
  font-size: 60px;
  // text-align: right;
  line-height: 1.6;
`;


function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("No connection");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    WEB_LINK: "",
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(blockchain.account, mintAmount)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, something went wrong please try again later.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });
  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 50) {
      newMintAmount = 50;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setAddress(blockchain.account.substring(0,4) + "..." + blockchain.account.substring(38,42));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        // ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
        image={CONFIG.SHOW_BACKGROUND ? "/config/images/bg_minting.png" : null}
      >
        <ResponsiveWrapperHeader>
          <a href={CONFIG.WEB_LINK}>
            <StyledLogo alt={"logo"} src={"/config/images/logo_minting.png"} />
          </a>

          <SocialMediaDiv>
            <SocialMedia href="https://discord.gg/jfjpJZgVUm">
              <FontAwesomeIcon icon={faDiscord} />
            </SocialMedia>
            <SocialMedia href="https://twitter.com/GadjahSociety">
              <FontAwesomeIcon icon={faTwitter} />
            </SocialMedia>
            <SocialMedia href="https://medium.com/@gadjahsociety">
              <FontAwesomeIcon icon={faMedium} />
            </SocialMedia>
            <SocialMedia href="https://www.instagram.com/gadjahsocietynft/">
              <FontAwesomeIcon icon={faInstagram} />
            </SocialMedia>
            <SocialMedia href={CONFIG.MARKETPLACE_LINK}>
              <SocialMediaImage alt={"logo"} src={"/config/images/logo-opensea.png"} />
            </SocialMedia>
          </SocialMediaDiv>
          
          {/* </SocialMedia> */}
          <WalletBox>
            {blockchain.account !== "" ? (
            <>
            <s.TextSubTitle>
              {walletAddress}
              </s.TextSubTitle>
            </>
            ) : null }
          </WalletBox>
        </ResponsiveWrapperHeader>

        {/* <s.Container flex={1} jc={"center"} ai={"center"}>
          <s.TextTitle> PUBLIC SALE </s.TextTitle>
        </s.Container> */}
    
        <s.SpacerLarge />

        <ResponsiveWrapper flex={1} style={{ padding: 60 }} test>
            
            <s.Container flex={1} jc={"center"} ai={"center"}>
              <StyledImg alt={"Gadjah with the duck"} src={"/config/images/unr_nft.png"} />
            </s.Container>
            {/* <s.SpacerLarge /> */}
            <s.Container flex={1} jc={"center"} ai={"center"} >
            <s.StyledHR></s.StyledHR>
            <s.SpacerSmall />
            {/* <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle> */}
            {/* <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
              <StyledLink target={"_blank"} href={CONFIG.SCAN_LINK}>
                {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
              </StyledLink>
            </s.TextDescription> */}
            {/* <span
              style={{
                textAlign: "center",
              }}
            >
              <StyledButton
                onClick={(e) => {
                  window.open("/config/roadmap.pdf", "_blank");
                }}
                style={{
                  margin: "5px",
                }}
              >
                Roadmap
              </StyledButton>
              <StyledButton
                style={{
                  margin: "5px",
                }}
                onClick={(e) => {
                  window.open(CONFIG.MARKETPLACE_LINK, "_blank");
                }}
              >
                {CONFIG.MARKETPLACE}
              </StyledButton>
            </span> */}
            {/* <s.SpacerSmall /> */}
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextSub>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextSub
                  style={{ textAlign: "center", color: "var(--accent-text)",  }}
                >
                  Price&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST}{" "}{CONFIG.NETWORK.SYMBOL}
                </s.TextSub>
                <s.SpacerSmall />
                <s.StyledHR></s.StyledHR>
                <s.SpacerXSmall />
                {/* <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  Excluding gas fees.
                </s.TextDescription> */}
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {/* Connect to the {CONFIG.NETWORK.NAME} network                       */}
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT TO METAMASK
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.TextDescription
                        style={{
                          fontFamily : "Upheaval",
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        &ensp;&ensp;&ensp;&ensp;{" "}{mintAmount}&ensp;&ensp;&ensp;&ensp;
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft || mintAmount >= 10 ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>
                    <s.SpacerSmall />
                    <s.StyledHR ></s.StyledHR>
                    <s.SpacerSmall />
                    <s.TextSub
                      style={{ textAlign: "center", color: "var(--accent-text)",  }}
                    >
                      Total&emsp;&emsp;&emsp;&emsp;&emsp;{CONFIG.DISPLAY_COST * mintAmount}{" "}{CONFIG.NETWORK.SYMBOL}
                    </s.TextSub>
                    <s.SpacerSmall />
                    <s.SpacerXSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "MINTING..." : "MINT NOW"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
            </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>

        {/* <ResponsiveWrapperHeader>
          <HowToMint>
          </HowToMint>
          <HowToMint>
            How to mint?
          </HowToMint>
        </ResponsiveWrapperHeader> */}

        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
