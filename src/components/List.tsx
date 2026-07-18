import { useEffect, useState } from "react";
import { GlobeMethods } from "react-globe.gl";
import { FormattedMessage } from "react-intl";
import { City } from "../lib/city";
import { answerName } from "../util/answer";
import Toggle from "./Toggle";

type Props = {
  guesses: City[];
  win: boolean;
  globeRef: React.MutableRefObject<GlobeMethods>;
  practiceMode: boolean;
};

function reorderGuesses(guessList: City[], practiceMode: boolean) {
  return [...guessList].sort((a, b) => {
    // practice
    if (practiceMode) {
      const practiceAnswer = JSON.parse(
        localStorage.getItem("practice") as string
      ) as City;
      const practiceName = practiceAnswer.name;
      if (a.name === practiceName) {
        return -1;
      } else if (b.name === practiceName) {
        return 1;
      } else {
        return (a.proximity ?? 0) - (b.proximity ?? 0);
      }
    }

    // daily
    if (a.name === answerName) {
      return -1;
    } else if (b.name === answerName) {
      return 1;
    } else {
      return (a.proximity ?? 0) - (b.proximity ?? 0);
    }
  });
}

export default function List({ guesses, win, globeRef, practiceMode }: Props) {
  const [orderedGuesses, setOrderedGuesses] = useState(
    reorderGuesses(guesses, practiceMode)
  );
  const [miles, setMiles] = useState(false);

  useEffect(() => {
    setOrderedGuesses(reorderGuesses(guesses, practiceMode));
  }, [guesses, practiceMode]);

  function formatKm(m: number, miles: boolean) {
    const METERS_PER_MILE = 1609.34;
    const BIN = 1;
    const value = miles ? m / METERS_PER_MILE : m / 1000;
    if (value < BIN) return "< " + BIN;

    const rounded = Math.round(value / BIN) * BIN;
    const format = (num: number) =>
      num.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `~ ${format(rounded)}`;
  }

  const qualifier = win ? "Answer" : "Closest";

  const closest = orderedGuesses[0];
  const farthest = orderedGuesses[orderedGuesses.length - 1];

  const [isSortedByDistance, setIsSortedByDistance] = useState(true);
  const guessesToDisplay = isSortedByDistance ? orderedGuesses : guesses;

  return (
    <div className="md:ml-10 md:mr-0 py-8 dark:text-white z-30 mb-20">
      {orderedGuesses.length > 0 && (
        <p className="my-1">
          {isSortedByDistance ? (
            <b>
              <FormattedMessage id={qualifier} />
            </b>
          ) : (
            <b>
              <FormattedMessage id="Guessed" />
            </b>
          )}
        </p>
      )}
      <ul className="grid grid-cols-3 md:grid-cols-4 gap-3">
        {guessesToDisplay.map((guess, idx) => {
          return (
            <li key={idx}>
              <span className="flex items-center">
                <span className="ml-2 text-md text-left">{guess.name}</span>
              </span>
            </li>
          );
        })}
      </ul>
      {closest && farthest && (
        <div className="mt-8">
          <div className="flex items-center space-x-1">
            <p>
              <FormattedMessage id="Game8" />:{" "}
              {formatKm(closest?.proximity ?? 0, miles)}
            </p>
            <Toggle
              name="miles"
              setToggle={setMiles}
              toggle={miles}
              on="km"
              off="miles"
            />
          </div>
          <p>
            <button
              onClick={() => setIsSortedByDistance(!isSortedByDistance)}
              className="mt-2"
            >
              <span className="text-md underline">
                <FormattedMessage
                  id={isSortedByDistance ? "SortByGuesses" : "SortByDistance"}
                />
              </span>
            </button>
          </p>
        </div>
      )}
    </div>
  );
}
