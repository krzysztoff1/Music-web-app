import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { atom, useAtom } from "jotai";
import Home from "./pages/home/Home";
import Player from "./components/player/Player";
import styles from "./app.module.scss";
import { nanoid } from "nanoid";
import { accessTokenAtom } from "./atoms/accessTokenAtom";
import LogIn from "./components/login/LogIn";
import { Login } from "@mui/icons-material";
import SavedTracks from "./pages/savedTracks/SavedTracks";

function App() {
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loginUrl, setLoginUrl] = useState("");
  const redirect_uri = "http://localhost:3000/callback/";
  const client_id = import.meta.env.VITE_CLIENT_ID;

  useEffect(() => {
    requestAuthorization();
  }, []);

  //? temporary
  useEffect(() => {
    let access_token = window.location.hash.substring(
      window.location.hash.indexOf("=") + 1,
      window.location.hash.lastIndexOf("&token_")
    );
    setAccessToken(access_token);
  }, [window.location]);

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

  if (!accessToken) return <LogIn loginUrl={loginUrl} />;

  return (
    <main className={styles.layout}>
      <section className={styles.main}>
        <Sidebar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/callback" element={<Home />} />
          <Route path="/saved_tracks" element={<SavedTracks />} />
        </Routes>
      </section>
      <Player />
    </main>
  );
}

export default App;
