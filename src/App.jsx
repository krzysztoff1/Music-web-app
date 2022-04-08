import styles from "./app.module.scss";
import { nanoid } from "nanoid";
import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { accessTokenAtom } from "./atoms/accessTokenAtom";

import { LogIn, Player, Sidebar } from "./components";
import { SavedTracks, Artists, Home, Search } from "./pages";

function App() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loginUrl, setLoginUrl] = useState("");
  const redirect_uri = `${window.location.origin}/callback/`;
  const client_id = import.meta.env.VITE_CLIENT_ID;

  useEffect(() => {
    requestAuthorization();
  }, []);

  // temporary
  useEffect(() => {
    if (!window.location.hash.startsWith("#access_")) return;

    const access_token = window.location.hash.substring(
      window.location.hash.indexOf("=") + 1,
      window.location.hash.lastIndexOf("&token_")
    );

    const expireDate = new Date().getTime() + 1 * 60 * 60 * 1000;

    setAccessToken({
      token: access_token,
      expire: expireDate,
    });
  }, [JSON.stringify(window.location)]);

  const requestAuthorization = () => {
    const scope = "user-read-private user-read-email";
    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += `&client_id=${encodeURIComponent(client_id)}`;
    url += `&scope=${encodeURIComponent(scope)}`;
    url += `&redirect_uri=${encodeURIComponent(redirect_uri)}`;
    url += `&state=${encodeURIComponent(nanoid())}`;
    setLoginUrl(url);
  };

  if (!accessToken || accessToken.expire < new Date())
    return <LogIn loginUrl={loginUrl} />;

  return (
    <main className={styles.layout}>
      <section className={styles.main}>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/callback" element={<Home />} />
          <Route path="/saved_tracks" element={<SavedTracks />} />
          <Route path="/artists/:id" element={<Artists />} />
          <Route path="/search" element={<Search />} />
        </Routes>
      </section>
      <Player />
    </main>
  );
}

export default App;
