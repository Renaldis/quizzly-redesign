import { useState } from 'react';
import {
  Button,
  Card,
  Table,
  Tag,
  Progress,
  Typography,
  Flex,
  Modal,
  Grid,
} from 'antd';
import {
  DeleteOutlined,
  TrophyOutlined,
  CalendarOutlined,
} from '@ant-design/icons';
import { History as HistoryIcon } from 'lucide-react';
import { useQuizStore } from '../../../../store/quiz-store';

const { Title, Text } = Typography;
const { useBreakpoint } = Grid;

const formatDate = (isoString: string) => {
  return new Date(isoString).toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
  });
};

const getScoreColor = (score: number) => {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#eab308';
  return '#ef4444';
};

const getDifficultyColor = (difficulty: string) => {
  const diff = difficulty.toLowerCase();
  if (diff === 'easy') return 'success';
  if (diff === 'medium') return 'warning';
  if (diff === 'hard') return 'error';
  return 'default';
};

export default function History() {
  const { history, clearHistory } = useQuizStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const itemsPerPage = 5;

  const columns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 130,
      render: (date: string) => (
        <Flex align="center" gap={6}>
          <CalendarOutlined style={{ color: '#94a3b8' }} />
          <Text style={{ color: '#475569' }}>{formatDate(date)}</Text>
        </Flex>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (category: string) => (
        <Text strong style={{ color: '#334155' }}>
          {category}
        </Text>
      ),
    },
    {
      title: 'Difficulty',
      dataIndex: 'difficulty',
      key: 'difficulty',
      width: 110,
      render: (difficulty: string) => (
        <Tag
          color={getDifficultyColor(difficulty)}
          style={{ textTransform: 'capitalize' }}
        >
          {difficulty}
        </Tag>
      ),
    },
    {
      title: 'Questions',
      dataIndex: 'totalQuestions',
      key: 'totalQuestions',
      align: 'center' as const,
      width: 100,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      responsive: ['md'] as any,
      render: (total: number) => <Text type="secondary">{total}</Text>,
    },
    {
      title: 'Score (%)',
      dataIndex: 'score',
      key: 'score',
      width: 180,
      render: (score: number) => (
        <Flex align="center" gap={8}>
          {!isMobile && (
            <div style={{ width: 100 }}>
              <Progress
                percent={score}
                showInfo={false}
                strokeColor={getScoreColor(score)}
                size={['100%', 8]}
                style={{ marginBottom: 0 }}
              />
            </div>
          )}
          <Text type="secondary" style={{ whiteSpace: 'nowrap' }}>
            {score}%
          </Text>
        </Flex>
      ),
    },
  ];

  return (
    <Flex vertical gap={24} style={{ padding: isMobile ? 12 : 24 }}>
      <Flex justify="space-between" align="flex-start" wrap="wrap" gap={16}>
        <Flex vertical gap={4}>
          <Title level={isMobile ? 3 : 2} style={{ margin: 0 }}>
            Quiz History
          </Title>
          <Text type="secondary">
            View your travel history and score progress.
          </Text>
        </Flex>

        {history.length > 0 && (
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => setModalOpen(true)}
            size={isMobile ? 'small' : 'middle'}
          >
            Clear History
          </Button>
        )}
      </Flex>

      <Modal
        title="Delete all history?"
        open={modalOpen}
        centered
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="confirm"
            danger
            type="primary"
            onClick={() => {
              clearHistory();
              setCurrentPage(1);
              setModalOpen(false);
            }}
          >
            Yes, Clear All
          </Button>,
        ]}
      >
        <Text type="secondary">
          This action cannot be undone. All your quiz score records will be
          permanently deleted from this browser.
        </Text>
      </Modal>

      <Card
        style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
        styles={{ body: { padding: 0 } }}
        title={
          <Flex align="center" gap={8}>
            <HistoryIcon size={18} color="#64748b" />
            <span>Recent Attempts</span>
          </Flex>
        }
      >
        {history.length === 0 ? (
          <Flex
            vertical
            align="center"
            justify="center"
            gap={16}
            style={{ padding: isMobile ? '40px 16px' : '64px 24px' }}
          >
            <div
              style={{
                backgroundColor: '#f1f5f9',
                borderRadius: '50%',
                padding: 16,
                display: 'inline-flex',
              }}
            >
              <TrophyOutlined style={{ fontSize: 40, color: '#cbd5e1' }} />
            </div>
            <Flex vertical align="center" gap={4}>
              <Text strong style={{ fontSize: 16, color: '#0f172a' }}>
                No history yet
              </Text>
              <Text
                type="secondary"
                style={{ textAlign: 'center', maxWidth: 320 }}
              >
                You haven't completed any quizzes yet. Start playing quizzes to
                see your progress here!
              </Text>
            </Flex>
          </Flex>
        ) : (
          <Table
            dataSource={history}
            columns={columns}
            rowKey="id"
            scroll={{ x: 500 }}
            style={{ padding: '0 0 8px' }}
            pagination={{
              current: currentPage,
              pageSize: itemsPerPage,
              total: history.length,
              onChange: (page) => setCurrentPage(page),
              simple: isMobile,
              showTotal: isMobile
                ? undefined
                : (total, range) =>
                    `${range[0]}-${range[1]} of ${total} records`,
              style: {
                padding: '12px 16px',
                margin: 0,
                borderTop: '1px solid #f0f0f0',
              },
            }}
          />
        )}
      </Card>
    </Flex>
  );
}
