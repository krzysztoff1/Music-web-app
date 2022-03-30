import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "./card.module.scss";
import { useAtom } from "jotai";
import { playingAtom, updatePlaying } from "@/atoms/playerAtom";

const Card = (props) => {
  const [song, setSong] = useAtom(playingAtom);

  return (
    <motion.article
      whileHover={{
        scale: 1.1,
        transition: { type: "spring", duration: 0.3 },
      }}
      onClick={() => setSong({ title: props.title, subtitle: props.subtitle })}
      whileTap={{ scale: 0.9 }}
      style={{ backgroundImage: `url(${props.images.coverart})` }}
      className={styles.container}
    >
      {/* <div className={styles.text__container}>
        <h6 className={styles.title}>{props.title}</h6>
      </div> */}
    </motion.article>
  );
};
Card.defaultProps = {
  props: {},
};

Card.propTypes = {
  props: PropTypes.object,
  title: PropTypes.string,
  images: PropTypes.object,
  coverart: PropTypes.string,
};

export default Card;
