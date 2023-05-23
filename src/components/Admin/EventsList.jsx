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

    // // NEW PART FOR FETCHING FROM LIST
    // const { data: ticketCollectionAddresses, refetch: fetchTicketCollectionAddresses } = useContractRead({
    //     address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
    //     abi: ticketCollectionFactoryAbi,
    //     functionName: "getDeployedCollections",
    //     watch: true,
    //     args: [],
    //     onSuccess(data) {
    //         console.log(`---list of addresses---`);
    //         console.log(data);
    //         // setCollectionAmount(data.toString());
    //     },
    // });

    return (
        <div className={styles.eventsListContainer}>
            <h2>My Running Events</h2>
            {eventData?.[0] && isConnected ? (
                <div className={styles.eventsWrapper}>
                    <SingleEvent eventName={eventData[0]} eventSymbol={eventData[1]} ticketsSold={eventData[2]?.toString()} tokenURI={eventData[3]} />{" "}
                </div>
            ) : null}
            {/* {ticketCollectionAddresses &&
                ticketCollectionAddresses.map((address, index) => {
                    return <SingleEvent key={index} address={address} />;
                })} */}
        </div>
    );
};

export default EventsList;
