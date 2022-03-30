import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/sidebar/Sidebar";
import { atom } from "jotai";
import Home from "./pages/home/Home";
import Player from "./components/player/Player";
import styles from "./app.module.scss";

const playingAtom = atom();

function App() {
  return (
    <main className={styles.layout}>
      <section className={styles.main}>
        <Sidebar />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </section>
      <Player />
    </main>
  );
}

export default App;
