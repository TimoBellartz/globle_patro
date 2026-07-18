
import { answerName } from "../util/answer";
import { FormattedMessage } from "react-intl";

type Props = {
  win: boolean;
  error: any;
  guesses: number;
  practiceMode: boolean;
};

export function Message({ win, error, guesses, practiceMode }: Props) {
  let name = answerName;
  if (practiceMode) {
    const practiceAnswer = JSON.parse(
      localStorage.getItem("practice") as string
    );
    name = practiceAnswer?.name || answerName;
  }

  if (error) {
    return <p className="text-red-700 ">{error}</p>;
  } else if (win) {
    return (
      <p className="text-green-800 dark:text-green-300 font-bold ">
        <FormattedMessage id="Game7" values={{ answer: name }} />
      </p>
    );
  } else if (guesses === 0) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        <FormattedMessage id="Game3" />
      </p>
    );
  } else if (guesses === 1) {
    return (
      <p className="text-gray-700 dark:text-gray-400 ">
        <FormattedMessage id="Game4" />
      </p>
    );
  } else {
    return <p className="text-red-700 "></p>;
  }
}
