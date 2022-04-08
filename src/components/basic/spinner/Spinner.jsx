import { FaSpinner } from "react-icons/fa";
import styles from "./spinner.module.scss";

const Spinner = () => {
  return (
    <main className={styles.container}>
      <FaSpinner className={styles.icon} />
    </main>
  );
};

export default Spinner;
