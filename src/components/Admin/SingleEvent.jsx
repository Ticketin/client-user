import styles from "./SingleEvent.module.scss";
import { useContractReadsMultiDataUser } from "../../hooks/useContractReadsMultiDataUser";

const SingleEvent = ({ nftContractAddress }) => {
    const { data: [eventName, eventSymbol, ticketsSold, maxSupply] = [] } = useContractReadsMultiDataUser(nftContractAddress);

    // if (!data) {
    //     // Render loading state or return null
    //     return <p>Loading...</p>;
    // }
    // const [eventName, eventSymbol, ticketsSold, maxSupply] = data;
    // console.log(data);

    return (
        <>
            <div className={styles.singleEventContainer}>
                <div className={styles.eventDetails}>
                    <p className={styles.eventName}>{eventName}</p>
                    <p className={styles.eventSymbol}>{eventSymbol}</p>
                </div>
                <div className={styles.ticketsSold}>
                    <p className={styles.ticketSold}>Tickets Sold:</p>
                    <p>
                        {ticketsSold?.toString()}/{maxSupply?.toString()}
                    </p>
                </div>
            </div>
        </>
    );
};

export default SingleEvent;
