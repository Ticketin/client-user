import React from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractEvent, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useState } from "react";

import styles from "./MintTicket.module.scss";

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
        <div className="userMintSection">
            <div className={styles.titleWrapper}>
                <h2>USER SECTION</h2>
                <div className={styles.flexContainer}>
                    <div className={styles.mintButtonContainer}>
                        {ownedNfts && <p>{ownedNfts.toString()}</p>}
                        <button onClick={handleMintNft}>Mint Ticket</button>
                    </div>
                    <div className={styles.mintedTicketContainer}>
                        {isSuccessMinftNft && tokenURI && nftData ? (
                            <div className={styles.mintedTicketData}>
                                <div className={styles.ticketDetails}>
                                    <p>{nftData.name}</p>
                                    <p>{nftData.description}</p>
                                    {/* <p>{tokenURI}</p> */}
                                </div>
                                <div className={styles.ticketImage}>
                                    <img src={nftData.image} alt="qr-code"></img>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MintTicket;



