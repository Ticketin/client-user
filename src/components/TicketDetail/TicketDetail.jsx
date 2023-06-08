import React, { useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./TicketDetail.module.scss";
import Section from "../UI/Section";
import Container from "../UI/Container";
import { useContractRead, useNetwork, useAccount } from "wagmi";
import { Link, useParams } from "react-router-dom";
import { pockyCollectionsAbi, pockyTicketSalesAbi } from "../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import { convertUnixTime } from "../../utils/convertUnixTime";

import { ReactComponent as Ticket } from "./../../assets/ticket.svg";
import { ethers } from "ethers";

const TicketDetail = () => {
  const { chain } = useNetwork();
  const params = useParams();
  const [singleEvent, setSingleEvent] = useState();
  const [ticketSvg, setTicketSvg] = useState();

  // gets the individual collection by params.collectionId which has been passed by the collection page
  // note: this page will get changed in order to support the dnft part
  const { data: eventData, refetch: fetchEventData } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "get",
    args: [params.collectionId],
    onSuccess(data) {
      console.log(data);
      setSingleEvent(data);
    },
  });

  const { data: svg, refetch: fetchSvg } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "svgOf",
    args: [params.collectionId],
    onSuccess(data) {
      setTicketSvg(data);
    },
  });

  return (
    <Layout>
      {svg && singleEvent ? (
        <>
          <header className={styles.header}>
            <div className={styles.svgWrapper}>
              {/* <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svg)}`} /> */}
              {/* <img src={`data:image/svg+xml;base64,${base64data}`} alt="" /> */}
              <Ticket />
            </div>
          </header>
          <Section>
            <Container>
              <div className={styles.eventHeading}>
                <div className={styles.columnInfo}>
                  <div className={styles.eventTitle}>
                    <p className={styles.date}>
                      {convertUnixTime(singleEvent.startDate)} -{" "}
                      {convertUnixTime(singleEvent.endDate)}
                    </p>
                    <h3>{singleEvent.name}</h3>
                    <h4 className={styles.eventLocation}>
                      {singleEvent.eventLocation}
                    </h4>
                  </div>
                  <div className={styles.eventDescription}>
                    <p>{singleEvent.description}</p>
                  </div>
                </div>
                <div className={styles.columnQr}>
                  {/* <img src={qrCode} /> */}
                </div>
              </div>
              <div className={styles.eventInformation}>
                <p className={styles.informationTitle}>Ticket Information</p>
                <div className={styles.information}>
                  <div className={styles.point}>
                    <p>Location</p>
                    <p>Price</p>
                    <p>Quantity</p>
                  </div>
                  <div className={styles.details}>
                    <p>{singleEvent.eventLocation}</p>
                    {ethers.utils.formatEther(
                      singleEvent.priceInETH.toString()
                    )}
                    ETH
                    <p>1</p>
                  </div>
                </div>
              </div>
            </Container>
          </Section>
        </>
      ) : null}
    </Layout>
  );
};

export default TicketDetail;
