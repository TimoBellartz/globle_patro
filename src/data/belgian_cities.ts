import { City } from "../lib/city";

// Cities and villages in the Belgian Eifel region (eastern Belgium)
// Coordinates are [latitude, longitude]
const belgianCities: City[] = [
  // Answer city
  { name: "Weywertz", lat: 50.3833, lng: 6.1833 },

  // Bütgenbach municipality
  { name: "Bütgenbach", lat: 50.4167, lng: 6.2167 },
  { name: "Elsenborn", lat: 50.4500, lng: 6.2167 },
  { name: "Berg", lat: 50.4000, lng: 6.2333 },
  { name: "Nidrum", lat: 50.4167, lng: 6.1833 },

  // Büllingen municipality
  { name: "Büllingen", lat: 50.4167, lng: 6.2833 },
  { name: "Rocherath", lat: 50.4333, lng: 6.3167 },
  { name: "Krinkelt", lat: 50.4167, lng: 6.3333 },
  { name: "Honsfeld", lat: 50.3667, lng: 6.2833 },
  { name: "Hünningen", lat: 50.3833, lng: 6.2500 },
  { name: "Mürringen", lat: 50.3833, lng: 6.3167 },
  { name: "Wirtzfeld", lat: 50.4000, lng: 6.2667 },
  { name: "Manderfeld", lat: 50.3333, lng: 6.3333 },
  { name: "Losheimergraben", lat: 50.3833, lng: 6.3500 },

  // Amel municipality
  { name: "Amel", lat: 50.3500, lng: 6.1833 },
  { name: "Born", lat: 50.3167, lng: 6.1667 },
  { name: "Deidenberg", lat: 50.3333, lng: 6.1333 },
  { name: "Heppenbach", lat: 50.3500, lng: 6.1333 },
  { name: "Montenau", lat: 50.3500, lng: 6.1000 },
  { name: "Meyerode", lat: 50.3167, lng: 6.2000 },
  { name: "Schoppen", lat: 50.3667, lng: 6.1333 },
  { name: "Eibertingen", lat: 50.3000, lng: 6.1500 },
  { name: "Herresbach", lat: 50.3333, lng: 6.2000 },
  { name: "Iveldingen", lat: 50.3000, lng: 6.2167 },
  { name: "Valender", lat: 50.3167, lng: 6.1333 },

  // Sankt Vith municipality
  { name: "Sankt Vith", lat: 50.2833, lng: 6.1167 },
  { name: "Crombach", lat: 50.2667, lng: 6.0833 },
  { name: "Lommersweiler", lat: 50.2667, lng: 6.1667 },
  { name: "Recht", lat: 50.3000, lng: 6.0333 },
  { name: "Schönberg", lat: 50.3167, lng: 6.2667 },
  { name: "Wallerode", lat: 50.3000, lng: 6.1000 },
  { name: "Neidingen", lat: 50.2500, lng: 6.1333 },
  { name: "Rodt", lat: 50.3000, lng: 6.0667 },
  { name: "Setz", lat: 50.2667, lng: 6.0500 },
  { name: "Neundorf", lat: 50.2500, lng: 6.0667 },
  { name: "Hinderhausen", lat: 50.2833, lng: 6.0667 },
  { name: "Breitfeld", lat: 50.2667, lng: 6.1333 },
  { name: "Steinebrück", lat: 50.2833, lng: 6.2333 },
  { name: "Heuem", lat: 50.2833, lng: 6.1500 },

  // Burg-Reuland municipality
  { name: "Burg-Reuland", lat: 50.2333, lng: 6.1333 },
  { name: "Reuland", lat: 50.2333, lng: 6.1500 },
  { name: "Thommen", lat: 50.2500, lng: 6.1000 },
  { name: "Oudler", lat: 50.2500, lng: 6.1667 },
  { name: "Ouren", lat: 50.1833, lng: 6.1167 },
  { name: "Steffeshausen", lat: 50.2333, lng: 6.0833 },
  { name: "Weweler", lat: 50.2167, lng: 6.0667 },
  { name: "Espeler", lat: 50.2667, lng: 6.2000 },
  { name: "Maldingen", lat: 50.2500, lng: 6.1833 },

  // Eupen municipality
  { name: "Eupen", lat: 50.6333, lng: 6.0333 },
  { name: "Kettenis", lat: 50.6167, lng: 6.0167 },

  // Malmedy municipality
  { name: "Malmedy", lat: 50.4167, lng: 6.0167 },
  { name: "Bévercé", lat: 50.4333, lng: 6.0333 },
  { name: "Ligneuville", lat: 50.3833, lng: 6.0167 },
  { name: "Bellevaux-Ligneuville", lat: 50.3667, lng: 6.0000 },

  // Waimes municipality
  { name: "Waimes", lat: 50.4167, lng: 6.1000 },
  { name: "Faymonville", lat: 50.4000, lng: 6.0833 },
  { name: "Robertville", lat: 50.4500, lng: 6.1167 },
  { name: "Ovifat", lat: 50.4667, lng: 6.0667 },
  { name: "Champagne", lat: 50.4000, lng: 6.1333 },

  // Raeren municipality
  { name: "Raeren", lat: 50.6667, lng: 6.1000 },
  { name: "Eynatten", lat: 50.7000, lng: 6.0667 },
  { name: "Hauset", lat: 50.7167, lng: 6.0500 },

  // Kelmis municipality
  { name: "Kelmis", lat: 50.7167, lng: 6.0000 },
  { name: "Hergenrath", lat: 50.7167, lng: 6.0333 },
  { name: "Neu-Moresnet", lat: 50.7167, lng: 6.0167 },

  // Lontzen municipality
  { name: "Lontzen", lat: 50.6833, lng: 5.9667 },
  { name: "Walhorn", lat: 50.6667, lng: 6.0000 },
  { name: "Astenet", lat: 50.6833, lng: 6.0167 },

  // Nearby notable locations in the Eifel
  { name: "Spa", lat: 50.4833, lng: 5.8667 },
  { name: "Stavelot", lat: 50.3833, lng: 5.9333 },
  { name: "Trois-Ponts", lat: 50.3667, lng: 5.8667 },
  { name: "Vielsalm", lat: 50.2833, lng: 5.9167 },
  { name: "Gouvy", lat: 50.1833, lng: 5.9667 },
  { name: "Lierneux", lat: 50.2833, lng: 5.8000 },
  { name: "Stoumont", lat: 50.3833, lng: 5.8167 },
  { name: "Coo", lat: 50.3833, lng: 5.8667 },
  { name: "Francorchamps", lat: 50.4500, lng: 5.9500 },
  { name: "Bütchenbach", lat: 50.4333, lng: 6.2000 },

  // Signal de Botrange area
  { name: "Botrange", lat: 50.5000, lng: 6.0833 },
  { name: "Baraque Michel", lat: 50.5000, lng: 6.0000 },
];

export default belgianCities;
