import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import { ticketCollectionFactoryAbi } from "../../constants";
import styles from "./RegisterForm.module.scss";
import { useContractWrite, usePrepareContractWrite, useWaitForTransaction } from "wagmi";
import { useGenerateAndUploadMetaData } from "../../hooks/useGenerateAndUploadMetadata";
import { useState } from "react";

const RegisterForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        mode: "all", // "onChange" + "onBlur"
    });

    // All variables from the form which we want to pass as arguments to the deployNewTicketCollection() function
    const eventName = watch("eventName", false); // false is defeault value
    const eventSymbol = watch("eventSymbol", false);
    const eventDescription = watch("eventDescription", false);
    const ticketAmount = watch("ticketAmount", false); // should be passed to constructor
    const ticketPrice = watch("ticketPrice", false);
    const ticketImage = watch("ticketImage", false);
    const [baseURI, setBaseURI] = useState(null);
    const [isMetaDataGenerated, setIsMetaDataGenerated] = useState(false);

    const { createTickets: createTickets } = useGenerateAndUploadMetaData(1, eventName, eventDescription, ticketAmount, ticketPrice, ticketImage);

    // prepares the contract write, this way we pre-send our args to the RPC, we can catch errors before we send.
    // address: we get the right contract address by the currently connected chain
    // enabled: only enable this hook if baseURI is true
    // args: all the args we pass to the deployNewTicketCollection() function
    const { config } = usePrepareContractWrite({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "deployNewTicketCollection",
        enabled: baseURI,
        args: [eventName, eventSymbol, ticketAmount, ticketPrice, baseURI],
    });

    // writes the deployNewTicketCollection() function by passing config
    const { data, write: createNewEvent } = useContractWrite(config);

    // wait for the transaction to finish so we can refresh the data on success
    const { isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log(`event added!`);
            console.log(data);
        },
    });

    const onSubmit = async (data) => {
        console.log("adding new event");
        createNewEvent?.();
    };

    const handleGenerateMetadata = async () => {
        const tempCid = await createTickets();
        setBaseURI(`ipfs.io/ipfs/${tempCid}`);
        setIsMetaDataGenerated(true);
    };

    return (
        <>
            {isSuccess ? (
                <div className={styles.txSuccess}>
                    <p> ✅ Succesfully added new event!</p>
                </div>
            ) : null}
            <form className={styles.registerTicketForm} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        type="text"
                        name="eventName"
                        label="Event Name"
                        errors={errors}
                        readOnly={isMetaDataGenerated}
                        register={register}
                        validationSchema={{
                            required: "Event Name is required",
                        }}
                        required
                    />
                    <InputField
                        type="text"
                        name="eventSymbol"
                        label="Event Symbol"
                        errors={errors}
                        register={register}
                        readOnly={isMetaDataGenerated}
                        validationSchema={{
                            required: "Event Symbol is required.",
                        }}
                        required
                    />
                    <InputField
                        type="text"
                        name="eventDescription"
                        label="Event Description"
                        errors={errors}
                        register={register}
                        readOnly={isMetaDataGenerated}
                        validationSchema={{
                            required: "Event Description is required.",
                        }}
                        required
                    />
                    {/* <InputField
                        type="text"
                        name="eventDate"
                        label="Event Date"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Event date is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    /> */}
                    <InputField
                        type="number"
                        name="ticketAmount"
                        label="Total Ticket Amount"
                        errors={errors}
                        register={register}
                        readOnly={isMetaDataGenerated}
                        validationSchema={{
                            required: "Ticket amount is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    />
                    <InputField
                        type="number"
                        name="ticketPrice"
                        label="Single Ticket Price"
                        errors={errors}
                        register={register}
                        readOnly={isMetaDataGenerated}
                        validationSchema={{
                            required: "Ticket price is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    />
                    <label>Event Image</label>
                    <input type="file" name="ticketImage" {...register("ticketImage")} />
                    {/* <Dropdown
                        name="role"
                        label="Ticket Type"
                        register={register}
                        options={[
                            { type: "Normal", value: 0 },
                            { type: "VIP", value: 1 },
                            { type: "Backstage", value: 2 },
                        ]}
                        errors={errors}
                        validationSchema={{
                            required: "Role is required.",
                        }}
                        required
                    />  */}
                </div>
                <div className={styles.submitButton}>
                    <button disabled={!createNewEvent} type="submit">
                        Create Collection
                    </button>
                </div>
            </form>
            <div className={styles.submitButton}>
                <button disabled={isMetaDataGenerated} onClick={handleGenerateMetadata}>
                    Generate Metadata
                </button>
            </div>
        </>
    );
};

export default RegisterForm;
