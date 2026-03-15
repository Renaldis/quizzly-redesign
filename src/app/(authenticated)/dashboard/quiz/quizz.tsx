import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Row, Col, Card, Typography, Flex, Tag, Grid } from 'antd';
import DialogStartQuiz from '../_components/dialog-start-quiz';
import { useQuizStore } from '../../../../../store/quiz-store';
import type { Category } from '../../../../types/quiz';
import { categories } from '../../../../libs/quizList';

const { Title, Paragraph, Text } = Typography;
const { useBreakpoint } = Grid;

export default function QuizList() {
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
    <div style={{ padding: isMobile ? 8 : 12 }}>
      <div style={{ marginBottom: 28 }}>
        <Title level={isMobile ? 3 : 2} style={{ marginBottom: 4 }}>
          Explore All Categories
        </Title>
        <Text type="secondary">
          Choose a topic to test your knowledge and climb the leaderboard.
        </Text>
      </div>

      <Row gutter={[isMobile ? 12 : 20, isMobile ? 12 : 20]}>
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                style={{
                  borderRadius: 20,
                  overflow: 'hidden',
                  border: '1px solid #e2e8f0',
                  cursor: 'pointer',
                  height: '100%',
                }}
                styles={{ body: { padding: 0, height: '100%' } }}
                onClick={() => {
                  setOpen(true);
                  setQuizData(category);
                }}
              >
                <div
                  style={{
                    background: category.bgColor,
                    padding: '20px 20px 16px',
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      borderRadius: 12,
                      width: 48,
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                    }}
                  >
                    <Icon style={{ fontSize: 22, color: '#374151' }} />
                  </div>
                </div>

                <div style={{ padding: '16px 20px 20px' }}>
                  <Title level={5} style={{ marginBottom: 6 }}>
                    {category.title}
                  </Title>
                  <Paragraph
                    type="secondary"
                    style={{ fontSize: 13, marginBottom: 16 }}
                    ellipsis={{ rows: 2 }}
                  >
                    {category.description}
                  </Paragraph>

                  <Flex justify="space-between" align="center">
                    <Tag
                      bordered={false}
                      style={{
                        background: category.tint,
                        color: '#374151',
                        fontSize: 12,
                      }}
                    >
                      {category.questionsCount} Questions
                    </Tag>
                    <Text type="secondary" style={{ fontSize: 12 }}>
                      {category.playsCount} Plays
                    </Text>
                  </Flex>
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
