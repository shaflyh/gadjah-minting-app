import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faDiscord,
  faTwitter,
  faMedium,
} from "@fortawesome/free-brands-svg-icons";
import { faQuestionCircle } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "./Modal";
import { Notwl } from "./NotWL";
import { Mintsuccess } from "./Mintsuccess";
import "./style.css";
import axios from "axios";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  font-family: "Upheaval";
  padding: 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 4px solid #7167e3;
  background-color: #49fce3;
  padding: 10px;
  letter-spacing: 6px;
  // font-weight: bold;
  color: #7167e3;
  width: 75%;
  height: 50px;
  cursor: pointer;
  box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0px 6px 0px -2px rgba(0, 0, 0, 0.4);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  @media (max-width: 1330px) {
    font-size: 16px;
  }
  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 10px;
  // border: 4px solid #F8A9FF;
  background-color: #fff;
  // font-weight: bold;
  font-size: 50px;
  color: #7167e3;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  // box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  // -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
  margin: auto 0;
  @media (max-width: 1330px) {
    width: 50px;
    height: 50px;
  }
`;

export const ResponsiveWrapper = styled.div`
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  margin: auto;
  border-radius: 20px;
  width: 75%;
  padding: 50px 90px;
  @media (min-width: 940px) {
    flex-direction: row;
  }
  @media (max-width: 1330px) {
    padding: 0;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const ResponsiveWrapperZero = styled.div`
  filter: blur(4px);
  backdrop-filter: blur(4px);
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  margin: auto;
  border-radius: 20px;
  width: 75%;
  padding: 50px 90px;
  @media (min-width: 940px) {
    flex-direction: row;
  }
  @media (max-width: 1330px) {
    padding: 0;
  }
  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Countdown = styled.div`
  font-family: "Upheaval";
  color: var(--primary-text);
  font-size: 56px;
  font-weight: 400;
  letter-spacing: 8px;
  // -webkit-text-stroke: 2px #49FCE3;
  -webkit-text-stroke: 2px #7167e3;
  z-index: 99;
  top: 42%;
  position: absolute;
  margin-left: auto;
  margin-right: auto;
  left: 0;
  right: 0;
  text-align: center;
  @media (max-width: 420px) {
    top: 50%;
    margin: 0 20px;
    font-size: 36px;
    -webkit-text-stroke: 1px #7167e3;
  }
`;

export const CTitle = styled.p`
  font-size: 40px;
  webkit-text-stroke: 2px #7167e3;
  @media (max-width: 420px) {
    margin: 0 20px;
    font-size: 24px;
    -webkit-text-stroke: 1px #7167e3;
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
  @media (max-width: 767px) {
    text-align: center;
  }
`;

export const ResponsiveWrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretched;
  width: 75%;
  @media (min-width: 767px) {
    // display: block;
    flex-direction: row;
  }
  @media (max-width: 767px) {
    display: -webkit-inline-box;
    // flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  display: inline;
  margin: 10px 10px 10px 150px;
  width: 160px;
  @media (max-width: 1330px) {
    margin: 10px 10px 10px 125px;
  }
  @media (max-width: 767px) {
    width: 150px;
    margin: auto;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const SocialMediaImage = styled.img`
  display: inline;
  width: 33px;
  transition: width 0.5s;
  transition: height 0.5s;
  transition: transform 0.3s;
  &:hover {
    transform: scale(1.3);
  }
  @media (max-width: 1330px) {
    width: 25px;
  }
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  width: 280px;
  @media (min-width: 900px) {
    width: 340px;
  }
  @media (min-width: 1000px) {
    width: 380px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary);
  text-decoration: none;
`;

export const Texto = styled.div`
  font-family: "Upheaval";
  color: var(--primary-text);
  font-size: 18px;
  letter-spacing: 8px;
  @media (max-width: 480px) {
    font-size: 12px;
  }
`;

export const Box = styled.div`
  margin: auto;
  text-decoration: none;
  border: 4px solid white;
  background-color: #172a5a;
  // font-weight: bold;
  // font-size: 15px;
  width: 350px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -webkit-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  -moz-box-shadow: 0px 4px 0px -2px rgba(250, 250, 250, 0.3);
  @media (max-width: 480px) {
    width: 75%;
    height: 85px;
  }
  // @media (max-width: 767px) {
  //   margin: auto;
  // }
`;

export const WalletBox = styled.div`
  margin: 10px 120px 10px 10px;
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
  @media (max-width: 1330px) {
    margin: 10px 40px 10px 10px;
  }
  @media (max-width: 767px) {
    margin: auto;
    width: 200px;
    height: 40px;
  }
`;

export const SocialMedia = styled.a`
  color: #fff;
  margin: 18px;
  vertical-align: middle;
  @media (max-width: 600px) {
    margin: 10px;
  }
`;

export const SocialMediaDiv = styled.div`
  font-size: 32px;
  padding: 16px;
  @media (max-width: 1330px) {
    font-size: 24px;
  }
`;

export const HowToMint = styled.a`
  color: rgba(73, 252, 227, 0.6);
  // text-decoration: underline;
  font-family: "Renomono";
  font-size: 22px;
  // text-align: right;
  line-height: 1.6;
  cursor: pointer;
  word-spacing: -3px;
  &:hover {
    // cursor: pointer;
    text-decoration: underline;
  }
  @media (max-width: 600px) {
    font-size: 18px;
  }
`;

export const ModalButton = styled.button`
  padding: 13px 29px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 5px;
  border: none;
  outline: none;
  background: crimson;
  color: white;
  cursor: pointer;
`;

export const customClasss = `
  border: 2px solid #000;
`;

export const UnrevealVid = styled.video`
  border-radius: 4px;
  // border: 4px solid #7167e3;
  width: 380px;
  @media (max-width: 380px) {
    width: 175px;
  }
  @media (max-width: 620px) {
    width: 225px;
    margin: 20px 0 30px 0;
  }
  @media (min-width: 900px) {
    width: 300px;
  }
  @media (min-width: 1000px) {
    width: 340px;
  }
  @media (min-width: 1330px) {
    width: 380px;
  }
`;

function App() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const [showNotwl, setShowNotwl] = useState(false);

  const openNotwl = () => {
    setShowNotwl(true);
  };

  const [showMintsuccess, setShowMintsuccess] = useState(false);

  const openMintsuccess = () => {
    setShowMintsuccess(true);
  };

  const dispatch = useDispatch();
  const whitelist_url = ""; // this variable is used if you have whitelist API, you can adjust to get the data from `useEffect()` and `const getData()`
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [walletAddress, setAddress] = useState("No connection");
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(``);
  const [wl_wallet, setCheckWallet] = useState(false);
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
    WHITELIST_URL: "",
  });

  //Merkle
  const [accounts, setAccounts] = useState([]);
  const { MerkleTree } = require("merkletreejs");
  const keccak256 = require("keccak256");

  useEffect(() => {
    requestAccount();
  }, []);

  async function requestAccount() {
    if (typeof window.ethereum !== "undefined") {
      let accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccounts(accounts);
    }
  }

  let Whitelist = require("./Accounts.json");
  const leafNodes = Whitelist.map((addr) => keccak256(addr));
  const merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });
  const rootHash = merkleTree.getRoot();
  const claimingAddress = keccak256(accounts[0]);
  const hexProof = merkleTree.getHexProof(claimingAddress);
  //Merkle

  const claimNFTs = () => {
    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
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
        openMintsuccess();
        dispatch(fetchData(blockchain.account));
      });
  };

  const [wl, setWL] = useState(null);

  //new code
  const WlMint = () => {
    let cost = CONFIG.WL_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    setFeedback(`Minting your ${CONFIG.NFT_NAME}...`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mintPresale(mintAmount, hexProof)
      .send({
        gasLimit: String(totalGasLimit),
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })
      .once("error", (err) => {
        console.log(err);
        setFeedback("Sorry, You Are not whitelisted.");
        setClaimingNft(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        openMintsuccess(); //nanti dihapus yaa
        dispatch(fetchData(blockchain.account));
      });
  };
  //new code

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
    // checking if the connected wallet is in whitelist

    let checking = false;
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
      setCheckWallet(false);
      setAddress("No connection");
      wl &&
        wl.map((w) => {
          if (w.wallet.toUpperCase() == blockchain.account.toUpperCase()) {
            // console.log(w.wallet)
            checking = true;
            setCheckWallet(true);
          }
        });

      if (checking) {
        setAddress(
          blockchain.account.substring(0, 4) +
            "..." +
            blockchain.account.substring(38, 42)
        );
      } else {
        openNotwl();
      }
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

  useEffect(() => {
    // hit api to get whitelist data (wallet)
    // axios.get(whitelist_url).then((response) => {
    //   setWL(response.data.reponse);
    // });
    if (whitelist_url) {
      axios
        .get(whitelist_url)
        .then((response) => {
          setWL(response.data.response);
        })
        .catch((error) => {
          console.error("Error fetching whitelist data:", error);
        });
    }
  }, []);

  const calculateTimeLeft = () => {
    // countdown time for page access
    let year = new Date().getFullYear();
    const difference = +new Date(`${year}-2-01 21:10:00`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [year] = useState(new Date().getFullYear());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <span key={interval}>
        {timeLeft[interval]} {interval}{" "}
      </span>
    );
  });

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
              <FontAwesomeIcon className="zoom-a" icon={faDiscord} />
            </SocialMedia>
            <SocialMedia href="https://twitter.com/GadjahSociety">
              <FontAwesomeIcon className="zoom-a" icon={faTwitter} />
            </SocialMedia>
            <SocialMedia href="https://medium.com/@gadjahsociety">
              <FontAwesomeIcon className="zoom-a" icon={faMedium} />
            </SocialMedia>
            <SocialMedia href="https://www.instagram.com/gadjahsocietynft/">
              <FontAwesomeIcon className="zoom-a" icon={faInstagram} />
            </SocialMedia>
            <SocialMedia href={CONFIG.MARKETPLACE_LINK}>
              <SocialMediaImage
                alt={"logo"}
                src={"/config/images/logo-opensea.png"}
              />
            </SocialMedia>
          </SocialMediaDiv>

          {/* </SocialMedia> */}
          <WalletBox>
            {blockchain.account !== "" ? (
              <>
                <s.TextSubTitle>{walletAddress}</s.TextSubTitle>
              </>
            ) : null}
          </WalletBox>
        </ResponsiveWrapperHeader>
        <s.SpacerSmall />
        {timerComponents.length ? (
          <>
            <Countdown>
              <CTitle>My NFT Minting in</CTitle> <br></br>
              {timerComponents}
            </Countdown>

            <ResponsiveWrapperZero flex={1} test>
              <s.Container flex={1} jc={"center"} ai={"center"}>
                <UnrevealVid autoPlay loop muted>
                  <source
                    src={"/config/images/g_reveal.mp4"}
                    type="video/mp4"
                  />
                </UnrevealVid>
              </s.Container>
              <s.Container flex={1} jc={"center"} ai={"center"}>
                <s.SpacerSmall />

                {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
                  <>
                    <s.TextSub
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      The sale has ended.
                    </s.TextSub>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      You can still find {CONFIG.NFT_NAME} on
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledLink
                      target={"_blank"}
                      href={CONFIG.MARKETPLACE_LINK}
                    >
                      {CONFIG.MARKETPLACE}
                    </StyledLink>
                  </>
                ) : (
                  <>
                    <ResponsiveWrapperContent>
                      <s.TextSub>Price</s.TextSub>
                      <s.TextSub
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
                      </s.TextSub>
                    </ResponsiveWrapperContent>
                    <s.SpacerSmall />
                    <s.StyledHR></s.StyledHR>
                    <s.SpacerXSmall />
                    {!wl_wallet ||
                    blockchain.account === "" ||
                    blockchain.smartContract === null ? (
                      <s.Container ai={"center"} jc={"center"}>
                        <s.SpacerSmall />
                        <StyledButton
                          onClick={(e) => {
                            e.preventDefault();
                            dispatch(connect());
                            getData();
                          }}
                          style={{ cursor: "none" }}
                          disabled
                        >
                          CONNECT WALLET
                        </StyledButton>
                        {blockchain.errorMsg !== "" ? (
                          <>
                            <s.SpacerSmall />
                            <s.TextDescription
                              style={{
                                textAlign: "center",
                                color: "var(--accent-text)",
                                fontSize: "20px",
                              }}
                            >
                              {blockchain.errorMsg}
                            </s.TextDescription>
                          </>
                        ) : null}
                      </s.Container>
                    ) : null}
                    <s.SpacerLarge />
                    <HowToMint
                      style={{ cursor: "none", textDecoration: "none" }}
                    >
                      how to mint <FontAwesomeIcon icon={faQuestionCircle} />
                    </HowToMint>
                    {showModal ? <Modal setShowModal={setShowModal} /> : null}
                  </>
                )}
                {showNotwl ? <Notwl setShowNotwl={setShowNotwl} /> : null}
                {showMintsuccess ? (
                  <Mintsuccess setShowMintsuccess={setShowMintsuccess} />
                ) : null}
              </s.Container>
              <s.SpacerLarge />
            </ResponsiveWrapperZero>
          </>
        ) : (
          <ResponsiveWrapper flex={1} test>
            <s.Container flex={1} jc={"center"} ai={"center"}>
              <UnrevealVid autoPlay loop muted>
                <source src={"/config/images/g_reveal.mp4"} type="video/mp4" />
              </UnrevealVid>
            </s.Container>
            <s.Container flex={1} jc={"center"} ai={"center"}>
              {!(
                !wl_wallet ||
                blockchain.account === "" ||
                blockchain.smartContract === null
              ) ? (
                <>
                  <Box>
                    <s.TextTitle
                      style={{
                        textAlign: "center",
                        fontSize: 26,
                        fontWeight: "bold",
                        color: "var(--accent-text)",
                      }}
                    >
                      {data.totalSupply} of {CONFIG.MAX_SUPPLY} <br></br>
                      <Texto>NFT Minted</Texto>
                    </s.TextTitle>
                  </Box>
                </>
              ) : null}
              <s.SpacerSmall />
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
                  <ResponsiveWrapperContent>
                    <s.TextSub>Price</s.TextSub>
                    <s.TextSub
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
                    </s.TextSub>
                  </ResponsiveWrapperContent>
                  <s.SpacerSmall />
                  <s.StyledHR></s.StyledHR>
                  {!wl_wallet ||
                  blockchain.account === "" ||
                  blockchain.smartContract === null ? (
                    <s.Container ai={"center"} jc={"center"}>
                      <s.SpacerSmall />
                      <StyledButton
                        onClick={(e) => {
                          e.preventDefault();
                          dispatch(connect());
                          getData();
                        }}
                      >
                        CONNECT WALLET
                      </StyledButton>
                      {blockchain.errorMsg !== "" ? (
                        <>
                          <s.SpacerSmall />
                          <s.TextDescription
                            style={{
                              textAlign: "center",
                              color: "var(--accent-text)",
                              fontSize: "20px",
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
                        <ResponsiveWrapperContent>
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
                              fontFamily: "Upheaval",
                              textAlign: "center",
                              color: "var(--accent-text)",
                            }}
                          >
                            {mintAmount}
                          </s.TextDescription>
                          <StyledRoundButton
                            disabled={claimingNft || mintAmount >= 5 ? 1 : 0}
                            onClick={(e) => {
                              e.preventDefault();
                              incrementMintAmount();
                            }}
                          >
                            +
                          </StyledRoundButton>
                        </ResponsiveWrapperContent>
                      </s.Container>
                      <s.StyledHR></s.StyledHR>
                      <s.SpacerSmall />

                      <ResponsiveWrapperContent>
                        <s.TextSub>Total</s.TextSub>
                        <s.TextSub
                          style={{
                            textAlign: "right",
                            color: "var(--accent-text)",
                          }}
                        >
                          {CONFIG.DISPLAY_COST * mintAmount}{" "}
                          {CONFIG.NETWORK.SYMBOL}
                        </s.TextSub>
                      </ResponsiveWrapperContent>

                      <s.SpacerSmall />
                      <s.SpacerXSmall />
                      <s.Container ai={"center"} jc={"center"} fd={"row"}>
                        <StyledButton
                          disabled={claimingNft ? 1 : 0}
                          onClick={(e) => {
                            e.preventDefault();
                            // claimNFTs();
                            WlMint();
                            getData();
                          }}
                        >
                          {claimingNft ? "MINTING..." : "MINT NOW"}
                        </StyledButton>
                      </s.Container>
                    </>
                  )}
                  <s.SpacerLarge />
                  <HowToMint onClick={openModal}>
                    how to mint <FontAwesomeIcon icon={faQuestionCircle} />
                  </HowToMint>
                  {showModal ? <Modal setShowModal={setShowModal} /> : null}
                </>
              )}
              {showNotwl ? <Notwl setShowNotwl={setShowNotwl} /> : null}
              {showMintsuccess ? (
                <Mintsuccess setShowMintsuccess={setShowMintsuccess} />
              ) : null}
            </s.Container>
            <s.SpacerLarge />
          </ResponsiveWrapper>
        )}
        <s.SpacerMedium />
      </s.Container>
    </s.Screen>
  );
}

export default App;
