import { useState } from 'react';
import { useNavigate } from 'react-router';
import {
  Card,
  Row,
  Col,
  Typography,
  Tag,
  Button,
  Flex,
  Space,
  Grid,
} from 'antd';
import {
  ClockCircleOutlined,
  TrophyOutlined,
  ArrowRightOutlined,
} from '@ant-design/icons';
import DialogStartQuiz from '../_components/dialog-start-quiz';
import { useQuizStore } from '../../../../store/quiz-store';
import { useAuthStore } from '../../../../store/auth-store';
import type { Category } from '../../../../types/quiz';
import { categories } from '../../../../libs/quizList';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

export default function DashboardHome() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const fetchQuiz = useQuizStore((state) => state.fetchQuiz);
  const screens = useBreakpoint();
  const isMobile = !screens.md;

  const [open, setOpen] = useState(false);
  const [quizData, setQuizData] = useState<Category>();
  const [isLoading, setIsLoading] = useState(false);

  const handleStartQuiz = async (opts: {
    type: 'multiple' | 'boolean';
    difficulty: 'easy' | 'medium' | 'hard';
    durationMinutes: number;
  }) => {
    if (!quizData) return;
    setIsLoading(true);
    try {
      await fetchQuiz({
        amount: 10,
        category: quizData.id,
        difficulty: opts.difficulty,
        type: opts.type,
        durationMinutes: opts.durationMinutes,
      });
      setOpen(false);
      navigate('/dashboard/quizz/active');
    } catch (error) {
      console.error('Gagal memulai quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 24 }}>
        <Title level={2} style={{ marginBottom: 4 }}>
          Welcome back, {user?.name || 'Alex'}!
        </Title>
        <Text type="secondary">Ready to test your knowledge today?</Text>
      </div>

      <Card
        style={{
          borderRadius: 16,
          overflow: 'hidden',
          marginBottom: 32,
          border: '1px solid #e2e8f0',
        }}
        styles={{ body: { padding: 0 } }}
      >
        <Flex
          vertical={isMobile} // ← stack vertikal di mobile
          gap={0}
        >
          <img
            src="/book-cover.jpg"
            alt="book-cover"
            style={{
              width: isMobile ? '100%' : 200,
              height: isMobile ? 180 : 'auto',
              objectFit: 'cover',
              flexShrink: 0,
            }}
          />

          <div style={{ padding: 20 }}>
            <Tag
              color="blue"
              style={{
                fontWeight: 600,
                textTransform: 'uppercase',
                fontSize: 11,
                marginBottom: 12,
                letterSpacing: 1,
              }}
            >
              Recommended
            </Tag>

            <Title level={4} style={{ marginBottom: 8 }}>
              Quick Start Quiz
            </Title>
            <Paragraph type="secondary" style={{ marginBottom: 16 }}>
              Jump into a random 10-question quiz to test your general
              knowledge.
            </Paragraph>

            <Flex vertical>
              <Space size={24} style={{ marginBottom: 20 }}>
                <Space>
                  <ClockCircleOutlined style={{ color: '#94a3b8' }} />
                  <Text type="secondary">5 mins</Text>
                </Space>
                <Space>
                  <TrophyOutlined style={{ color: '#94a3b8' }} />
                  <Text type="secondary">100 XP</Text>
                </Space>
              </Space>

              <Button
                type="primary"
                size="large"
                block={isMobile}
                style={{
                  background: '#2563eb',
                  fontWeight: 600,
                  width: isMobile ? '100%' : 'fit-content',
                }}
              >
                Start Now
              </Button>
            </Flex>
          </div>
        </Flex>
      </Card>

      <Flex align="center" justify="space-between" style={{ marginBottom: 16 }}>
        <Title level={4} style={{ margin: 0 }}>
          Featured Categories
        </Title>
        <Button
          type="link"
          onClick={() => navigate('/dashboard/quizz')}
          style={{ color: '#2563eb' }}
        >
          See All <ArrowRightOutlined />
        </Button>
      </Flex>

      <Row gutter={[16, 16]}>
        {categories.slice(0, 3).map((category) => {
          const Icon = category.icon;
          return (
            <Col key={category.id} xs={24} sm={12} md={8}>
              <Card
                hoverable
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  border: 'none',
                  cursor: 'pointer',
                }}
                styles={{ body: { padding: 0 } }}
                onClick={() => {
                  setOpen(true);
                  setQuizData(category);
                }}
              >
                <div
                  style={{ background: category.bgColor, padding: '28px 24px' }}
                >
                  <div
                    style={{
                      background: 'rgba(255,255,255,0.25)',
                      borderRadius: '50%',
                      width: 44,
                      height: 44,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 12,
                    }}
                  >
                    <Icon style={{ fontSize: 22, color: '#fff' }} />
                  </div>
                  <Title level={5} style={{ color: '#fff', margin: 0 }}>
                    {category.title}
                  </Title>
                  <Text
                    style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13 }}
                  >
                    {category.questionsCount} Available Quizzes
                  </Text>
                </div>
              </Card>
            </Col>
          );
        })}
      </Row>

      <DialogStartQuiz
        open={open}
        setOpen={setOpen}
        quizData={quizData}
        onStartQuiz={handleStartQuiz}
        isLoading={isLoading}
      />
    </div>
  );
}
