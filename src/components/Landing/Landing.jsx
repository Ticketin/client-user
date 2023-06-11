import React, { useEffect, useRef, useState } from "react";

import Layout from "../Layout/Layout";
import daftPunk from "./../../assets/images/daft-punk.jpg";
import images from "./../../images";
import { useAccount, useContractRead, useNetwork } from "wagmi";
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
import { truncateText } from "../../utils/truncateText";

const Landing = () => {
  const handleDragStart = (e) => e.preventDefault();
  const carousel = useRef();
  const [width, setWidth] = useState(0);
  const navigate = useNavigate();
  const [eventsNow, setEventsNow] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);
  const [featuredEvent, setFeaturedEvent] = useState();
  const { chain } = useNetwork();
  const { isConnected } = useAccount();

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
      const currentDate = Math.floor(Date.now());

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
    console.log(carousel?.current);
    console.log(carousel.current?.scrollWidth, carousel?.current?.offsetWidth);
    setWidth(carousel?.current?.scrollWidth - carousel?.current?.offsetWidth);
  }, [eventsNow, eventsUpcoming]);

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
      {isConnected ? (
        <>
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
          ) : (
            <header className={styles.placeHolderHeader}>
              <div className={styles.headingText}>
                <h3 className={styles.imageText}>Add a featured Event</h3>
                <h3 className={styles.imageText}>Placeholder value</h3>
              </div>
            </header>
          )}
          <Section>
            <div className={styles.sectionHeading}>
              <h4>Now</h4>
              <Link to={"./drops"}>See More</Link>
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
                {eventsNow ? (
                  eventsNow.map((event, index) => {
                    return (
                      <div
                        key={index}
                        className={styles.boxContainer}
                        onMouseDown={(e) => mouseDownCoords(e)}
                        onMouseUp={(e) => clickOrDrag(e, index, event.eventId)}
                      >
                        <motion.div className={styles.box}>
                          <img
                            className={styles.myImage}
                            src={event.imageUrl}
                          />
                        </motion.div>
                        <div className={styles.boxData}>
                          <p className={styles.eventName}>
                            {truncateText(event.name, 22)}
                          </p>
                          <p className={styles.eventDescription}>
                            {truncateText(event.eventLocation, 22)}
                          </p>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div>Hey</div>
                )}
              </motion.div>
            </motion.div>
          </Section>
          <Section>
            <div className={styles.sectionHeading}>
              <h4>Upcoming</h4>
              <Link to={"./drops"}>See More</Link>
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
                          onMouseUp={(e) =>
                            clickOrDrag(e, index, event.eventId)
                          }
                        >
                          <motion.div className={styles.box}>
                            <img
                              className={styles.myImage}
                              src={event.imageUrl}
                            />
                          </motion.div>
                          <div className={styles.boxData}>
                            <p className={styles.eventName}>
                              {truncateText(event.name, 22)}
                            </p>
                            <p className={styles.eventDescription}>
                              {truncateText(event.eventLocation, 22)}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  : null}
              </motion.div>
            </motion.div>
          </Section>
        </>
      ) : (
        <div className={styles.notConnected}>
          <h2>Please Connect Your Wallet</h2>
        </div>
      )}
    </Layout>
  );
};

export default Landing;
