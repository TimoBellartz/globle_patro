import { FormEvent, useContext, useState, useRef, useEffect } from "react";
import { City } from "../lib/city";
import { answerCountry, answerName } from "../util/answer";
import { Message } from "./Message";
import { cityDistance } from "../util/distance";
import { LocaleContext } from "../i18n/LocaleContext";
import localeList from "../i18n/messages";
import { FormattedMessage } from "react-intl";
import belgianCities from "../data/belgian_cities";

type Props = {
  guesses: City[];
  setGuesses: React.Dispatch<React.SetStateAction<City[]>>;
  win: boolean;
  setWin: React.Dispatch<React.SetStateAction<boolean>>;
  practiceMode: boolean;
};

export default function Guesser({
  guesses,
  setGuesses,
  win,
  setWin,
  practiceMode,
}: Props) {
  const [guessName, setGuessName] = useState("");
  const [error, setError] = useState("");
  const { locale } = useContext(LocaleContext);

  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    ref.current?.focus();
  }, [ref]);

  function findCity(cityName: string, list: City[]) {
    return list.find((city) => {
      return city.name.toLowerCase() === cityName;
    });
  }

  // Check and validate guess
  function runChecks() {
    const trimmedName = guessName.trim().toLowerCase();

    const alreadyGuessed = findCity(trimmedName, guesses);
    if (alreadyGuessed) {
      setError(localeList[locale]["Game6"]);
      ref.current?.select();
      return;
    }
    const guessCity = findCity(trimmedName, belgianCities);
    if (!guessCity) {
      setError(localeList[locale]["Game5"]);
      ref.current?.select();
      return;
    }
    if (practiceMode) {
      const practiceAnswer = JSON.parse(
        localStorage.getItem("practice") as string
      ) as City;
      if (guessCity.name === practiceAnswer.name) {
        setWin(true);
      }
    } else if (guessCity.name === answerName) {
      setWin(true);
    }
    return guessCity;
  }

  function addGuess(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    let guessCity = runChecks();
    if (practiceMode) {
      const practiceAnswer = JSON.parse(
        localStorage.getItem("practice") as string
      ) as City;
      if (guessCity && practiceAnswer) {
        guessCity["proximity"] = cityDistance(guessCity, practiceAnswer);
        setGuesses([...guesses, guessCity]);
        setGuessName("");
        return;
      }
    }
    if (guessCity && answerCountry) {
      guessCity["proximity"] = cityDistance(guessCity, answerCountry);
      setGuesses([...guesses, guessCity]);
      setGuessName("");
    }
  }

  return (
    <div className="mt-10 mb-6 block mx-auto text-center">
      <form
        onSubmit={addGuess}
        className="w-80 flex space-x-4 mx-auto my-2 justify-center"
      >
        <input
          className="shadow px-2 py-1 md:py-0
          text-gray-700 dark:bg-slate-200 dark:text-gray-900
          focus:outline-none 
          focus:shadow-outline disabled:bg-slate-400
          border rounded disabled:border-slate-400
          w-full"
          type="text"
          name="guesser"
          id="guesser"
          value={guessName}
          onChange={(e) => setGuessName(e.currentTarget.value)}
          ref={ref}
          disabled={win}
          placeholder={guesses.length === 0 ? localeList[locale]["Game1"] : ""}
          autoComplete="new-password"
        />
        <button
          className="bg-blue-700 dark:bg-purple-800 hover:bg-blue-900 
          dark:hover:bg-purple-900 disabled:bg-blue-900  text-white 
          font-bold py-1 md:py-2 px-4 rounded focus:shadow-outline "
          type="submit"
          disabled={win}
        >
          <FormattedMessage id="Game2" />
        </button>
      </form>
      <Message
        win={win}
        error={error}
        guesses={guesses.length}
        practiceMode={practiceMode}
      />
    </div>
  );
}
