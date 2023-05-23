import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractEvent, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useContractReadsMultiData } from "../../hooks/useContractReadsMultiData";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";
import { Link } from "react-router-dom";

import styles from "./SingleEvent.module.scss";

const SingleEvent = ({ index }) => {
    // fetches the contract address from the idToCollection mapping, by the index which has been passed to this component
    // example: index = 1, fetches contract address from position 1 in the idToCollection mapping
    const { data: nftContractAddress, refetch: fetchNftContractAddress } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "idToCollection",
        args: [index],
        watch: true,
        onSuccess(data) {
            // can do stuff here
            console.log(`succesfully fetched contractAddress`);
            console.log(data);
        },
    });

    // fetches the event name/symbol
    const { data, fetchEventDataUser } = useContractReadsMultiDataUser(nftContractAddress);
    fetchEventDataUser();

    console.log(data);

    return (
        <div>
            {data ? (
                <div className={styles.singleEvent}>
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
            ) : null}
        </div>
    );
};

export default SingleEvent;
