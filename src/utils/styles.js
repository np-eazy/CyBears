import { Color } from "./Colors";

const purplePalette = ["#A3A9C3", "#C5B8D1", "#DDBDE2", "#EFD1F1", "#F9E7FA"];

export const orangePalette = [
  "#FF5656",
  "#FF9F40",
  "#FFCA3A",
  "#FFEB73",
  "#FFFCB5",
];

export const bluePalette = [
  new Color(181, 201, 219),
  new Color(194, 211, 227),
  new Color(207, 221, 235),
  new Color(220, 232, 243),
  new Color(233, 242, 251)
]

const darkBluePalette = [
    "#2A3634",
    "#1D2C2C",
    "#102323",
    "#031919",
    "#001010",
  ];

export const headingOne = {
  fontSize: 48,
  color: darkBluePalette[0],
};

export const paragraph = {
  fontSize: 12,
  color: darkBluePalette[4],
};

export const defaultSpacing = {
  padding: 8,
  borderRadius: 5,
};
