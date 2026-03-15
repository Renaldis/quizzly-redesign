import { Card, Col, Flex, Row, Typography } from 'antd';
import { Award, History, Zap, type LucideIcon } from 'lucide-react';

const { Title, Text } = Typography;

type TypeCard = {
  Icon: LucideIcon;
  label: string;
  description: string;
};

const cardData: TypeCard[] = [
  {
    Icon: Zap,
    label: 'Vibrant UI',
    description:
      'A clean minimalist design with ultra-smooth transitions designed for focus.',
  },
  {
    Icon: History,
    label: 'Session History',
    description:
      'Keep track of every quiz attempt, detailed analytics, and your learning progress.',
  },
  {
    Icon: Award,
    label: 'Leaderboard History',
    description:
      'Challenge your friends and climb the leaderboard against players worldwide.',
  },
];

const LandingPageCard = () => {
  return (
    <Flex vertical style={{ marginTop: '15px' }}>
      <Flex vertical align="center" gap={0} style={{ padding: 0, margin: 0 }}>
        <Title level={2} style={{ margin: 0, padding: 0 }}>
          Why Quizzly?
        </Title>
        <div
          style={{
            width: '8%',
            borderRadius: 9999,
            alignSelf: 'center',
            marginTop: 8,
            background: 'linear-gradient(90deg, #93c5fd, #2563eb)',
            height: 8,
          }}
        />
      </Flex>
      <Row
        gutter={20}
        style={{ marginTop: 20, maxWidth: '90%', margin: '20px auto 0' }}
      >
        {cardData?.map((el, idx) => (
          <Col span={8}>
            <Card key={idx}>
              <Flex vertical>
                <div style={{ padding: '10px 0px' }}>
                  <el.Icon
                    color="#2B7FFF"
                    style={{
                      backgroundColor: '#DBEAFE',
                      padding: 8,
                      borderRadius: 8,
                    }}
                    size={40}
                  />
                </div>
                <Title level={5}>{el.label}</Title>
                <Text type="secondary">{el.description}</Text>
              </Flex>
            </Card>
          </Col>
        ))}
      </Row>
    </Flex>
  );
};

export default LandingPageCard;
