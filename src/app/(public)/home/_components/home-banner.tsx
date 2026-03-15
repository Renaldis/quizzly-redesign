import { Card, Typography, Space } from 'antd';
import { Rocket } from 'lucide-react';
import HomeLogin from './home-login';

const { Title, Paragraph } = Typography;

const HomeBanner = () => {
  return (
    <Card
      bordered={false}
      style={{
        background: 'linear-gradient(330deg, #3b82f6, #1d4ed8)',
        textAlign: 'center',
        padding: '10px 10px',
        borderRadius: 16,
      }}
    >
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <div
          style={{
            margin: '0 auto',
            background: 'linear-gradient(90deg, #93c5fd, #3b82f6)',
            padding: 16,
            borderRadius: 16,
            width: 64,
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Rocket size={32} color="#fff" />
        </div>

        <Title level={1} style={{ color: '#fff', marginBottom: 0 }}>
          Test Your <br /> Knowledge!
        </Title>

        <Paragraph style={{ color: '#fff', opacity: 0.9 }}>
          Challenge your mind with the world's most advanced quiz platform.
          <br />
          Track progress, earn badges, and dominate the global leaderboards.
        </Paragraph>

        <Card
          title="Get Started Now!"
          style={{
            maxWidth: 750,
            margin: '0 auto',
            textAlign: 'left',
            boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
          }}
        >
          <HomeLogin />
        </Card>
      </Space>
    </Card>
  );
};

export default HomeBanner;
