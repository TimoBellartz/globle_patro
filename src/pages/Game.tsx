import { lazy, Suspense, useState, useEffect } from "react";
import { City } from "../lib/city";

import { FormattedMessage } from "react-intl";
import WinMessage from "../components/WinMessage";

const Globe = lazy(() => import("../components/Globe"));
const Guesser = lazy(() => import("../components/Guesser"));
const List = lazy(() => import("../components/List"));

const STORAGE_KEY = "patro_globle_state";

type Props = {
  reSpin: boolean;
};

export default function Game({ reSpin }: Props) {
  // Restore saved state so refreshing cannot reset the attempt counter
  const saved = (() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null"); }
    catch { return null; }
  })();

  const [guesses, setGuesses] = useState<City[]>(saved?.guesses ?? []);
  const [win, setWin] = useState<boolean>(saved?.win ?? false);
  const [showWin, setShowWin] = useState(false);

  // Persist whenever guesses or win state change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ guesses, win }));
  }, [guesses, win]);


  // Lose when 4 guesses are used up without finding the answer
  const lose = !win && guesses.length >= 3;

  // When the player wins, show the custom message
  const handleWin = () => {
    setWin(true);
    setTimeout(() => setShowWin(true), 1500);
  };

  // Fallback while loading
  const renderLoader = () => (
    <p className="dark:text-gray-200">
      <FormattedMessage id="Loading" />
    </p>
  );

  return (
    <Suspense fallback={renderLoader()}>
      {/* Full-screen lose overlay */}
      {lose && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "#000",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p
            style={{
              color: "#fff",
              fontSize: "clamp(2rem, 8vw, 5rem)",
              fontWeight: 900,
              fontFamily: "'Montserrat', sans-serif",
              textAlign: "center",
              letterSpacing: "0.05em",
              padding: "0 1rem",
            }}
          >
            IHR KRIEGT MICH NIE
          </p>
        </div>
      )}
      <div className="my-6 px-4 space-y-4 text-center dark:text-gray-200">
      </div>
      <WinMessage show={showWin} setShow={setShowWin} />
      <Guesser
        guesses={guesses}
        setGuesses={setGuesses}
        win={win || lose}
        setWin={handleWin}
        practiceMode={false}
      />
      {!reSpin && (
        <div className="pb-4 mb-5">
          <Globe guesses={guesses} win={win} />
          <List
            guesses={guesses}
            win={win}
          />
        </div>
      )}
    </Suspense>
  );
}
