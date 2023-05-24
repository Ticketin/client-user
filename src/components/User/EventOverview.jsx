import React from "react";
import {  useContractRead} from "wagmi";
import { ticketCollectionFactoryAbi } from "../../constants";
import SingleEvent from "./SingleEvent";

import styles from "./EventOverview.module.scss";

const EventOverview = () => {

    // fetches the collectionCounter from the factory contract which keeps track of all the created ticketcollection contracts
    // TODO: In the future we only want to fetch the active (running) events 
    const { data: collectionAmount, refetch: fetchTotalCollectionCount } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "collectionCounter",
        watch: true,
        args: [],
        onSuccess(data) {
            console.log(`---total count---`);
            console.log(data.toString());
        },
    });

    // Renders a SingleEvent component correspondig to the collectionAmount number
    // e.g: collectionAmount = 5, renders 5 SingleEvent components
    const renderSingleEvent = () => {
        return Array.from({ length: collectionAmount }, (_, index) => <SingleEvent key={index} index={index} />);
    };

    return (
        <>
            <div className="userMintSection">
                <div className={styles.titleWrapper}>
                    <h2>USER SECTION</h2>
                    <div className={styles.flexContainer}></div>
                    {collectionAmount && renderSingleEvent()}
                </div>
            </div>
        </>
    );
};

export default EventOverview;
