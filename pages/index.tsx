import type { Liff } from "@line/liff";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";

const Home: NextPage<{ liff: Liff | null; liffError: string | null }> = ({
  liff,
  liffError
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    if (!liff) {
      console.log("LIFF is not initialized.");
      return;
    }
    console.log("LIFF init succeeded.");
    console.log(liff);
    console.log(liff.getDecodedIDToken());
    if (liff.isLoggedIn()) {
      console.log("LIFF is logged in.");
      setIsLoggedIn(true);
    } else {
      liff.login();
      setIsLoggedIn(true);
    }
  }, [liff, isLoggedIn]);

  const handleLogout = () => {
    if (liff) {
      liff.logout();
      setIsLoggedIn(false);
    }
  };
  return (
    <div>
      <Head>
        <title>LIFF App</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>create-liff-app</h1>
        {liff && <p>LIFF init succeeded.</p>}
        {liffError && (
          <>
            <p>LIFF init failed.</p>
            <p>
              <code>{liffError}</code>
            </p>
          </>
        )}
        <a
          href="https://developers.line.biz/ja/docs/liff/"
          target="_blank"
          rel="noreferrer"
        >
          LIFF Documentation
        </a>
        {isLoggedIn
          ? <div>
              <button onClick={handleLogout}>Logout</button>
            </div>
          : null}
      </main>
    </div>
  );
};

export default Home;
