import styles from "./Header.module.scss";
import Navigation from "./Navigation";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className={styles.header}>
            <Navigation />
            <div className={styles.actionBlock}>
                <div className={styles.title}>
                    <h1>Pick Your Side 🐱‍👤</h1>
                </div>
                <div className={styles.selectUser}>
                    <div className={styles.user}>
                        <Link to="/user">
                            <h2>User</h2>
                        </Link>
                    </div>
                    <div className={styles.admin}>
                        <Link to="/admin">
                            <h2>Admin</h2>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
