import React, { useEffect, useRef, useState } from "react";

import Layout from "../Layout/Layout";
import daftPunk from "./../../assets/images/daft-punk.jpg";
import images from "./../../images";
import { motion } from "framer-motion";
import image1 from "./../../assets/images/carousel-images/red-bull-melbourne.jpg";

import styles from "./Landing.module.scss";
import Section from "../UI/Section";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Landing = () => {
    const handleDragStart = (e) => e.preventDefault();
    const carousel = useRef();
    const [width, setWidth] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(carousel.current);
        console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
        setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }, []);

    const mouseDownCoords = (e) => {
        window.checkForDrag = e.clientX;
    };
    const clickOrDrag = (e, index) => {
        const mouseUp = e.clientX;
        if (mouseUp < window.checkForDrag + 5 && mouseUp > window.checkForDrag - 5) {
            console.log(`clicked ${index}`);
            navigate("/buy-ticket");
        } else {
            console.log(`dragged`);
        }
    };

    const items = [<img key={1} src={daftPunk} onDragStart={handleDragStart} role="presentation" />, <img key={2} src={daftPunk} onDragStart={handleDragStart} role="presentation" />, <img key={3} src={daftPunk} onDragStart={handleDragStart} role="presentation" />];

    return (
        <Layout>
            <header className={styles.header}>
                <div className={styles.imageOverlay} />
                <img className={styles.headerImage} src={daftPunk}></img>
                <div className={styles.headingText}>
                    <h3 className={styles.imageText}>DAFT PUNK</h3>
                    <h3 className={styles.imageText}>LIVE AMSTERDAM ARENA </h3>
                </div>
            </header>

            {/* MY PART FINISHING */}
            <Section>
                <div className={styles.sectionHeading}>
                    <h4>Now</h4>
                    <Link to={"./drops"}>
                        <a>See More</a>
                    </Link>
                </div>
                <motion.div ref={carousel} className={styles.myCarousel} whileTap={{ cursor: "grabbing" }}>
                    <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className={styles.myInnerCarousel}>
                        {images.map((image, index) => {
                            return (
                                <div key={index} className={styles.boxContainer} onMouseDown={(e) => mouseDownCoords(e)} onMouseUp={(e) => clickOrDrag(e, index)}>
                                    <motion.div className={styles.box}>
                                        <img className={styles.myImage} src={image} />
                                    </motion.div>
                                    <div className={styles.boxData}>
                                        <p className={styles.eventName}>NBA-AllStar Weekend</p>
                                        <p className={styles.eventDescription}>NYC - MetStadium</p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </Section>
            <Section>
                <div className={styles.sectionHeading}>
                    <h4>Upcoming</h4>
                    <Link to={"./drops"}>
                        <a>See More</a>
                    </Link>
                </div>
                <motion.div ref={carousel} className={styles.myCarousel} whileTap={{ cursor: "grabbing" }}>
                    <motion.div drag="x" dragConstraints={{ right: 0, left: -width }} className={styles.myInnerCarousel}>
                        {images.map((image, index) => {
                            return (
                                <div key={index} className={styles.boxContainer} onMouseDown={(e) => mouseDownCoords(e)} onMouseUp={(e) => clickOrDrag(e, index)}>
                                    <motion.div className={styles.box}>
                                        <img className={styles.myImage} src={image} />
                                    </motion.div>
                                    <div className={styles.boxData}>
                                        <p className={styles.eventName}>NBA-AllStar Weekend</p>
                                        <p className={styles.eventDescription}>NYC - MetStadium</p>
                                    </div>
                                </div>
                            );
                        })}
                    </motion.div>
                </motion.div>
            </Section>
        </Layout>
    );
};

export default Landing;
