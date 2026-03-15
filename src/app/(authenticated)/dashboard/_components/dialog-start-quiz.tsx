import { useState } from 'react';
import { Modal, Form, Select, Typography, Tag, Button } from 'antd';
import { LoadingOutlined, PlayCircleOutlined } from '@ant-design/icons';
import type { Category } from '../../../../types/quiz';

const { Text } = Typography;
const { Option } = Select;

const QUIZ_DURATION_MINUTES = 15;

type DProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  quizData: Category | undefined;
  isLoading?: boolean;
  onStartQuiz?: (opts: {
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    durationMinutes: number;
  }) => void;
};

export default function DialogStartQuiz({
  open,
  setOpen,
  quizData,
  onStartQuiz,
  isLoading = false,
}: DProps) {
  const [type, setType] = useState<'multiple' | 'boolean'>('multiple');
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>(
    'easy',
  );

  const handleSubmit = () => {
    onStartQuiz?.({ type, difficulty, durationMinutes: QUIZ_DURATION_MINUTES });
  };

  return (
    <Modal
      open={open}
      onCancel={() => !isLoading && setOpen(false)}
      title={quizData?.title ?? 'Start Quiz'}
      closable={!isLoading}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
          <Button onClick={() => setOpen(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            type="primary"
            icon={isLoading ? <LoadingOutlined /> : <PlayCircleOutlined />}
            disabled={isLoading}
            onClick={handleSubmit}
            style={{ background: '#2563eb' }}
          >
            {isLoading ? 'Preparing...' : 'Play Quiz'}
          </Button>
        </div>
      }
      width={420}
    >
      <Form layout="vertical" style={{ marginTop: 16 }}>
        <Form.Item label="Question Type">
          <Select
            value={type}
            onChange={(val: 'multiple' | 'boolean') => setType(val)}
            disabled={isLoading}
          >
            <Option value="multiple">Multiple Choice</Option>
            <Option value="boolean">True / False</Option>
          </Select>
        </Form.Item>

        <Form.Item label="Difficulty">
          <Select
            value={difficulty}
            onChange={(val: 'easy' | 'medium' | 'hard') => setDifficulty(val)}
            disabled={isLoading}
          >
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
        </Form.Item>
      </Form>

      <div
        style={{
          background: '#f8fafc',
          border: '1px solid #e2e8f0',
          borderRadius: 8,
          padding: '12px 16px',
          marginTop: 4,
        }}
      >
        <Text
          strong
          style={{ display: 'block', marginBottom: 6, color: '#374151' }}
        >
          Quiz Rules
        </Text>
        <ul
          style={{ margin: 0, paddingLeft: 20, color: '#64748b', fontSize: 13 }}
        >
          <li>
            Processing time:{' '}
            <Tag color="blue">{QUIZ_DURATION_MINUTES} minutes</Tag>
          </li>
          <li>The question will automatically move on after being answered.</li>
          <li>
            The results will be displayed automatically when the time is up.
          </li>
        </ul>
      </div>
    </Modal>
  );
}
