import { motion } from "framer-motion";

import styles from "./InputField.module.scss";

const InputField = ({ name, label, register, readOnly, errors, required, type, validationSchema }) => {
    const variants = {
        valid: {
            backgroundColor: "#ffffff",
            borderLeft: "0px",
            transition: { duration: 0.3 },
        },
        error: {
            outline: "1px solid rgba(225, 50, 22, 1)",
            backgroundColor: "rgba(255, 198, 189, 1)",
            borderLeft: "10px solid rgb(255, 104, 80)",
            transition: { duration: 0.3 },
        },
    };

    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>
                {label}
                {required && "*"}
            </label>
            <motion.input readOnly={readOnly} data-isreadonly={readOnly} className={styles.formInput} animate={errors[name] ? "error" : "valid"} variants={variants} id={name} name={name} type={type} {...register(name, validationSchema)} />
            {errors[name] && <p className={styles.errorMessage}>{errors[name]?.message}</p>}
        </div>
    );
};

export default InputField;
