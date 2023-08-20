import type { DeprecatedCalculator } from '@/types/calculator';
import type { DeprecatedCalculators } from '@/types/calculators';

import type { Calculator } from '@data/types/calculator';

export const deprecatedFetchCalculator = async (
  electionId: string,
  districtId: string,
) => {
  const calculator: DeprecatedCalculator = await fetch(
    `/data/kalkulacka/${electionId}/${districtId}.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return calculator;
};

export const deprecatedFetchCalculators = async () => {
  const data: DeprecatedCalculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.calculators;
};

export const deprecatedFetchElections = async () => {
  const data: DeprecatedCalculators = await fetch(
    `/data/kalkulacka/calculators.json`,
  ).then((x) => {
    if (x.status === 200) {
      return x.json();
    }
  });
  return data.elections;
};

export const deprecatedFetchElectionData = async (electionId: string) => {
  const data: DeprecatedCalculators = await fetch(
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


export const fetchData = async () => {
  const data: Calculator = await fetch('/data/instance/volebnakalkulacka.sk/nrsr-2023/inventura-2020-2023/calculator.json').then((response) => {
    if (response.status === 200) {
      return response.json();
    }
  });
  console.log(data);
};
