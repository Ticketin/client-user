import React from "react";

import logo from "./../../assets/logo.svg";
import styles from "./Navigation.module.scss";
import ConnectButton from "../UI/ConnectButton";
import { NavLink } from "react-router-dom";

const Navigation = () => {
    return (
        <nav className={styles.mainNavigation}>
            <ul className={styles.ul}>
                <li className={styles.logoContainer}>
                    <NavLink to={"/"}>
                        <img src={logo}></img>
                    </NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={"/drops"}>
                        Drops
                    </NavLink>
                </li>
                <li className={styles.li}>
                    <NavLink className={(navData) => (navData.isActive ? styles.active : "")} to={"/collection"}>
                        Collection
                    </NavLink>
                </li>
                <li className={styles.li}>
                    <ConnectButton />
                </li>
            </ul>
        </nav>
    );
};

export default Navigation;
