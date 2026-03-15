import { Flex, Layout, Typography } from 'antd';
import { GraduationCap } from 'lucide-react';
const { Header } = Layout;
const { Text } = Typography;

const Navbar = () => {
  return (
    <Header
      style={{
        background: '#fff',
        padding: '10px 40px',
        margin: 0,
        height: '50px',
        boxShadow: '0 1px 1px rgba(0,0,0,0.2)',
        zIndex: 10,
      }}
    >
      <Flex
        align="center"
        style={{
          padding: 0,
          margin: 0,
          display: 'flex',
          alignItems: 'center',
          height: '100%',
        }}
        gap={10}
      >
        <GraduationCap color="blue" />
        <Text strong style={{ fontSize: 18, color: '#111' }}>
          Quizz<span style={{ color: '#2563eb' }}>ly</span>
        </Text>
      </Flex>
    </Header>
  );
};

export default Navbar;
