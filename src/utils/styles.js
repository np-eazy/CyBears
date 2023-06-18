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

export const purplePalette = [
  new Color(181+30, 201, 219),
  new Color(194+24, 211, 227),
  new Color(207+16, 221, 235),
  new Color(220+8, 232, 243),
  new Color(233, 242, 251)
]


export const darkBluePalette = [
  new Color(255-181, 255-201, 255-219),
  new Color(255-194, 255-211, 255-227),
  new Color(255-207, 255-221, 255-235),
  new Color(255-220, 255-232, 255-243),
  new Color(255-233, 255-242, 255-251)
]

export const headingOne = {
  fontSize: 48,
  fontWeight: "bold",
  color: darkBluePalette[0].getHex(),
  dropShadow: "3px 3px 10px " + darkBluePalette[2].getHex()
};

export const paragraph = {
  fontSize: 12,
  color: darkBluePalette[4],
};

export const defaultSpacing = {
  padding: 8,
  borderRadius: 5,
};
