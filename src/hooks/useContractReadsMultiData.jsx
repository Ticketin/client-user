import { useAccount, useContractRead, useContractReads } from "wagmi";
import { ticketCollectionFactoryAbi, ticketCollectionAbi } from "../constants";
import { useContext } from "react";
import DataContext from "../context/data-context";

export const useContractReadsMultiData = () => {
    const { address } = useAccount();

    const { updateEventData } = useContext(DataContext);

    const { data: nftContractAddress, refetch: fetchNftContractAddress } = useContractRead({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "adminToCollection",
        args: [address],
        onSuccess(data) {
            console.log(`succesfully fetched contractAddress`);
            console.log(data);
            fetchEventData();
        },
    });

    const nftContractConfig = {
        address: nftContractAddress,
        abi: ticketCollectionAbi,
    };

    const { refetch: fetchEventData } = useContractReads({
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
        ],
        onSuccess(data) {
            console.log(`--FETCHED MULTIDATA---`);
            console.log("Success", data);
            updateEventData(data);
        },
    });
    return {
        fetchNftContractAddress,
    };
};
