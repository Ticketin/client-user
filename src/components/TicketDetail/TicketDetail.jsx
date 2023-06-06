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

const TicketDetail = () => {
  const { chain } = useNetwork();
  const params = useParams();
  const [singleEvent, setSingleEvent] = useState();

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

  return (
    <Layout>
      {singleEvent ? (
        <>
          <header className={styles.header}>
            <img
              className={styles.headerImage}
              src={singleEvent.imageUrl}
            ></img>{" "}
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
                    <h3>{singleEvent.eventLocation}</h3>
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
                <p className={styles.informationTitle}>Token Information</p>
                <div className={styles.information}>
                  <div className={styles.point}>
                    <p>Location</p>
                    <p>Price</p>
                    <p>Quantity</p>
                  </div>
                  <div className={styles.details}>
                    <p>{singleEvent.eventLocation}</p>
                    <p>{singleEvent.priceInETH.toString()}</p>
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
