import React, { useState, useEffect } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import Layout from "../Layout/Layout";
import { pockyTicketAbi } from "../../constants";
import {
  CONTRACTS,
  getContractAddressByChain,
} from "../../utils/getContractAddressByChain";
import {
  useContractRead,
  useNetwork,
  useAccount,
  useContract,
  useProvider,
} from "wagmi";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";

const Collection = () => {
  const [ownedTickets, setOwnedTickets] = useState([]);
  const [updatedTickets, setUpdatedTickets] = useState([]);
  const [normalTickets, setNormalTickets] = useState([]);
  const { chain } = useNetwork();
  const { address } = useAccount();

  // get the token balance in preparation for tokenOfOwnerByIndex to be able to get all owned tickets per user
  const { data: balance, refetch: fetchBalance } = useContractRead({
    address: getContractAddressByChain(chain, CONTRACTS.TICKET_CONTRACT),
    abi: pockyTicketAbi,
    functionName: "balanceOf",
    args: [address],
    onSuccess(data) {
      console.log(`Ticket balance = ${data}`);
    },
  });

  const provider = useProvider();
  const ticketContract = useContract({
    address: getContractAddressByChain(chain, CONTRACTS.TICKET_CONTRACT),
    abi: pockyTicketAbi,
    signerOrProvider: provider,
  });

  async function getTokenList() {
    let ownedTicketList = [];
    for (let i = 0; i < balance; i++) {
      const tokenId = await ticketContract.tokenOfOwnerByIndex(address, i);
      const collectionId = await ticketContract.tokenIdToCollectionId(tokenId);
      const tempOwnedTickets = await ticketContract.collectionOf(tokenId);
      const modifiedOwnedTickets = { ...tempOwnedTickets, collectionId };

      ownedTicketList.push(modifiedOwnedTickets);
    }
    setOwnedTickets(ownedTicketList);

    // filters the currently running events
    const tempTicketsUpdated = ownedTicketList.filter(
      (event) => event.updated === true
    );
    setUpdatedTickets(tempTicketsUpdated);

    // filter the upcoming events
    const tempNormalTickets = ownedTicketList.filter(
      (event) => event.updated === false
    );
    setNormalTickets(tempNormalTickets);

    return ownedTicketList;
  }

  useEffect(() => {
    if (!provider) return;
    async function fetchTokens() {
      const tokens = await getTokenList();
    }
    fetchTokens();
  }, [balance, provider]);

  return (
    <Layout>
      <Tabs.Root className={styles.tabsRoot} defaultValue="tab1">
        <Tabs.List className={styles.tabsList} aria-label="Manage your account">
          <Tabs.Trigger className={styles.tabsTrigger} value="tab1">
            Memories
          </Tabs.Trigger>
          <Tabs.Trigger className={styles.tabsTrigger} value="tab2">
            Updated
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content className={styles.tabsContent} value="tab1">
          <div className={styles.wrapper}>
            <div className={styles.row}>
              {normalTickets
                ? normalTickets.map((ticket, index) => {
                    return (
                      <div key={index} className={styles.column}>
                        <div className={styles.imageWrap}>
                          <Link to={`/ticket-detail/${ticket.collectionId}`}>
                            <img
                              className={styles.flexImage}
                              src={ticket.imageUrl}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </Tabs.Content>
        <Tabs.Content className={styles.tabsContent} value="tab2">
          <div className={styles.wrapper}>
            <div className={styles.row}>
              {updatedTickets
                ? updatedTickets.map((ticket, index) => {
                    return (
                      <div key={index} className={styles.column}>
                        <div className={styles.imageWrap}>
                          <Link to={`/ticket-detail/${ticket.collectionId}`}>
                            <img
                              className={styles.flexImage}
                              src={ticket.imageUrl}
                            />
                          </Link>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>
        </Tabs.Content>
      </Tabs.Root>
    </Layout>
  );
};

export default Collection;
