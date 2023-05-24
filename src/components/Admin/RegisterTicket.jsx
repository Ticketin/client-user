import RegisterForm from "./RegisterForm";
import styles from "./RegisterTicket.module.scss";

const RegisterTicket = () => {
    return (
        <div className={styles.registerTicketContainer}>
            <div className={styles.formContainer}>
                <h2>Register new Event</h2>
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterTicket;
