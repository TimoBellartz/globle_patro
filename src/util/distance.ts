import { computeDistanceBetween, LatLng } from "spherical-geometry-js";
import { City } from "../lib/city";

export function cityDistance(city1: City, city2: City): number {
  const coord1 = new LatLng(city1.lat, city1.lng);
  const coord2 = new LatLng(city2.lat, city2.lng);
  return computeDistanceBetween(coord1, coord2);
}
