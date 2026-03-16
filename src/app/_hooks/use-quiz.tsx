import {
  useMutation,
  useQuery,
  type UseMutationOptions,
} from '@tanstack/react-query';
import type { QuizParams, QuizQuestion } from '../../types/quiz';
import { fetchQuizQuestions } from '../../api/quiz-api';

export const useQuizQuery = (
  params: QuizParams & { durationMinutes: number },
  enabled: boolean,
) => {
  return useQuery({
    queryKey: ['quiz', params],
    queryFn: () => fetchQuizQuestions(params),
    enabled,
    retry: false,
    staleTime: Infinity,
  });
};

type StartQuizParams = QuizParams & { durationMinutes: number };

export const useStartQuiz = (
  options?: UseMutationOptions<QuizQuestion[], Error, StartQuizParams>,
) => {
  return useMutation({
    mutationFn: (params: StartQuizParams) => fetchQuizQuestions(params),
    ...options,
  });
};
