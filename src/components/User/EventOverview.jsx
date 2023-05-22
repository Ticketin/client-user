import React, { useState } from "react";
import { usePrepareContractWrite, useContractWrite, useWaitForTransaction, useAccount, useContractRead, useContractEvent, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import SingleEvent from "./SingleEvent";

import styles from "./EventOverview.module.scss";

const EventOverview = () => {
    const { isConnected, address } = useAccount();
    // const [collectionAmount, setCollectionAmount] = useState();

    const { data: collectionAmount, refetch: fetchTotalCollectionCount } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "collectionCounter",
        watch: true,
        args: [],
        onSuccess(data) {
            console.log(`---total count---`);
            console.log(data.toString());
            // setCollectionAmount(data.toString());
        },
    });

    const renderTestingMintSingles = () => {
        return Array.from({ length: collectionAmount }, (_, index) => <SingleEvent key={index} index={index} />);
    };

    return (
        <>
            <div className="userMintSection">
                <div className={styles.titleWrapper}>
                    <h2>USER SECTION</h2>
                    <div className={styles.flexContainer}></div>
                    {collectionAmount && renderTestingMintSingles()}
                </div>
            </div>
        </>
    );
};

export default EventOverview;
