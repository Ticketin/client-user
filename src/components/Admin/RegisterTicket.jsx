import RegisterForm from "./RegisterForm";
import styles from "./RegisterTicket.module.scss";

const RegisterTicket = () => {
    return (
        <div className={styles.registerTicketContainer}>
            <div className={styles.gridContainer}>
                <div className={styles.formContainer}>
                    <h2>Register new Ticket</h2>
                    <RegisterForm />
                </div>
                <div className={styles.resultContainer}></div>
            </div>
        </div>
    );
};

export default RegisterTicket;
