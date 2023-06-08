import React, { useState } from "react";
import Layout from "../Layout/Layout";
import styles from "./BuyTicket.module.scss";
import Section from "../UI/Section";
import Container from "../UI/Container";
import Button from "../UI/Button";
import {
  useContractRead,
  useNetwork,
  useContractWrite,
  useAccount,
} from "wagmi";
import { useParams } from "react-router-dom";
import { pockyCollectionsAbi, pockyTicketSalesAbi } from "../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import { convertUnixTime } from "../../utils/convertUnixTime";
import ethIcon from "./../../assets/ethereum.svg";
import { ethers } from "ethers";

const BuyTicket = () => {
  const { chain } = useNetwork();
  const params = useParams();
  const [singleEvent, setSingleEvent] = useState();
  const { address } = useAccount();

  console.log(`the ID of this event is ${params.eventId}`);

  // gets the collection data from the param which has been passed by useParam from the Drops page
  const { data: eventData, refetch: fetchEventData } = useContractRead({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYCOLLECTIONS_CONTRACT
    ),
    abi: pockyCollectionsAbi,
    functionName: "get",
    args: [params.eventId],
    onSuccess(data) {
      console.log(data);
      setSingleEvent(data);
      console.log(data.priceInETH.toString());
    },
  });

  // purchases a ticket, passing the price of the ticket as value
  const {
    data: purchasedTicket,
    write: buyTicket,
    isLoading: purchaseLoading,
    isSuccess: purchaseSuccess,
  } = useContractWrite({
    address: getContractAddressByChain(
      chain,
      CONTRACTS.POCKYTICKETSALES_CONTRACT
    ),
    abi: pockyTicketSalesAbi,
    functionName: "purchase",
    args: [params.eventId],
    overrides: {
      from: address,
      value: eventData?.priceInETH,
    },
    onSuccess(data) {
      console.log(`bought ticket!`);
      console.log(data);
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
            ></img>
          </header>
          {purchaseSuccess ? (
            <div className={styles.purchaseSuccessful}>
              <p>
                Purchase Successful, check the Collections Memories page to see
                all your purchased tickets!
              </p>
            </div>
          ) : null}
          <Section>
            <Container>
              <p className={styles.date}>
                {convertUnixTime(singleEvent.startDate)} -{" "}
                {convertUnixTime(singleEvent.endDate)}
              </p>
              <div className={styles.flexRow}>
                <div className={styles.column}>
                  <h3>{singleEvent.name}</h3>
                  <h4 className={styles.eventLocation}>{singleEvent.eventLocation}</h4>
                </div>
                <div className={styles.priceColumn}>
                  <p className={styles.priceTitle}>Ticket Price</p>
                  <p className={styles.price}>
                    <p>
                      {ethers.utils.formatEther(
                        singleEvent.priceInETH.toString()
                      )}
                    </p>
                    <img className={styles.ethIcon} src={ethIcon} />
                  </p>
                </div>
              </div>
              <div className={styles.buttonWrapper}>
                {!purchaseLoading ? (
                  <Button
                    content="Buy Ticket"
                    size="large"
                    onClick={buyTicket}
                  />
                ) : (
                  <Button
                    content="Loading..."
                    size="large"
                    onClick={buyTicket}
                  />
                )}
              </div>
              <div className={styles.eventDescription}>
                <p>{singleEvent.description}</p>
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
                    <p>
                      {ethers.utils.formatEther(
                        singleEvent.priceInETH.toString()
                      )}{" "}
                      ETH
                    </p>
                    <p>TO:DO</p>
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

export default BuyTicket;
