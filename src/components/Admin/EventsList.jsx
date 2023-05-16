import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../../constants";
import styles from "./EventsList.module.scss";
import SingleEvent from "./SingleEvent";
import { useAccount, useContractRead, useContractReads, useNetwork } from "wagmi";

const EventsList = () => {
    const { chain } = useNetwork();
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
            fetchMultiData();
        },
    });

    const nftContractConfig = {
        address: nftContractAddress,
        abi: ticketCollectionAbi,
    };

    const { data: eventData, refetch: fetchMultiData } = useContractReads({
        contracts: [
            {
                ...nftContractConfig,
                functionName: "name",
            },
            {
                ...nftContractConfig,
                functionName: "symbol",
            },
            {
                ...nftContractConfig,
                functionName: "getTokenId",
            },
        ],
        onSuccess(data) {
            console.log(`--FETCHED MULTIDATA---`);
            console.log("Success", data);
        },
    });
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
