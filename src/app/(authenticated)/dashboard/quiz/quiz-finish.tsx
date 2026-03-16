import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Flex, Typography } from 'antd';
import { Trophy, RefreshCcw, LayoutDashboard } from 'lucide-react';
import { useQuizStore } from '../../../../store/quiz-store';

const { Title, Text } = Typography;

export default function QuizFinish() {
  const navigate = useNavigate();
  const { score, questions, status, restartQuiz } = useQuizStore();

  const totalQuestions = questions.length;
  const correctAnswersCount = score / 10;
  const wrongAnswersCount = totalQuestions - correctAnswersCount;
  const percentage = Math.round((correctAnswersCount / totalQuestions) * 100);

  useEffect(() => {
    if (status === 'idle' || questions.length === 0) {
      navigate('/dashboard');
    }
  }, [status, questions, navigate]);

  const handlePlayAgain = () => {
    restartQuiz();
    navigate('/dashboard/quizz');
  };

  const handleBackToDashboard = () => {
    restartQuiz();
    navigate('/dashboard');
  };

  const feedbackMessage =
    percentage >= 80
      ? "Amazing job! You're a master!"
      : percentage >= 50
        ? 'Good effort! Keep practicing.'
        : "Don't give up! Try again to improve.";

  return (
    <Flex justify="center" align="center" style={{ padding: 24 }}>
      <Card
        style={{
          width: '100%',
          maxWidth: 480,
          borderColor: '#e2e8f0',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          overflow: 'hidden',
          textAlign: 'center',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Flex
          vertical
          align="center"
          gap={8}
          style={{
            backgroundColor: '#f8fafc',
            borderBottom: '1px solid #f1f5f9',
            padding: '40px 24px',
          }}
        >
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <div
              style={{
                position: 'absolute',
                inset: -16,
                background: 'rgba(250,204,21,0.2)',
                borderRadius: '50%',
                filter: 'blur(16px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                backgroundColor: '#fff',
                padding: 16,
                borderRadius: '50%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                border: '1px solid #fef9c3',
                display: 'inline-flex',
              }}
            >
              <Trophy size={48} color="#eab308" />
            </div>
          </div>

          <Title level={2} style={{ margin: 0, color: '#1e293b' }}>
            Quiz Completed!
          </Title>
          <Text type="secondary">Here is your performance result</Text>
        </Flex>

        <Flex
          vertical
          align="center"
          gap={4}
          style={{ padding: '32px 24px 0' }}
        >
          <span
            style={{
              fontSize: 64,
              fontWeight: 900,
              color: '#0f172a',
              lineHeight: 1,
            }}
          >
            {score}
          </span>
          <Text
            style={{
              fontSize: 11,
              fontWeight: 600,
              color: '#94a3b8',
              letterSpacing: 3,
              textTransform: 'uppercase',
            }}
          >
            Total Score
          </Text>
        </Flex>

        <Flex
          justify="space-around"
          style={{
            borderTop: '1px solid #f1f5f9',
            borderBottom: '1px solid #f1f5f9',
            margin: '24px 0',
            padding: '24px 0',
          }}
        >
          <Flex vertical align="center" gap={4}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#94a3b8',
                textTransform: 'uppercase',
              }}
            >
              Questions
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#334155' }}
            >
              {totalQuestions}
            </Text>
          </Flex>

          <div style={{ width: 1, backgroundColor: '#f1f5f9' }} />

          <Flex vertical align="center" gap={4}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#22c55e',
                textTransform: 'uppercase',
              }}
            >
              Correct
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#16a34a' }}
            >
              {correctAnswersCount}
            </Text>
          </Flex>

          <div style={{ width: 1, backgroundColor: '#f1f5f9' }} />

          <Flex vertical align="center" gap={4}>
            <Text
              style={{
                fontSize: 11,
                fontWeight: 600,
                color: '#ef4444',
                textTransform: 'uppercase',
              }}
            >
              Wrong
            </Text>
            <Text
              style={{ fontSize: 20, fontWeight: 'bold', color: '#dc2626' }}
            >
              {wrongAnswersCount}
            </Text>
          </Flex>
        </Flex>

        <Text type="secondary" style={{ fontSize: 14 }}>
          {feedbackMessage}
        </Text>

        <Flex vertical gap={12} style={{ padding: '24px 32px 32px' }}>
          <Button
            type="primary"
            size="large"
            icon={<RefreshCcw size={16} />}
            onClick={handlePlayAgain}
            style={{
              height: 48,
              fontSize: 15,
              backgroundColor: '#2563eb',
              border: 'none',
            }}
            block
          >
            Play Again
          </Button>

          <Button
            size="large"
            icon={<LayoutDashboard size={16} />}
            onClick={handleBackToDashboard}
            style={{ height: 48, fontSize: 15 }}
            block
          >
            Dashboard
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
}
