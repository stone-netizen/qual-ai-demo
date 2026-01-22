
export type BracketType = 'HIGH' | 'MID' | 'LOW';

export interface QuestionOption {
  label: string;
  points: number;
}

export interface Question {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface AssessmentResult {
  score: number;
  bracket: BracketType;
  isNearMiss: boolean;
  categoryScores: {
    ticketSize: number;
    closeRate: number;
    followUp: number;
    margins: number;
    serviceRate: number;
    adSpend: number;
  };
}
