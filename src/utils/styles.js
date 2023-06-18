import { Color } from "./Colors";


export const orangePalette = [
  "#FF5656",
  "#FF9F40",
  "#FFCA3A",
  "#FFEB73",
  "#FFFCB5",
];

export const bluePalette = [
  new Color(181+10, 201, 219),
  new Color(194+8, 211, 227),
  new Color(207+5, 221, 235),
  new Color(220+2, 232, 243),
  new Color(233, 242, 251)
]

export const darkBluePalette = [
  new Color(100, 90, 200),
  new Color(120, 110, 220),
  new Color(100, 90, 200),
  new Color(100, 90, 200),
  new Color(100, 90, 200),
]

export const headingOne = {
  fontSize: 48,
  fontWeight: "bold",
  color: darkBluePalette[0].getHex(),
  textShadow: "15px 15px 20px rgba(191, 201, 219, 0.5)",
  // textGradient: 
};

export const paragraph = {
  margin: 5,
  fontSize: 16,
  color: darkBluePalette[0].getHex(),
};

export const defaultSpacing = {
  padding: 8,
  borderRadius: 5,
};
