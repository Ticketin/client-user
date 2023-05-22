import { useParams } from "react-router-dom";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useEffect, useState } from "react";
import { useAccount, useContractWrite, useWaitForTransaction } from "wagmi";
import ConnectButton from "../UI/ConnectButton";
import { utils } from "ethers";
import QRCode from "react-qr-code";

const SingleEventDetails = () => {
    const params = useParams();
    const [baseURI, setBaseURI] = useState();
    const [eventData, setEventData] = useState();
    const [mintedTicketData, setMintedTicketData] = useState();
    const [mintedTokenId, setMintedTokenId] = useState();
    const { isConnected, address } = useAccount();

    console.log(params.eventId);
    const { data, fetchEventDataUser } = useContractReadsMultiDataUser(params.eventId);

    const { data: mintedNft, write } = useContractWrite({
        address: params.eventId,
        abi: ticketCollectionAbi,
        functionName: "safeMint",
        args: [address],
        onSuccess(data) {
            console.log(data);
        },
    });

    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: mintedNft?.hash,
        onSuccess(data) {
            console.log(`NFT Minted`);
            console.log(data);
            const mintedTokenIdHex = data.logs[0].topics[3];
            const mintedTokenIdDecimal = parseInt(utils.hexValue(mintedTokenIdHex));
            setMintedTokenId(mintedTokenIdDecimal);
            // const val = mintedTokenId.
            console.log(`minted token id is ${mintedTokenIdDecimal}`);
        },
    });

    // currently fetching data from the baseURI with tokenID 0, we should change this to fetch data
    // from a general event metadata file
    useEffect(() => {
        console.log(`tokenURI Fetched!`);

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

    useEffect(() => {
        console.log(`IN SUCCESS EFFECT`);
        async function fetchMintedIpfsData() {
            const response = await fetch(`https://${baseURI}/${mintedTokenId}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setMintedTicketData(jsonData);
        }
        fetchMintedIpfsData();
    }, [mintedTokenId]);

    // testing section
    const { data: testRes, write: writeTestFunc } = useContractWrite({
        address: params.eventId,
        abi: ticketCollectionAbi,
        functionName: "testFunc",
        args: [5],
        onSuccess(data) {
            console.log(`test func written`);
            console.log(data);
        },
    });

    const { isLoading: is, isSuccess: suc } = useWaitForTransaction({
        hash: testRes?.hash,
        onSuccess(data) {
            console.log(`Test Func completed`);
            console.log(data);
        },
    });

    return (
        <section>
            <div>
                <ConnectButton />
            </div>
            <h1>Event Detail</h1>
            {eventData ? (
                <>
                    <p>Event Name: {eventData.name}</p>
                    <p>{eventData.description}</p>
                    <p>{eventData.ticketPrice}</p>
                    <button onClick={() => write()}>Mint Ticket</button>
                    <button onClick={() => writeTestFunc()}>Write Test Func</button>
                </>
            ) : null}
            {mintedTicketData ? (
                <div style={{ height: "auto", margin: "0 auto", maxWidth: 64, width: "100%" }}>
                    <QRCode size={256} style={{ height: "auto", maxWidth: "100%", width: "100%" }} value={mintedTicketData.qrHash} viewBox={`0 0 256 256`} />
                </div>
            ) : null}
        </section>
    );
};

export default SingleEventDetails;
