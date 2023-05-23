import React from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractEvent, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useState } from "react";
import nbaCardImage from "./../../assets/images/nba-card2.png";
import nbaLogo from "./../../assets/images/nba-logo.png";
import styles from "./MintTicket.module.scss";
import FlipCard, { BackCard, FrontCard } from "../UI/FlipCard";

// CURRENTLY UNUSED CODE, USE ONLY FOR REFERENCE
const MintTicket = () => {
    const { isConnected, address } = useAccount();

    const { data: nftContractAddress, refetch: fetchNftContractAddress } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "adminToCollection",
        args: [address],
        onSuccess(data) {
            // can do stuff here
            console.log(`succesfully fetched contractAddress`);
            console.log(data);
            // fetchMultiData();
        },
    });

    const { config: mintNftConfig } = usePrepareContractWrite({
        address: nftContractAddress,
        abi: ticketCollectionAbi,
        functionName: "safeMint",
        args: [address],
        enabled: true,
    });

    const { data: mintNftData, write: mintNftWrite } = useContractWrite(mintNftConfig);

    const { isSuccess: isSuccessMinftNft } = useWaitForTransaction({
        hash: mintNftData?.hash,
        onSuccess(data) {
            console.log(`successfully minted new NFT`);
            console.log(data);
            fetchOwnedNfts();
        },
    });

    const { data: ownedNfts, refetch: fetchOwnedNfts } = useContractRead({
        address: nftContractAddress,
        abi: ticketCollectionAbi,
        functionName: "balanceOf",
        args: [address],
        onSuccess(data) {
            // can do stuff here
            console.log(`succesfully fetched my nfts`);
            console.log(data);
            fetchTokenURI();
        },
    });

    const { data: tokenURI, refetch: fetchTokenURI } = useContractRead({
        address: nftContractAddress,
        abi: ticketCollectionAbi,
        functionName: "tokenURI",
        args: [ownedNfts - 1],
        onSuccess(data) {
            // can do stuff here
            console.log(`succesfully fetched my nfts`);
            console.log(data);
        },
    });

    const [nftData, setNftData] = useState();

    React.useEffect(() => {
        console.log(`tokenURI Fetched!`);

        async function fetchIpfsData() {
            const response = await fetch(tokenURI);
            const jsonData = await response.json();
            console.log(jsonData);
            setNftData(jsonData);
        }
        fetchIpfsData();
    }, [tokenURI]);

    const handleMintNft = (e) => {
        e.preventDefault();
        console.log(`writing`);
        mintNftWrite?.();
        console.log(`written`);
    };

    return (
        <>
            <div className="userMintSection">
                <div className={styles.titleWrapper}>
                    <h2>USER SECTION</h2>
                    <div className={styles.flexContainer}>
                        <div className={styles.mintTicketContainer}>
                            <h2>NBA All-Stars Tickets</h2>
                            {ownedNfts && <p>Currently owned tickets: {ownedNfts.toString()}</p>}
                            <div className={styles.mintButtonContainer}>
                                <p>price: 0,01 ETH </p>
                                <button onClick={handleMintNft}>Mint Ticket</button>
                            </div>
                        </div>
                        <div className={styles.mintedTicketContainer}>
                            {/* <img className={styles.frontCardImage} src={nbaLogo} alt="RainbowKit Demo NFT" /> */}
                            <div className={styles.testSection}>
                                <FlipCard>
                                    <FrontCard isCardFlipped={isSuccessMinftNft}>
                                        <img className={styles.frontCardImage} src={nbaLogo} alt="RainbowKit Demo NFT" />
                                        <h3 style={{ marginTop: 24 }}>NBA All-Stars</h3>
                                    </FrontCard>
                                    <BackCard isCardFlipped={isSuccessMinftNft}>
                                        {nftData ? (
                                            <div className={styles.mintedTicketData}>
                                                <div className={styles.ticketDetails}>
                                                    <div className={styles.mainContent}>
                                                        <img src={nbaLogo} width="120" alt="RainbowKit Demo NFT" style={{ borderRadius: 8 }} />
                                                        <p>{nftData.name}</p>
                                                        <p>{nftData.description}</p>
                                                    </div>
                                                    <div className={styles.footerContent}>
                                                        <p>
                                                            View on <a href={`https://rinkeby.etherscan.io/tx/`}>Etherscan</a>
                                                        </p>
                                                        <p>
                                                            View on <a href={`https://testnets.opensea.io/assets/rinkeby/1`}>Opensea</a>
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className={styles.ticketImage}>
                                                    <img src={nftData.image} alt="qr-code"></img>
                                                </div>
                                            </div>
                                        ) : null}
                                    </BackCard>
                                </FlipCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MintTicket;
