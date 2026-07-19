import { lazy, Suspense, useState } from "react";
import { City } from "../lib/city";

import { FormattedMessage } from "react-intl";
import WinMessage from "../components/WinMessage";

const Globe = lazy(() => import("../components/Globe"));
const Guesser = lazy(() => import("../components/Guesser"));
const List = lazy(() => import("../components/List"));

type Props = {
  reSpin: boolean;
};

export default function Game({ reSpin }: Props) {
  // Always start fresh — no localStorage persistence
  const [guesses, setGuesses] = useState<City[]>([]);
  const [win, setWin] = useState(false);
  const [showWin, setShowWin] = useState(false);

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
      <div className="my-6 px-4 space-y-4 text-center dark:text-gray-200">
      </div>
      <WinMessage show={showWin} setShow={setShowWin} />
      <Guesser
        guesses={guesses}
        setGuesses={setGuesses}
        win={win}
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
