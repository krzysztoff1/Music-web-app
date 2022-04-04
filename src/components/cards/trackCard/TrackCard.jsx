import PropTypes from "prop-types";
import { motion } from "framer-motion";
import styles from "./trackCard.module.scss";
import { useAtom } from "jotai";
import { playingAtom } from "@/atoms/playerAtom";

const TrackCard = (props) => {
  const [song, setSong] = useAtom(playingAtom);

  return (
    <motion.article
      onClick={() => setSong(props.data.track)}
      whileHover={{
        scale: 1.05,
        transition: { type: "spring", duration: 0.3 },
      }}
      style={{
        backgroundImage: `url(${props.image})`,
        filter: `grayscale(${!props.data.track?.preview_url ? "100" : "0"}%)`,
      }}
      className={styles.container}
    />
  );
};

TrackCard.defaultProps = {
  image: "https://t.scdn.co/images/b4182906bf244b4994805084c057e9ee.jpeg",
};

TrackCard.propTypes = {
  image: PropTypes.string,
};

export default TrackCard;
