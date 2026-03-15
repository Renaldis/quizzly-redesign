import { useNavigate } from 'react-router-dom';
import {
  Typography,
  Form,
  Input,
  Button,
  Row,
  Col,
  Space,
  Card,
  Layout,
} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import { User, Lock } from 'lucide-react';
import { useAuthStore } from '../../../../../store/auth-store';
import { ACCOUNT } from '../../../../libs/account';
import type { TLoginPayload } from '../../../../api/auth/type';

const JWT_TOKEN = import.meta.env.VITE_JWT_TOKEN;
const { Text } = Typography;

export default function HomeLogin() {
  const [form] = Form.useForm<TLoginPayload>();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (values: TLoginPayload) => {
    login(
      {
        id: '1',
        name: values.username,
      },
      JWT_TOKEN,
    );

    navigate('/dashboard');
  };

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Layout style={{ background: '#fff' }}>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Row gutter={10} align="middle">
            <Col xs={24} sm={10}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: 'Please input your Username!' },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        ACCOUNT.username.toLowerCase() === value.toLowerCase()
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Username is not valid'));
                    },
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter your username"
                  prefix={<User size={16} />}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={10}>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: 'Please input your Password!' },
                  {
                    validator: (_, value) => {
                      if (
                        !value ||
                        ACCOUNT.password.toLowerCase() === value.toLowerCase()
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Password is not valid'));
                    },
                  },
                ]}
              >
                <Input.Password
                  size="large"
                  placeholder="Enter your password"
                  prefix={<Lock size={16} />}
                  iconRender={(visible) =>
                    visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                  }
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={4}>
              <Form.Item>
                <Button
                  type="primary"
                  size="middle"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  Login Now
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Card
          size="small"
          style={{ background: '#f6f8fa', border: '1px dashed #d9d9d9' }}
        >
          <Text type="secondary" style={{ fontSize: 12 }}>
            🧪 <b>Test credentials:</b>
            <br />
            Username: <b>renaldis</b>
            <br />
            Password: <b>12345678</b>
          </Text>
        </Card>
      </Layout>
    </Space>
  );
}
