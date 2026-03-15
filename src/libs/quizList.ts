import type { Category } from '../types/quiz';
export type { Category };
import { CarOutlined, StarOutlined, TrophyOutlined } from '@ant-design/icons';
import { PawPrint } from 'lucide-react';

export const categories: Category[] = [
  {
    id: 27,
    title: 'Animals',
    description:
      'Discover fascinating facts about animals from all over the world.',
    questionsCount: 10,
    playsCount: '5k',
    icon: PawPrint,
    bgColor: '#10b981',
    tint: '#ecfdf5',
    badgeColor: '#d1fae5',
  },
  {
    id: 28,
    title: 'Vehicles',
    description:
      'From classic cars to modern aircraft and everything in between.',
    questionsCount: 10,
    playsCount: '3.2k',
    icon: CarOutlined,
    bgColor: '#0ea5e9',
    tint: '#f0f9ff',
    badgeColor: '#e0f2fe',
  },
  {
    id: 21,
    title: 'Sports',
    description:
      'Test your knowledge about sports, teams, records, and legends.',
    questionsCount: 10,
    playsCount: '7.8k',
    icon: TrophyOutlined,
    bgColor: '#f59e0b',
    tint: '#fffbeb',
    badgeColor: '#fef3c7',
  },
  {
    id: 26,
    title: 'Celebrities',
    description:
      'Movies, music, TV, and the stories behind your favorite stars.',
    questionsCount: 10,
    playsCount: '4.1k',
    icon: StarOutlined,
    bgColor: '#a855f7',
    tint: '#faf5ff',
    badgeColor: '#f3e8ff',
  },
];
