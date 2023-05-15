import React from "react";

import styles from "./Navigation.module.scss";

const Navigation = () => {
    return (
        <nav className={styles.mainNavigation}>
            <ul className={styles.ul}>
                <li className={styles.li}>LOGO</li>
                <li className={styles.li}>Link 1</li>
                <li className={styles.li}>Link 2</li>
                <li className={styles.li}>Link 3</li>
            </ul>
        </nav>
    );
};

export default Navigation;
