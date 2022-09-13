export const stringToNormalizedHyphenated = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\s]+/g, '\u002D')
    .replace(/[^\u002D\w]+/g, '')
    .toLowerCase();
};

export const getDistrictCode = (districtParam: string) => {
  return districtParam.split('\u002D')[0];
};
