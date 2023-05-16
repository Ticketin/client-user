import React from "react";

import styles from "./SingleEvent.module.scss";

const SingleEvent = ({ eventName, eventSymbol, ticketsSold }) => {
    return (
        <div className={styles.singleEventContainer}>
            <div className={styles.eventDetails}>
                <p className={styles.eventName}>{eventName}</p>
                <p className={styles.eventSymbol}>{eventSymbol}</p>
            </div>
            <div className={styles.ticketsSold}>
                <p className={styles.ticketSold}>Tickets Sold:</p>
                <p>{ticketsSold}</p>
            </div>
        </div>
    );
};

export default SingleEvent;
