import { useContext } from "react";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import { useContractReadsMultiData } from "../../hooks/useContractReadsMultiData";
import styles from "./EventsList.module.scss";
import SingleEvent from "./SingleEvent";
import { useAccount, useContractRead, useContractReads, useNetwork } from "wagmi";
import DataContext from "../../context/data-context";

const EventsList = () => {
    const { chain } = useNetwork();
    const { isConnected, address } = useAccount();
    const { eventData } = useContext(DataContext);

    return (
        <div className={styles.eventsListContainer}>
            <h2>My Running Events</h2>
            {eventData?.[0] && isConnected ? (
                <div className={styles.eventsWrapper}>
                    <SingleEvent eventName={eventData[0]} eventSymbol={eventData[1]} ticketsSold={eventData[2]?.toString()} />
                </div>
            ) : null}
        </div>
    );
};

export default EventsList;
