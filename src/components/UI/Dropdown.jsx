import styles from "./Dropdown.module.scss";

const Dropdown = ({ name, label, register, options, errors, validationSchema }) => {
    return (
        <div className={styles.formControl}>
            <label htmlFor={name}>{label}</label>
            <select className={styles.select} {...register(name, validationSchema)}>
                {options.map((option, index) => (
                    <option key={index} value={option.value}>
                        {option.type}
                    </option>
                ))}
            </select>
            {errors && errors[name]?.type === "required" && <p className="error">{errors[name]?.message}</p>}
        </div>
    );
};

export default Dropdown;
