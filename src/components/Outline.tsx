import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getPath } from "../util/svg";
import { FormattedMessage } from "react-intl";
import { getColour } from "../util/colour";
import { City } from "../lib/city";

type Props = {
  countryName: string;
  width: number;
};

// Hardcoded proximity values for demo outlines on the Help screen.
// These are approximate distances (in meters) as if the answer were Japan.
const demoProximities: Record<string, number> = {
  France: 9_500_000,
  Nepal: 5_000_000,
  Mongolia: 3_000_000,
  "South Korea": 1_000_000,
};

export default function Outline({ countryName, width }: Props) {
  const { nightMode, highContrast, prideMode } = useContext(ThemeContext).theme;

  const proximity = demoProximities[countryName] ?? 50_000;

  // Create a minimal City-like object for the colour function
  const guessCity: City = {
    name: countryName,
    lat: 0,
    lng: 0,
    proximity,
  };

  const answerCity: City = {
    name: "Japan",
    lat: 0,
    lng: 0,
  };

  const outline = getPath(countryName);

  const colour = getColour(
    guessCity,
    answerCity,
    nightMode,
    highContrast,
    prideMode
  );

  return (
    <figure
      className={`flex space-x-6 md:flex-col md:justify-left md:space-x-0 bg-transparent`}
    >
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        viewBox="0 0 800 600"
        width={width}
        height={width * 0.75}
      >
        <g id={countryName}>
          <path fill={colour} d={outline} stroke="black" />
        </g>
      </svg>
      <figcaption className="text-left sm:text-center font-bold my-auto">
        <FormattedMessage id={countryName} />
      </figcaption>
    </figure>
  );
}
