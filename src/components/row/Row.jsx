import styles from "./row.module.scss";

const Row = ({ item, i }) => {
  return (
    <article className={styles.row}>
      <p className={styles.track__index}>{i + 1}</p>
      <b>{item.track.name}</b>
      <p>{item.track.artists[0].name}</p>
    </article>
  );
};

export default Row;
