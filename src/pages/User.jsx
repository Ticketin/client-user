import RegisterTicket from "../components/Admin/RegisterTicket";
import EventsList from "../components/Admin/EventsList";
import ConnectButton from "../components/UI/ConnectButton";

import styles from "./User.module.scss";
import MintTicket from "../components/User/MintTicket";

const User = () => {
    return (
        <div className={styles.userPanel}>
            <div className={styles.connectButtonWrapper}>
                <ConnectButton />
            </div>
            <div className={styles.flexContainer}>
                <MintTicket />
            </div>
        </div>
    );
};

export default User;
