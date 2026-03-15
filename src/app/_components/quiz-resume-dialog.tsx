import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, Typography, Flex } from 'antd';
import { PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuizStore } from '../../../store/quiz-store';

const { Text } = Typography;

export function QuizResumeDialog() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const { status, questions, currentQuestionIndex, restartQuiz } =
    useQuizStore();

  useEffect(() => {
    if (status === 'active' && questions.length > 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsOpen(true);
    }
  }, [status, questions]);

  const handleResume = () => {
    setIsOpen(false);
    navigate('/dashboard/quizz/active');
  };

  const handleDiscard = () => {
    restartQuiz();
    setIsOpen(false);
  };

  return (
    <Modal
      open={isOpen}
      centered
      closable={false}
      maskClosable={false}
      keyboard={false}
      footer={[
        <Button
          key="discard"
          danger
          icon={<DeleteOutlined />}
          onClick={handleDiscard}
        >
          Discard
        </Button>,
        <Button
          key="resume"
          type="primary"
          icon={<PlayCircleOutlined />}
          onClick={handleResume}
          style={{ backgroundColor: '#2563eb' }}
        >
          Resume Quiz
        </Button>,
      ]}
      title={
        <Flex align="center" gap={8}>
          <PlayCircleOutlined style={{ color: '#3b82f6', fontSize: 18 }} />
          <span>Resume Unfinished Quiz?</span>
        </Flex>
      }
    >
      <Flex vertical gap={12}>
        <Text type="secondary">
          We detected that you have an unfinished quiz session.
        </Text>

        <div
          style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: 8,
            padding: '10px 14px',
          }}
        >
          <Text strong style={{ color: '#334155' }}>
            Progress: Question {currentQuestionIndex + 1} from{' '}
            {questions.length}
          </Text>
        </div>

        <Text type="secondary">
          Do you want to continue this quiz or cancel it?
        </Text>
      </Flex>
    </Modal>
  );
}
