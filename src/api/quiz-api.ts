import apiClient from '../libs/axios';
import type { QuestionResult, QuizQuestion } from '../types/quiz';

interface QuizParams {
  amount: number;
  category?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
  type?: 'multiple' | 'boolean';
}

const decodeHtml = (html: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
};

const shuffleArray = (array: string[]) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export const fetchQuizQuestions = async (
  params: QuizParams,
): Promise<QuizQuestion[]> => {
  const queryParams = new URLSearchParams({
    amount: params.amount.toString(),
  });

  if (params.category)
    queryParams.append('category', params.category.toString());
  if (params.difficulty) queryParams.append('difficulty', params.difficulty);
  if (params.type) queryParams.append('type', params.type);

  const response = await apiClient.get(`/api.php?${queryParams.toString()}`);
  const data = response.data;

  if (data.response_code !== 0) {
    throw new Error(
      'Failed to load questions or not enough questions available.',
    );
  }

  return data.results.map((q: QuestionResult, index: number) => ({
    ...q,
    id: index,
    question: decodeHtml(q.question),
    correct_answer: decodeHtml(q.correct_answer),
    incorrect_answers: q.incorrect_answers.map(decodeHtml),
    all_options: shuffleArray([
      decodeHtml(q.correct_answer),
      ...q.incorrect_answers.map(decodeHtml),
    ]),
  }));
};
