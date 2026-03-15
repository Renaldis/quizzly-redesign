import { Layout, Row, Col, Typography, Space } from 'antd';

const { Footer } = Layout;
const { Text, Link } = Typography;

export default function HomeFooter() {
  return (
    <Footer
      style={{
        background: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        padding: '40px 24px',
      }}
    >
      <Row
        justify="space-between"
        align="middle"
        gutter={[16, 16]}
        style={{ maxWidth: 1200, margin: '0 auto' }}
      >
        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Text strong style={{ fontSize: 20, color: '#111' }}>
            Quizz<span style={{ color: '#1677ff' }}>ly</span>
          </Text>
        </Col>

        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Space size="large">
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Terms of Service</Link>
            <Link href="#">Contact Us</Link>
          </Space>
        </Col>

        <Col xs={24} md={8} style={{ textAlign: 'center' }}>
          <Text type="secondary">
            © 2026 Quizzly by renaldis. All rights reserved.
          </Text>
        </Col>
      </Row>
    </Footer>
  );
}
