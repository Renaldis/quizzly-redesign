import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { QuizHistoryItem, QuizQuestion } from '../types/quiz';

interface QuizState {
  questions: QuizQuestion[];
  currentQuestionIndex: number;
  score: number;
  userAnswers: Record<number, string>;
  status: 'idle' | 'loading' | 'active' | 'finished' | 'error';
  endTime: number | null;

  history: QuizHistoryItem[];

  setQuestions: (questions: QuizQuestion[], durationMinutes: number) => void;
  setStatus: (status: QuizState['status']) => void;
  answerQuestion: (answer: string) => void;
  restartQuiz: () => void;
  clearHistory: () => void;
}

export const useQuizStore = create<QuizState>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestionIndex: 0,
      score: 0,
      userAnswers: {},
      status: 'idle',
      endTime: null,
      history: [],

      setQuestions: (questions, durationMinutes) => {
        const targetTime = Date.now() + durationMinutes * 60 * 1000;
        set({
          questions,
          status: 'active',
          endTime: targetTime,
          currentQuestionIndex: 0,
          score: 0,
          userAnswers: {},
        });
      },
      setStatus: (status) => set({ status }),

      answerQuestion: (answer) => {
        const { questions, currentQuestionIndex, score, userAnswers, history } =
          get();
        const currentQuestion = questions[currentQuestionIndex];

        const isCorrect = currentQuestion.correct_answer === answer;
        const pointsToAdd = isCorrect ? 10 : 0;

        const newUserAnswers = {
          ...userAnswers,
          [currentQuestionIndex]: answer,
        };

        const isLastQuestion = currentQuestionIndex === questions.length - 1;

        if (isLastQuestion) {
          const finalScore = score + pointsToAdd;

          const newHistoryItem: QuizHistoryItem = {
            id: Date.now().toString(),
            date: new Date().toISOString(),
            category: questions[0].category,
            difficulty: questions[0].difficulty,
            type: questions[0].type,
            score: finalScore,
            totalQuestions: questions.length,
          };

          set({
            score: score + pointsToAdd,
            userAnswers: newUserAnswers,
            status: 'finished',
            endTime: null,
            history: [newHistoryItem, ...history],
          });
        } else {
          set({
            score: score + pointsToAdd,
            userAnswers: newUserAnswers,
            currentQuestionIndex: currentQuestionIndex + 1,
          });
        }
      },

      restartQuiz: () => {
        set({
          questions: [],
          currentQuestionIndex: 0,
          score: 0,
          userAnswers: {},
          status: 'idle',
          endTime: null,
        });
      },
      clearHistory: () => {
        set({ history: [] });
      },
    }),
    {
      name: 'quiz-storage',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
