// - semantic sizings
//   - border
export const borders = ['thin', 'medium', 'thick'] as const;
export type Border = typeof borders[number];
//   - radius
export const radiuses = ['small', 'medium', 'large'] as const;
export type Radius = typeof radiuses[number];

// - semantic spacings
//   - gap
export const gaps = ['small', 'medium', 'large'] as const;
export type Gap = typeof gaps[number];
//   - responsive gap
export const responsiveGaps = gaps;
export type ResponsiveGap = Gap;
//   - optional gap
export const optionalGaps = gaps;
export type OptionalGap = Gap;
