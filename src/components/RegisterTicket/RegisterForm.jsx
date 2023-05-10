import * as React from "react";
import { useForm } from "react-hook-form";
import InputField from "../UI/InputField";
import Dropdown from "../UI/Dropdown";

import styles from "./RegisterForm.module.scss";

const RegisterForm = () => {
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
    } = useForm({
        mode: "all", // "onChange" or "onBlur"
    });

    const watchAddress = watch("address", false); // false is defeault value
    const watchName = watch("name", false);
    const watchRole = watch("role", false);

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <>
            <form className={styles.registerTicketForm} onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputField
                        type="text"
                        name="address"
                        label="Address"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Address is required.",
                            pattern: {
                                value: /^0x[a-fA-F0-9]{40}$/i,
                                message: "Please enter a valid erc20 address",
                            },
                        }}
                        required
                    />
                    <InputField
                        type="text"
                        name="name"
                        label="Name"
                        errors={errors}
                        register={register}
                        validationSchema={{
                            required: "Name is required",
                            maxLength: { value: 32, message: "Can't be more than 32 characters" },
                        }}
                        required
                    />
                    <Dropdown
                        name="role"
                        label="Role"
                        register={register}
                        options={[
                            { type: "User", value: 0 },
                            { type: "Admin", value: 1 },
                        ]}
                        errors={errors}
                        validationSchema={{
                            required: "Role is required.",
                        }}
                        required
                    />
                </div>
                <div className={styles.submitButton}>
                    <button type="submit">Add Member</button>
                </div>
            </form>
        </>
    );
};

export default RegisterForm;
