import { ticketCollectionFactoryAbi, } from "../../constants";
import styles from "./EventsList.module.scss";
import SingleEvent from "./SingleEvent";
import { useAccount, useContractRead,  } from "wagmi";

const EventsList = () => {
    const { address } = useAccount();

    // Fetching all deployed collections by the currently connected admin address
    const { data: ticketCollectionAddresses } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "getDeployedCollections",
        watch: true,
        args: [address],
        onSuccess(data) {
            console.log(`---list of addresses---`);
            console.log(data);
        },
    });

    return (
        <div className={styles.eventsListContainer}>
            <h2>My Running Events</h2>
            {ticketCollectionAddresses &&
                ticketCollectionAddresses.map((nftContractAddress, index) => {
                    return <SingleEvent key={index} nftContractAddress={nftContractAddress} />;
                })}
        </div>
    );
};

export default EventsList;
