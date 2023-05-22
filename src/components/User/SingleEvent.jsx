import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractEvent, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useContractReadsMultiData } from "../../hooks/useContractReadsMultiData";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";
import { Link } from "react-router-dom";

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

    return (
        <div>
            {data ? (
                <>
                    <h3>Event Name: {data[0]}</h3>
                    <p>Description: {data[1]}</p>
                    <p>Contract address: {nftContractAddress}</p>
                    <ul>
                        <li>
                            <Link to={`/user/event/${nftContractAddress}`}>Go to Event</Link>
                        </li>
                    </ul>
                </>
            ) : null}
        </div>
    );
};

export default SingleEvent;
