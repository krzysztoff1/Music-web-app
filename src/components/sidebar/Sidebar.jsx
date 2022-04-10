import {
  FaHome,
  FaHeart,
  FaPodcast,
  FaSearch,
  FaSignOutAlt,
} from "react-icons/fa";
import { runUsersPlaylists } from "@/atoms/usersPlaylists";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";
import { accessTokenAtom } from "@/atoms/accessTokenAtom";

const Sidebar = () => {
  const [playlists] = useAtom(runUsersPlaylists);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);

  const pages = [
    { title: "Home", icon: <FaHome />, url: "/" },
    { title: "Saved Tracks", icon: <FaHeart />, url: "/saved_tracks" },
    { title: "Podcasts", icon: <FaPodcast />, url: "/" },
    { title: "Search", icon: <FaSearch />, url: "/search" },
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
      <nav className={styles.sidebar}>
        <div className={styles.logo}></div>
        <div className={styles.list__container}>
          {pages.map((item) => (
            <Link
              to={item.url}
              key={item.title}
              className={styles.list__button}
            >
              <div className={styles.list__icon}>{item.icon}</div>
              {item.title}
            </Link>
          ))}
          <Link
            to={"/"}
            onClick={() => setAccessToken()}
            type="button"
            className={styles.list__button}
          >
            <div className={styles.list__icon}>
              <FaSignOutAlt />
            </div>
            Log out
          </Link>
          <hr className={styles.divider} />
        </div>
        <div>
          <section className={styles.playlists__wrapper}>
            {playlists.data?.items.map((item) => (
              <Link
                key={item.id}
                to={`/playlist/${item.id}`}
                className={styles.playlists__link}
              >
                {item.name}
              </Link>
            ))}
          </section>
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
