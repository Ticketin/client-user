import React from "react";
import RegisterTicket from "../components/Admin/RegisterTicket";
import EventsList from "../components/Admin/EventsList";

import styles from "./Admin.module.scss";
import ConnectButton from "../components/UI/ConnectButton";

const Admin = () => {
    return (
        <div className={styles.adminPanel}>
            <div className={styles.connectButtonWrapper}>
                <ConnectButton />
            </div>
            <div className={styles.flexContainer}>
                <RegisterTicket />
                <EventsList />
            </div>
        </div>
    );
};

export default Admin;
