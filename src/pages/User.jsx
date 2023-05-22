import styles from "./User.module.scss";
import ConnectButton from "../components/UI/ConnectButton";
import EventOverview from "../components/User/EventOverview";

const User = () => {
    return (
        <div className={styles.userPanel}>
            <div className={styles.connectButtonWrapper}>
                <ConnectButton />
            </div>
            <div className={styles.flexContainer}>
                {/* <MintTicket /> */}
                <EventOverview />
            </div>
        </div>
    );
};

export default User;
