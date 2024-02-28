export const customeMediaQuery = (minWidth: number): string =>
  `@media (min-width: ${minWidth}px)`;

export const media = {
  custom: customeMediaQuery,
  pc: customeMediaQuery(1280),
  tablet: `@media (max-width: 1279px)`,
  mobile: `@media (max-width: 779px)`,
};
