import React, { useEffect, useRef, useState } from "react";

import Layout from "../Layout/Layout";
import daftPunk from "./../../assets/images/daft-punk.jpg";
import images from "./../../images";
import { useContractRead, useNetwork } from "wagmi";
import { motion } from "framer-motion";
import image1 from "./../../assets/images/carousel-images/red-bull-melbourne.jpg";

import styles from "./Landing.module.scss";
import Section from "../UI/Section";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { pockyCollectionsAbi } from "../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";

const Landing = () => {
  const handleDragStart = (e) => e.preventDefault();
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const [eventsNow, setEventsNow] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState();
  const { chain } = useNetwork();

  // gets all listed events, gets the latest featured event and filters by upcoming/now
  const { data, refetch } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "list",
    args: [],
    onSuccess(data) {
      console.log(`succesfully fetched`);
      const currentDate = Math.floor(Date.now() / 1000);

      const eventsList = data.map((item, index) => {
        return {
          ...item,
          eventId: index,
        };
      });

      // gets the latest featured event to show in the header
      const tempFeaturedEvent = eventsList
        .filter((event) => event.featured)
        .pop();
      console.log(tempFeaturedEvent);
      setFeaturedEvent(tempFeaturedEvent);

      // filters the currently running events
      const tempEventsNow = eventsList.filter(
        (event) => currentDate > event.startDate && currentDate < event.endDate
      );
      console.log(tempEventsNow);
      setEventsNow(tempEventsNow);

      // filter the upcoming events
      const tempEventsUpcoming = eventsList.filter(
        (event) => currentDate < event.startDate
      );
      console.log(tempEventsUpcoming);
      setEventsUpcoming(tempEventsUpcoming);
    },
  });

  useEffect(() => {
    console.log(carousel.current);
    console.log(carousel.current.scrollWidth, carousel.current.offsetWidth);
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const mouseDownCoords = (e) => {
    window.checkForDrag = e.clientX;
  };

  const clickOrDrag = (e, index, eventId) => {
    const mouseUp = e.clientX;
    if (
      mouseUp < window.checkForDrag + 5 &&
      mouseUp > window.checkForDrag - 5
    ) {
      console.log(`clicked ${index}`);
      navigate(`/buy-ticket/${eventId}`);
    } else {
      console.log(`dragged`);
    }
  };

  return (
    <Layout>
      {featuredEvent ? (
        <header className={styles.header}>
          <Link to={`/buy-ticket/${featuredEvent.eventId}`}>
            <div className={styles.imageOverlay} />
            <img
              className={styles.headerImage}
              src={featuredEvent.imageUrl}
            ></img>
            <div className={styles.headingText}>
              <h3 className={styles.imageText}>{featuredEvent.name}</h3>
              <h3 className={styles.imageText}>
                {featuredEvent.eventLocation}
              </h3>
            </div>
          </Link>
        </header>
      ) : null}
      <Section>
        <div className={styles.sectionHeading}>
          <h4>Now</h4>
          <Link to={"./drops"}>
            <a>See More</a>
          </Link>
        </div>
        <motion.div
          ref={carousel}
          className={styles.myCarousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className={styles.myInnerCarousel}
          >
            {eventsNow
              ? eventsNow.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.boxContainer}
                      onMouseDown={(e) => mouseDownCoords(e)}
                      onMouseUp={(e) => clickOrDrag(e, index, event.eventId)}
                    >
                      <motion.div className={styles.box}>
                        <img className={styles.myImage} src={event.imageUrl} />
                      </motion.div>
                      <div className={styles.boxData}>
                        <p className={styles.eventName}>{event.name}</p>
                        <p className={styles.eventDescription}>
                          {event.eventLocation}
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
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
        <motion.div
          ref={carousel}
          className={styles.myCarousel}
          whileTap={{ cursor: "grabbing" }}
        >
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            className={styles.myInnerCarousel}
          >
            {eventsUpcoming
              ? eventsUpcoming.map((event, index) => {
                  return (
                    <div
                      key={index}
                      className={styles.boxContainer}
                      onMouseDown={(e) => mouseDownCoords(e)}
                      onMouseUp={(e) => clickOrDrag(e, index, event.eventId)}
                    >
                      <motion.div className={styles.box}>
                        <img className={styles.myImage} src={event.imageUrl} />
                      </motion.div>
                      <div className={styles.boxData}>
                        <p className={styles.eventName}>{event.name}</p>
                        <p className={styles.eventDescription}>
                          {event.eventLocation}
                        </p>
                      </div>
                    </div>
                  );
                })
              : null}
          </motion.div>
        </motion.div>
      </Section>
    </Layout>
  );
};

export default Landing;
