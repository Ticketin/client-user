import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import Dropdown from "../UI/Dropdown";
import { ticketCollectionFactoryAbi } from "../../constants";

import styles from "./RegisterForm.module.scss";
import useDebounce from "../../hooks/useDebounce";
import { useAccount, useContractWrite, useNetwork, usePrepareContractWrite, useWaitForTransaction } from "wagmi";

const RegisterForm = () => {
    const { chain } = useNetwork();
    const { isConnected, address } = useAccount();

    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        mode: "all", // "onChange" + "onBlur"
    });

    const watchEventName = watch("eventName", false); // false is defeault value
    const eventSymbol = watch("eventSymbol", false);

    // debouncing watched variables so we don't overload the RPC in usePrepareContractWrite
    const debouncedName = useDebounce(watchEventName);
    const debouncedSymbol = useDebounce(eventSymbol);

    // prepares the contract write, this way we pre-send our args to the RPC, we can catch errors before we send.
    // address: we get the right contract address by the currently connected chain
    // enabled: only enable this hook if isConnected, debouncedAddress, debouncedName and debouncedRole are true
    // args: all the debounched args, so we only call this hook every 0,5s max, also convert the string to bytes32
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePrepareContractWrite({
        address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        abi: ticketCollectionFactoryAbi,
        functionName: "deployNewTicketCollection",
        enabled: true,
        args: [debouncedName, debouncedSymbol, address],
    });

    const { data, error, isError, write: createNewEvent } = useContractWrite(config);

    // wait for the transaction to finish so we can refresh the data on success
    const { isLoading, isSuccess } = useWaitForTransaction({
        hash: data?.hash,
        onSuccess(data) {
            console.log(`event added!`);
        },
    });

    const onSubmit = (data) => {
        console.log("adding new event");
        createNewEvent?.();
    };

    return (
        <>
            <form className={styles.registerTicketForm} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        type="text"
                        name="eventName"
                        label="Event Name"
                        errors={errors}
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
                        validationSchema={{
                            required: "Event Symbol is required.",
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
                        validationSchema={{
                            required: "Ticket amount is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    />
                    {/* <InputField
                        type="number"
                        name="ticketPrice"
                        label="Single Ticket Price"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Ticket price is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    />
                    <Dropdown
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
                    /> */}
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Create Event</button>
                </div>
                {isSuccess ? (
                    <div className={styles.txSuccess}>
                        <p> ✅ Succesfully added new event!</p>
                    </div>
                ) : null}
            </form>
        </>
    );
};

export default RegisterForm;
