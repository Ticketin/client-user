import { useAccount, useContractRead, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../constants";
import { useContext } from "react";
import DataContext from "../context/data-context";

// fetches all the data for the event (user) overview
export const useContractReadsMultiDataUser = (nftContractAddress) => {
    // const { eventDataUser, updateEventDataUser } = useContext(DataContext);

    const nftContractConfig = {
        address: nftContractAddress,
        abi: ticketCollectionAbi,
    };

    const { data: data, refetch: fetchEventDataUser } = useContractReads({
        contracts: [
            {
                ...nftContractConfig,
                functionName: "name",
            },
            {
                ...nftContractConfig,
                functionName: "symbol",
            },
            {
                ...nftContractConfig,
                functionName: "getTokenId",
            },
            {
                ...nftContractConfig,
                functionName: "totalSupply",
            },
            {
                ...nftContractConfig,
                functionName: "baseURI",
            },
        ],
        onSuccess(data) {
            console.log(`--FETCHED MULTIDATA---`);
            console.log("Success", data);
            // updateEventDataUser(data);
        },
    });
    return {
        fetchEventDataUser,
        data,
    };
};
