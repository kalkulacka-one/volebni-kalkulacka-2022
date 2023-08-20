import type { Calculator } from '@/types/calculator';
import type { Calculators } from '@/types/calculators';

export const deprecatedFetchCalculator = async (
  electionId: string,
  districtId: string,
) => {
  const calculator: Calculator = await fetch(
    `/data/kalkulacka/${electionId}/${districtId}.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return calculator;
};

export const deprecatedFetchCalculators = async () => {
  const data: Calculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.calculators;
};

export const deprecatedFetchElections = async () => {
  const data: Calculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.elections;
};

export const deprecatedFetchElectionData = async (electionId: string) => {
  const data: Calculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  const election = data.elections.find((x) => x.key === electionId);
  const districts = data.calculators.filter(
    (x) => x.election_id === election?.id,
  );
  return {
    election: election,
    districts: districts,
  };
};
