import ColorSystem from "../color/ColorSystem";

export const getRandomColor = (): string => {
  const categories = Object.keys(ColorSystem);
  const randomCategory =
    categories[Math.floor(Math.random() * categories.length)];
  const shades = Object.keys(ColorSystem[randomCategory]);
  const randomShade = shades[Math.floor(Math.random() * shades.length)];
  if (ColorSystem[randomCategory][randomShade] != ColorSystem.neutral[100])
    return ColorSystem[randomCategory][randomShade];
  else return getRandomColor();
};
