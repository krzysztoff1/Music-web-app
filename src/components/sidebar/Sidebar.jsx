import styles from "./sidebar.module.scss";

const Sidebar = () => {
  let pages = [
    { title: "Home", icon: <></> },
    { title: "Discover", icon: <></> },
    { title: "Podcasts", icon: <></> },
    { title: "Radio", icon: <></> },
  ];

  return (
    <>
      <button className={styles.toggle__button}>
        <svg
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <section className={styles.sidebar}>
        <svg
          className={styles.logo}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
        </svg>
        <div className={styles.list__container}>
          {pages.map((item) => (
            <button
              key={item.title}
              type="button"
              className={styles.list__button}
            >
              {item.title}
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default Sidebar;
