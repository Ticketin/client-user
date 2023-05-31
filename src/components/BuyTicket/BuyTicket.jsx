import React from "react";
import Layout from "../Layout/Layout";

import daftPunk from "./../../assets/images/daft-punk.jpg";
import johnMayer from "./../../assets/images/carousel-images/japan-gp.jpg";

import styles from "./BuyTicket.module.scss";
import Section from "../UI/Section";
import Container from "../UI/Container";
import Button from "../UI/Button";

const BuyTicket = () => {
    return (
        <Layout>
            <header className={styles.header}>
                <img className={styles.headerImage} src={johnMayer}></img>{" "}
            </header>
            <Section>
                <Container>
                    <p className={styles.date}>05/11/2023 - 06/11/2023</p>
                    <h3>Daft Punk</h3>
                    <h3>Amsterdam Arena Live</h3>
                    <div className={styles.buttonWrapper}>
                        <Button content="Buy Ticket" size="large" />
                    </div>
                    <div className={styles.eventDescription}>
                        <p>Experience the electrifying energy of Daft Punk live at the iconic Amsterdam Arena. As the sun sets, the stadium transforms into a pulsating dancefloor, with a spectacular stage setup and state-of-the-art lighting, captivating the crowd from every angle. With their signature helmets and infectious beats, Daft Punk delivers an unforgettable audiovisual journey, blending their classic hits with cutting-edge remixes, leaving the audience in awe and craving for more.</p>
                    </div>
                    <div className={styles.eventInformation}>
                        <p className={styles.informationTitle}>Token Information</p>
                        <div className={styles.information}>
                            <div className={styles.point}>
                                <p>Location</p>
                                <p>Tier</p>
                                <p>Price</p>
                                <p>Quantity</p>
                            </div>
                            <div className={styles.details}>
                                <p>Amsterdam Arena, The Netherlands</p>
                                <p>End loge 110</p>
                                <p>$2,010</p>
                                <p>1</p>
                            </div>
                        </div>
                    </div>
                </Container>
            </Section>
        </Layout>
    );
};

export default BuyTicket;
