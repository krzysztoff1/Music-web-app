import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import { atom, useAtom } from "jotai";
import Home from "./pages/home/Home";
import Player from "./components/player/Player";
import styles from "./app.module.scss";
import { nanoid } from "nanoid";
import { accessTokenAtom } from "./atoms/accessTokenAtom";

const codeAtom = atom("");

function App() {
  const [code, setCode] = useAtom(codeAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [loginUrl, setLoginUrl] = useState("");
  const AUTHORIZE = "https://accounts.spotify.com/authorize";
  const redirect_uri = "http://localhost:3000/callback/";
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const client_secret = import.meta.env.VITE_CLIENT_SECRET;

  useEffect(() => {
    requestAuthorization();
  }, []);

  useEffect(() => {
    let access_token = window.location.hash.substring(
      window.location.hash.indexOf("=") + 1,
      window.location.hash.lastIndexOf("&token_")
    );
    setAccessToken(access_token);
  }, [window.location]);

  useEffect(() => {
    if (!accessToken) return;
    const get = async () => {
      const response = await fetch("https://api.spotify.com/v1/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      });
      const user = await response.json();
    };
    get();
  }, [accessToken]);

  const requestAuthorization = () => {
    const scope = "user-read-private user-read-email";
    let url = "https://accounts.spotify.com/authorize";
    url += "?response_type=token";
    url += "&client_id=" + encodeURIComponent(client_id);
    url += "&scope=" + encodeURIComponent(scope);
    url += "&redirect_uri=" + encodeURIComponent(redirect_uri);
    url += "&state=" + encodeURIComponent(nanoid());
    setLoginUrl(url);
  };

  if (!accessToken) return <a href={loginUrl}>Login to spotify</a>;

  return (
    <main className={styles.layout}>
      <section className={styles.main}>
        <BrowserRouter>
          <Sidebar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/callback" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </section>
      <Player />
    </main>
  );
}

export default App;
