import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Modal, Typography, Tag } from 'antd';
import { PlayCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import { useQuizStore } from '../../../api/quizStore';

const { Text } = Typography;

export default function QuizResumeModal() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const { status, questions, currentQuestionIndex, restartQuiz } =
    useQuizStore();

  useEffect(() => {
    if (status === 'active' && questions.length > 0) {
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
      onCancel={handleDiscard}
      title={
        <span>
          <PlayCircleOutlined style={{ color: '#2563eb', marginRight: 8 }} />
          Resume Unfinished Quiz?
        </span>
      }
      okText="Resume Quiz"
      cancelText={
        <span>
          <DeleteOutlined style={{ marginRight: 4 }} />
          Discard
        </span>
      }
      onOk={handleResume}
      okButtonProps={{ style: { background: '#2563eb' } }}
      cancelButtonProps={{ danger: true }}
    >
      <Text>We detected that you have an unfinished quiz session.</Text>
      <br />
      <br />
      <Tag
        color="blue"
        style={{ padding: '6px 12px', fontSize: 14, display: 'block' }}
      >
        Progress: Question {currentQuestionIndex + 1} of {questions.length}
      </Tag>
      <br />
      <Text>Do you want to continue this quiz or cancel it?</Text>
    </Modal>
  );
}
