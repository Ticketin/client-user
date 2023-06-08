import React, { useEffect, useRef, useState } from "react";

import * as Tabs from "@radix-ui/react-tabs";
import Layout from "../Layout/Layout";
import { useContractRead, useNetwork } from "wagmi";
import { Link } from "react-router-dom";
import { pockyCollectionsAbi } from "../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import styles from "./Drops.module.scss";
import { convertUnixTime } from "../../utils/convertUnixTime";
import { truncateText } from "../../utils/truncateText";

const Drops = () => {
  const [eventsNow, setEventsNow] = useState([]);
  const [eventsUpcoming, setEventsUpcoming] = useState([]);
  const { chain } = useNetwork();

  // gets all listed collections and filters them by upcoming and now
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
      setEventsUpcoming(tempEventsUpcoming);
    },
  });

  return (
    <Layout>
      <div className={styles.drops}>
        <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
          <Tabs.List
            className={styles.tabsList}
            aria-label="Manage your account"
          >
            <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
              Now
            </Tabs.Trigger>
            <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
              Upcoming
            </Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content className={styles.tabsContent} value="tab1">
            {eventsNow
              ? eventsNow.map((event, index) => {
                  return (
                    <>
                      <Link to={`/buy-ticket/${event.eventId}`}>
                        <div key={index} className={styles.eventRow}>
                          <div className={styles.imageWrapper}>
                            <img
                              className={styles.eventImage}
                              src={event.imageUrl}
                              alt="x"
                            />
                          </div>
                          <div className={styles.eventContent}>
                            <p className={styles.eventDate}>
                              {convertUnixTime(event.startDate.toString())} -{" "}
                              {convertUnixTime(event.endDate.toString())}
                            </p>
                            <p className={styles.eventTitle}>
                              {" "}
                              {truncateText(event.name, 70)}
                            </p>
                            <p className={styles.eventDescription}>
                              {truncateText(event.description, 170)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })
              : null}
          </Tabs.Content>
          <Tabs.Content className={styles.tabsContent} value="tab2">
            {eventsUpcoming
              ? eventsUpcoming.map((event, index) => {
                  return (
                    <>
                      <Link to={`/buy-ticket/${event.eventId}`}>
                        <div key={index} className={styles.eventRow}>
                          <div className={styles.imageWrapper}>
                            <img
                              className={styles.eventImage}
                              src={event.imageUrl}
                              alt="x"
                            />
                          </div>
                          <div className={styles.eventContent}>
                            <p className={styles.eventDate}>
                              {convertUnixTime(event.startDate.toString())} -{" "}
                              {convertUnixTime(event.endDate.toString())}
                            </p>
                            <p className={styles.eventTitle}>
                              {truncateText(event.name, 70)}
                            </p>
                            <p className={styles.eventDescription}>
                              {truncateText(event.description, 170)}
                            </p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })
              : null}
          </Tabs.Content>
        </Tabs.Root>
      </div>
    </Layout>
  );
};

export default Drops;
