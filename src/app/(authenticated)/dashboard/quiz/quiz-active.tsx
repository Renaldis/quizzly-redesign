import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, Progress, Tag, Typography, Flex, Spin } from 'antd';
import {
  ClockCircleOutlined,
  AlertFilled,
  RightOutlined,
} from '@ant-design/icons';
import { useQuizStore } from '../../../../store/quiz-store';

const { Title, Text } = Typography;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
};

export default function QuizActive() {
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, status, answerQuestion, endTime } =
    useQuizStore();

  const [timeLeft, setTimeLeft] = useState(15 * 60);

  useEffect(() => {
    if (status === 'idle' || questions.length === 0) {
      navigate('/dashboard/quizz');
    }
    if (status === 'finished') {
      navigate('/dashboard/quizz/result');
    }
  }, [status, questions, navigate]);

  useEffect(() => {
    if (status !== 'active' || !endTime) return;

    const updateTimer = () => {
      const now = Date.now();
      const difference = Math.floor((endTime - now) / 1000);
      if (difference <= 0) {
        setTimeLeft(0);
        navigate('/dashboard/quizz/result');
      } else {
        setTimeLeft(difference);
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [status, endTime, navigate]);

  if (status === 'loading' || !questions[currentQuestionIndex]) {
    return (
      <Flex
        vertical
        align="center"
        justify="center"
        style={{ height: '50vh', gap: 16 }}
      >
        <Spin size="large" />
        <Text type="secondary">Loading questions...</Text>
      </Flex>
    );
  }

  const currentQ = questions[currentQuestionIndex];
  const progressPercentage =
    ((currentQuestionIndex + 1) / questions.length) * 100;
  const isWarningTime = timeLeft < 60;

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 16px' }}>
      <Flex vertical gap={16} style={{ marginBottom: 32 }}>
        <Flex justify="space-between" align="center">
          <Flex vertical gap={4}>
            <Title level={3} style={{ margin: 0 }}>
              Question {currentQuestionIndex + 1}
              <Text style={{ fontSize: 18, color: '#94a3b8', marginLeft: 4 }}>
                / {questions.length}
              </Text>
            </Title>
            <Tag color="default" style={{ width: 'fit-content' }}>
              {currentQ.category} • {currentQ.difficulty}
            </Tag>
          </Flex>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${isWarningTime ? '#fca5a5' : '#bfdbfe'}`,
              backgroundColor: isWarningTime ? '#fef2f2' : '#eff6ff',
              color: isWarningTime ? '#dc2626' : '#2563eb',
            }}
          >
            <ClockCircleOutlined style={{ fontSize: 18 }} />
            <Text
              style={{
                fontFamily: 'monospace',
                fontSize: 20,
                fontWeight: 'bold',
                color: isWarningTime ? '#dc2626' : '#2563eb',
              }}
            >
              {formatTime(timeLeft)}
            </Text>
          </div>
        </Flex>

        <Progress
          percent={progressPercentage}
          showInfo={false}
          strokeColor="#2563eb"
          size={['100%', 8]}
        />
      </Flex>

      <Card
        style={{ borderColor: '#e2e8f0', overflow: 'hidden' }}
        styles={{
          header: {
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #f1f5f9',
            padding: '32px 24px',
            textAlign: 'center',
          },
          body: { padding: '24px 32px' },
        }}
        title={
          <Title
            level={4}
            style={{
              margin: 0,
              fontWeight: 600,
              color: '#1e293b',
              lineHeight: 1.6,
              whiteSpace: 'normal',
            }}
          >
            {currentQ.question}
          </Title>
        }
      >
        <Flex vertical gap={12}>
          {currentQ.all_options.map((option: string, idx: number) => (
            <Button
              key={idx}
              size="large"
              style={{
                height: 'auto',
                padding: '16px 20px',
                textAlign: 'left',
                borderColor: '#e2e8f0',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
              onClick={() => answerQuestion(option)}
            >
              <Flex align="center" gap={12} style={{ width: '100%' }}>
                <div
                  style={{
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    border: '1px solid #cbd5e1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 13,
                    color: '#64748b',
                    flexShrink: 0,
                  }}
                >
                  {String.fromCharCode(65 + idx)}
                </div>
                <Text style={{ flex: 1, fontSize: 15 }}>{option}</Text>
                <RightOutlined style={{ color: '#cbd5e1', fontSize: 14 }} />
              </Flex>
            </Button>
          ))}
        </Flex>

        <Flex
          justify="center"
          align="center"
          gap={6}
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid #f1f5f9',
            backgroundColor: '#f8fafc',
            padding: '12px 16px',
            borderRadius: '0 0 8px 8px',
          }}
        >
          <AlertFilled style={{ fontSize: 12, color: '#94a3b8' }} />
          <Text style={{ fontSize: 12, color: '#94a3b8' }}>
            Selecting an answer will immediately proceed to the next question.
          </Text>
        </Flex>
      </Card>
    </div>
  );
}
