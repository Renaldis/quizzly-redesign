export interface QuestionResult {
  type: string;
  difficulty: string;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuizQuestion extends QuestionResult {
  id: number;
  all_options: string[];
}

export interface QuizHistoryItem {
  id: string;
  date: string;
  category: string;
  difficulty: string;
  score: number;
  totalQuestions: number;
  type: string;
}

export interface QuizParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

export type Category = {
  id: number;
  title: string;
  description: string;
  questionsCount: number;
  playsCount: string;
  icon: React.ElementType;
  tint: string;
  bgColor: string;
  badgeColor: string;
};
