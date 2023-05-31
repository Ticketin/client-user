import React from "react";
import * as Tabs from "@radix-ui/react-tabs";

import Layout from "../Layout/Layout";
import images from "./../../images";
import { motion } from "framer-motion";

import daftPunk from "./../../assets/images/daft-punk.jpg";

import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";

const Collection = () => (
    <Layout>
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
                <div className={styles.wrapper}>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div className={styles.imageWrap}>
                                <Link to={"/ticket-detail"}>
                                    <img className={styles.flexImage} src={images[0]} />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.imageWrap}>
                                <Link to={"/ticket-detail"}>
                                    <img className={styles.flexImage} src={images[4]} />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.imageWrap}>
                                <Link to={"/ticket-detail"}>
                                    <img className={styles.flexImage} src={images[7]} />
                                </Link>
                            </div>
                        </div>
                        <div className={styles.column}>
                            <div className={styles.imageWrap}>
                                <Link to={"/ticket-detail"}>
                                    <img className={styles.flexImage} src={images[5]} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Tabs.Content>
            <Tabs.Content className={styles.tabsContent} value="tab2">
                <p>UPCOMING EVENTS</p>
            </Tabs.Content>
        </Tabs.Root>
    </Layout>
);

export default Collection;
