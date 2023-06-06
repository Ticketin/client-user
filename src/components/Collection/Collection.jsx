import React, { useState } from "react";
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
  useQuery,
  useProvider,
} from "wagmi";
import styles from "./Collection.module.scss";
import { Link } from "react-router-dom";

const Collection = () => {
  const [ownedTokenIds, setOwnedTokenIds] = useState([]);
  const [ownedTickets, setOwnedTickets] = useState([]);
  const [updatedTickets, setUpdatedTickets] = useState([]);
  const [normalTickets, setNormalTickets] = useState([]);
  const { chain } = useNetwork();
  const { address } = useAccount();

  // get the token balance in preparation for tokenOfOwnerByIndex to be able to get all owned tickets per user
  const { data: balance, refetch } = useContractRead({
    address: getContractAddressByChain(chain, CONTRACTS.TICKET_CONTRACT),
    abi: pockyTicketAbi,
    functionName: "balanceOf",
    args: [address],
    onSuccess(data) {
      console.log(`succesfully fetched BALANCE = ${data}`);
      console.log(data.toString());
    },
  });

  // prepare contract for useQuery (we have to useQuery to be able to loop over contract)
  const provider = useProvider();
  const contract = useContract({
    address: getContractAddressByChain(chain, CONTRACTS.TICKET_CONTRACT),
    abi: pockyTicketAbi,
    signerOrProvider: provider,
  });

  // loops over tokenOfOwnerByIndex for the balance (ERC721Enumerable)
  const { data: ownedTokenList, refetch: fetchOwnedTokenList } = useQuery(
    ["tokenList"],
    async () => {
      let ownedTicketsList = [];
      for (let i = 0; i < balance; i++) {
        const tokenId = await contract.tokenOfOwnerByIndex(address, i);
        const collectionId = await contract._tokenIdToCollectionId(tokenId);
        const tempOwnedTickets = await contract.collectionOf(tokenId);
        const modifiedOwnedTickets = { ...tempOwnedTickets, collectionId };

        ownedTicketsList.push(modifiedOwnedTickets);
        console.log(modifiedOwnedTickets);
      }

      // set all owned tickets
      setOwnedTickets(ownedTicketsList);

      // filters the currently running events
      const tempTicketsUpdated = ownedTicketsList.filter(
        (event) => event.updated === true
      );
      console.log(tempTicketsUpdated);
      setUpdatedTickets(tempTicketsUpdated);

      // filter the upcoming events
      const tempNormalTickets = ownedTicketsList.filter(
        (event) => event.updated === false
      );
      console.log(tempNormalTickets);
      setNormalTickets(tempNormalTickets);
    }
  );

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
              {ownedTickets
                ? ownedTickets.map((ticket, index) => {
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
