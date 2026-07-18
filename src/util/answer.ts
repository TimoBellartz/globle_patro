import { City } from "../lib/city";
import belgianCities from "../data/belgian_cities";

// Hardcoded answer city
const answerCity: City = belgianCities.find(c => c.name === "Weywertz")!;

export const answerCountry = answerCity;
export const answerName = answerCity.name;
