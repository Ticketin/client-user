import { NFTStorage } from "nft.storage";
import { useState } from "react";

// This is a copy of the previous custom hook but here we add the functionality to add a image
// to the NFT, we do this by using storeBlob: https://nftstorage.github.io/nft.storage/client/classes/lib.NFTStorage.html#storeBlob
export const useGenerateAndUploadMetaData = (image, eventName, eventDescription, ticketAmount, ticketPrice) => {
    const API_KEY = import.meta.env.VITE_NFTSTORAGE_API_KEY;
    const client = new NFTStorage({ token: API_KEY });
    const [collectionCid, setCollectionCid] = useState(null);

    // edited with image stuff
    // TODO: We might have to add a general metadata.json file at position [0] of the ticketlist, in here we can store 
    // general info about the event like event description, so we dont have to store this in every single ticket.
    const createTickets = async () => {
        let ticketList = [];
        console.log(`creating 100 tickets`);
        // const res = await fetch("https://picsum.photos/id/237/200/300");
        // const blobbie = await res.blob();
        // const meta = {
        //     type: "image/jpeg",
        // };
        // const imageFile = new File([blobbie], "test.jpg", meta);

        // // stores the image to ipfs and returns the cid using the storeBlob() function
        // const imageCid = await client.storeBlob(imageFile);

        for (let i = 0; i < ticketAmount; i++) {
            const qrHash = Math.random().toString(36).slice(2);
            const nftData = {
                ticketId: i,
                name: eventName,
                description: eventDescription,
                ticketPrice: ticketPrice,
                qrHash: qrHash,
            };

            const jsonNftData = JSON.stringify(nftData);
            const file = new File([jsonNftData], i);
            ticketList.push(file);
            console.log(`created ticket ${i}`);
        }
        console.log(ticketList);
        console.log("Uploading Metadata to IPFS ....");
        const tempCid = await client.storeDirectory(ticketList);
        console.log(tempCid);
        console.log("NFT data stored successfully 🚀🚀");
        setCollectionCid(tempCid);

        return tempCid;
    };

    return {
        createTickets,
        collectionCid: collectionCid,
    };
};
