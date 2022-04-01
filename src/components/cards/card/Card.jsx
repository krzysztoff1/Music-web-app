import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "./card.module.scss";

const Card = ({ image }) => {
  return (
    <motion.article
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", duration: 0.3 },
      }}
      style={{ backgroundImage: `url(${image})` }}
      className={styles.container}
    />
  );
};

Card.defaultProps = {
  image: "https://t.scdn.co/images/b4182906bf244b4994805084c057e9ee.jpeg",
};

Card.propTypes = {
  image: PropTypes.string,
};

export default Card;
