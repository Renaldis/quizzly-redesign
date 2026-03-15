import { FileQuestion, Home, MoveLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Typography } from 'antd';

const { Title, Text } = Typography;

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Flex
      vertical
      align="center"
      justify="center"
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f6f7f8',
        padding: 16,
      }}
    >
      <div style={{ position: 'relative', marginBottom: 24 }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: '#3b82f6',
            filter: 'blur(32px)',
            opacity: 0.2,
            borderRadius: '50%',
          }}
        />
        <div
          style={{
            position: 'relative',
            backgroundColor: '#fff',
            padding: 24,
            borderRadius: 24,
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            border: '1px solid #f1f5f9',
            display: 'inline-flex',
          }}
        >
          <FileQuestion size={80} color="#2563eb" />
        </div>
      </div>

      <Flex
        vertical
        align="center"
        gap={8}
        style={{ maxWidth: 480, textAlign: 'center' }}
      >
        <span
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#0f172a',
            lineHeight: 1,
            letterSpacing: -4,
          }}
        >
          404
        </span>
        <Title level={3} style={{ margin: 0, color: '#1e293b' }}>
          Oops! Question Not Found
        </Title>
        <Text style={{ color: '#64748b', lineHeight: 1.7, fontSize: 15 }}>
          It seems you've wandered off the syllabus. The page you are looking
          for doesn't exist or might have been moved.
        </Text>
      </Flex>

      <Flex
        gap={12}
        wrap="wrap"
        justify="center"
        style={{ marginTop: 32, width: '100%' }}
      >
        <Button
          size="large"
          icon={<MoveLeft size={18} />}
          onClick={() => navigate(-1)}
          style={{
            borderColor: '#cbd5e1',
            color: '#334155',
          }}
        >
          Go Back
        </Button>

        <Button
          size="large"
          type="primary"
          icon={<Home size={18} />}
          onClick={() => navigate('/')}
          style={{
            backgroundColor: '#2563eb',
            border: 'none',
            boxShadow: '0 8px 20px rgba(37,99,235,0.3)',
          }}
        >
          Back to Home
        </Button>
      </Flex>
    </Flex>
  );
}
