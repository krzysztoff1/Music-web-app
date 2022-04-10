import styles from "./header.module.scss";

const Header = ({ cover, subTitle, name, type }) => {
  return (
    <header className={styles.header}>
      <img className={styles.cover} src={cover} alt="artist cover" />
      <div className={styles.header__text}>
        <p>{type}</p>
        <h1>{name}</h1>
        <p>{subTitle}</p>
      </div>
    </header>
  );
};

export default Header;
