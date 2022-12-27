export const stringToNormalizedHyphenated = (str: string) => {
  return str
    .normalize('NFD')
    .replace(/[\s]+/g, '\u002D')
    .replace(/[^\u002D\w]+/g, '')
    .toLowerCase();
};

export const getDistrictCode = (districtParam: string) => {
  const districtNumber = districtParam.split('\u002D')[0];

  if (Number(districtNumber)) {
    return districtNumber;
  } else {
    return districtParam;
  }
};
