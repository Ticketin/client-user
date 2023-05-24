import React, { useEffect, useState } from "react";
import { useContractRead } from "wagmi";
import { ticketCollectionFactoryAbi } from "../../constants";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";
import { Link } from "react-router-dom";

import styles from "./SingleEvent.module.scss";

const SingleEvent = ({ index }) => {
    const [baseURI, setBaseURI] = useState();
    const [eventData, setEventData] = useState();

    // fetches the contract address from the idToCollection mapping, by the index which has been passed to this component from EventOverview
    // example: index = 1, fetches contract address from position 1 in the idToCollection mapping
    const { data: nftContractAddress, refetch: fetchNftContractAddress } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "idToCollection",
        args: [index],
        watch: true,
        onSuccess(data) {
            console.log(`succesfully fetched contractAddress`);
            console.log(data);
        },
    });

    // fetches the details of the event
    const { data, fetchEventDataUser } = useContractReadsMultiDataUser(nftContractAddress);
    fetchEventDataUser();

    // fetches the metadata of a single ticket, in this case we need it to fetch the ipfs image url for each ticket.
    useEffect(() => {
        console.log(`tokenURI Fetched!`);
        async function fetchIpfsData() {
            const baseURI = data[4];
            setBaseURI(baseURI);
            const response = await fetch(`https://${baseURI}/${index}`);
            const jsonData = await response.json();
            setEventData(jsonData);
        }
        fetchIpfsData();
    }, [data]);

    console.log(data);
    console.log(eventData);

    return (
        <>
            {data ? (
                <div className={styles.singleEvent}>
                    <div className={styles.eventImage}>
                        <img src={eventData?.image} alt="new" />
                    </div>
                    <div className={styles.eventDetails}>
                        <h3>Event Name: {data[0]}</h3>
                        <p>Description: {data[1]}</p>
                        <p>Contract address: {nftContractAddress}</p>
                        <p>
                            Sold: {data[2]?.toString()}/{data[3]?.toString()} Tickets
                        </p>
                        <ul>
                            <li className={styles.link}>
                                <Link to={`/user/event/${nftContractAddress}`}>Details</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default SingleEvent;
