import { runUsersPlaylists } from "@/atoms/usersPlaylists";
import { data } from "autoprefixer";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./sidebar.module.scss";

const Sidebar = () => {
  const [playlists] = useAtom(runUsersPlaylists);

  const pages = [
    { title: "Home", icon: <></>, url: "/" },
    { title: "Saved Tracks", icon: <></>, url: "/saved_tracks" },
    { title: "Podcasts", icon: <></>, url: "/" },
    { title: "Radio", icon: <></>, url: "/" },
  ];

  useEffect(() => console.log(playlists), [playlists]);

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
        <div className={styles.list__container}>
          {pages.map((item) => (
            <Link
              to={item.url}
              key={item.title}
              type="button"
              className={styles.list__button}
            >
              {item.title}
            </Link>
          ))}
        </div>
        <div>
          {playlists.data?.items.map((item) => (
            <Link to={`/playlist/${item.id}`} key={item.id}>
              {item.name}
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
};

export default Sidebar;
