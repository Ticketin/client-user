import { useParams } from "react-router-dom";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import ConnectButton from "../UI/ConnectButton";
import { utils } from "ethers";
import QRCode from "react-qr-code";

import styles from "./SingleEventDetails.module.scss";

// Displays details about a single event, and ability for users to buy/mint a ticket
const SingleEventDetails = () => {
    const params = useParams();
    const [baseURI, setBaseURI] = useState();
    const [eventData, setEventData] = useState();
    const [mintedTicketData, setMintedTicketData] = useState();
    const [mintedTokenId, setMintedTokenId] = useState();
    const { address } = useAccount();

    // params.eventId = the contract address of the nftContractAddress, passed by react router using the userParams() hook
    const { data, fetchEventDataUser } = useContractReadsMultiDataUser(params.eventId);

    // prepares the safeMint() write to the ticketCollection contract
    const { data: mintedNft, write } = useContractWrite({
        address: params.eventId,
        abi: ticketCollectionAbi,
        functionName: "safeMint",
        args: [address],
        overrides: {
            from: address,
            value: eventData?.ticketPrice,
        },
        onSuccess(data) {
            console.log(data);
        },
    });

    // waits for the safeMint() write function to complete and returns the txReceipt
    // we get the tokenId of the minted ticket through the event
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: mintedNft?.hash,
        onSuccess(data) {
            console.log(`NFT Minted`);
            console.log(data);
            const mintedTokenIdHex = data.logs[0].topics[3];
            const mintedTokenIdDecimal = parseInt(utils.hexValue(mintedTokenIdHex));
            setMintedTokenId(mintedTokenIdDecimal);
            console.log(`minted token id is ${mintedTokenIdDecimal}`);
            fetchEventDataUser();
        },
    });

    // fetches details about the event from IPFS with tokenID 0, this is a temporary solution
    // currently fetching data from the baseURI with tokenID 0, we should change this to fetch data
    // from a general event metadata file
    useEffect(() => {
        async function fetchIpfsData() {
            const baseURI = data[4];
            setBaseURI(baseURI);
            const response = await fetch(`https://${baseURI}/0`);
            const jsonData = await response.json();
            console.log(jsonData);
            setEventData(jsonData);
        }
        fetchIpfsData();
    }, [data]);

    // fetches data from the newly minted ticket 
    useEffect(() => {
        async function fetchMintedIpfsData() {
            const response = await fetch(`https://${baseURI}/${mintedTokenId}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setMintedTicketData(jsonData);
        }
        fetchMintedIpfsData();
    }, [mintedTokenId]);

    return (
        <section>
            <div>
                <ConnectButton />
            </div>
            <h1>Event Detail</h1>
            {eventData ? (
                <div className={styles.eventData}>
                    <p>Event Name: {eventData.name}</p>
                    <p>Event Description: {eventData.description}</p>
                    <p>Ticket Price: {eventData.ticketPrice} wei</p>
                    <p>Owned Tickets: {data[5].toString()}</p>
                    <button onClick={() => write()}>Buy Ticket</button>
                </div>
            ) : null}
            {mintedTicketData ? (
                <div className={styles.mintedTicketData}>
                    <h3>Minted Ticket</h3>
                    <p>Ticket Id {`#${mintedTicketData.ticketId}`}</p>
                    <div className={styles.qrCodeContainer}>
                        <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={mintedTicketData.qrHash} viewBox={`0 0 256 256`} />
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default SingleEventDetails;
