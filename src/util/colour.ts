import { scaleSequentialSqrt } from "d3-scale";
import {
  interpolateBuPu,
  interpolateOrRd,
  interpolateGreys,
  interpolateTurbo,
} from "d3-scale-chromatic";
import { City } from "../lib/city";
import { cityDistance } from "./distance";

const GREEN_SQUARE = "🟩";
const ORANGE_SQUARE = "🟧";
const RED_SQUARE = "🟥";
const WHITE_SQUARE = "⬜";
const YELLOW_SQUARE = "🟨";

// Belgium's Eifel region is roughly 60 km across.
// Using 100 km as max to give good colour spread.
const MAX_DISTANCE = 100_000;

export const getColour = (
  guess: City,
  answer: City,
  nightMode: boolean,
  highContrast: boolean,
  prideMode: boolean
) => {
  if (guess.name === answer.name) return "green";
  if (guess.proximity == null) {
    guess["proximity"] = cityDistance(guess, answer);
  }
  const gradient = highContrast
    ? interpolateGreys
    : prideMode
    ? interpolateTurbo
    : nightMode
    ? interpolateBuPu
    : interpolateOrRd;
  const colorScale = scaleSequentialSqrt(gradient).domain([MAX_DISTANCE, 0]);
  const colour = colorScale(guess.proximity);
  return colour;
};

export const getColourEmoji = (guess: City, answer: City) => {
  if (guess.name === answer.name) return GREEN_SQUARE;
  if (guess.proximity == null) {
    guess["proximity"] = cityDistance(guess, answer);
  }
  const scale = guess.proximity / MAX_DISTANCE;
  if (scale < 0.1) {
    return RED_SQUARE;
  } else if (scale < 0.25) {
    return ORANGE_SQUARE;
  } else if (scale < 0.5) {
    return YELLOW_SQUARE;
  } else {
    return WHITE_SQUARE;
  }
};
