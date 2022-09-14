export interface Answer {
  question_id: string;
  answer: string;
}

export interface Candidate {
  candidate_id: string;
  name: string;
  short_name: string;
  abbreviation: string;
  logo: string;
}

export interface Match {
  candidate: Candidate;
  score: number;
}

export interface Election {
  id: string;
  key: string;
  name: string;
  description: string;
  type: string;
}

export interface Calculator {
  id: string;
  name: string;
  description: string;
  district_code: string;
  election: Election;
}

export interface Result {
  result_id: string;
  created_at: Date;
  answers: Answer[];
  matches: Match[];
  calculator: Calculator;
  source: string;
}
