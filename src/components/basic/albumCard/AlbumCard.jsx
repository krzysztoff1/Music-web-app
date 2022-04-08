import styles from "./albumCard.module.scss";
import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AlbumCard = ({ item }) => {
  const [isHovered, setHovered] = useState(false);

  const handlePlay = (e) => {
    e.stopPropagation();
  };

  return (
    <Link to={`/album/${item.id}`}>
      <motion.div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={styles.container}
      >
        <div className={styles.header}>
          <img
            className={styles.cover}
            src={item.images[1].url}
            alt="album cover"
          />
          <motion.div
            onClick={handlePlay}
            initial={false}
            transition={{ duration: "0.2s", type: "spring" }}
            animate={{
              opacity: isHovered ? 1 : 0,
              translateY: isHovered ? -10 : 20,
            }}
            className={styles.play__container}
          >
            <FaPlay className={styles.play} />
          </motion.div>
        </div>
        <div className={styles.text__container}>
          <b className={styles.name}>{item.name}</b>
          <span className={styles.info__container}>
            <p className={styles.date}>
              {item.release_date.substring(0, item.release_date.indexOf("-"))} •
            </p>
            <p className={styles.type}> {item.album_type}</p>
          </span>
        </div>
      </motion.div>
    </Link>
  );
};

export default AlbumCard;
