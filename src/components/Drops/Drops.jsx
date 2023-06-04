import React from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "../Layout/Layout";
import images from "./../../images";
import { motion } from "framer-motion";

import styles from "./Drops.module.scss";
import { Link } from "react-router-dom";

const Drops = () => (
    <Layout>
        <div className={styles.drops}>
            <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
                <Tabs.List className={styles.tabsList} aria-label="Manage your account">
                    <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
                        Now
                    </Tabs.Trigger>
                    <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
                        Upcoming
                    </Tabs.Trigger>
                </Tabs.List>
                <Tabs.Content className={styles.tabsContent} value="tab1">
                    {images.map((image, index) => {
                        return (
                            <>
                                <Link to={"/buy-ticket"}>
                                    <div key={index} className={styles.eventRow}>
                                        <img className={styles.eventImage} src={image} alt="x" />
                                        <div className={styles.eventContent}>
                                            <p className={styles.eventDate}>04/11/2023 - 05/11/2023</p>
                                            <p className={styles.eventTitle}>Melbourne Grand Prix</p>
                                            <p className={styles.eventDescription}>A epic battle between Max Verstappen and Charlex Lerclec, winner takes all!</p>
                                        </div>
                                    </div>
                                </Link>
                            </>
                        );
                    })}
                </Tabs.Content>
                <Tabs.Content className={styles.tabsContent} value="tab2">
                    <p className="Text">UPCOMING EVENTS</p>
                </Tabs.Content>
            </Tabs.Root>
        </div>
    </Layout>
);

export default Drops;
