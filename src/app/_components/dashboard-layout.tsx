import { Outlet, useLocation, useNavigate } from 'react-router';
import {
  Button,
  Drawer,
  Flex,
  Layout,
  Menu,
  Modal,
  Typography,
  Breadcrumb,
  Grid,
} from 'antd';
import { useState } from 'react';
import { Gamepad2, History, LayoutDashboard, Sparkles } from 'lucide-react';
import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { QuizResumeDialog } from './quiz-resume-dialog';
import { UserAvatar } from 'admiral';
import { useAuthStore } from '../../../store/auth-store';

const { Header, Sider, Content } = Layout;
const { Text } = Typography;
const { useBreakpoint } = Grid;

const navItems = [
  { key: '/dashboard', icon: <LayoutDashboard />, label: 'Dashboard' },
  { key: '/dashboard/quizz', icon: <Gamepad2 />, label: 'Quiz & Categories' },
  { key: '/dashboard/history', icon: <History />, label: 'History' },
];

const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  quizz: 'Quiz & Categories',
  history: 'History',
};

const generateBreadcrumbs = (pathname: string) => {
  const segments = pathname.split('/').filter((x) => x);
  return segments.map((segment, index) => ({
    label: labelMap[segment] ?? segment,
    path: '/' + segments.slice(0, index + 1).join('/'),
  }));
};

// Konten sidebar dipisah agar bisa dipakai di Sider dan Drawer
const SidebarContent = ({
  collapsed,
  onNavigate,
  onLogout,
  selectedKey,
}: {
  collapsed: boolean;
  onNavigate: (key: string) => void;
  onLogout: () => void;
  selectedKey: string;
}) => (
  <Flex
    vertical
    justify="space-between"
    style={{ height: '100%', paddingBottom: 16 }}
  >
    <div>
      <Flex
        style={collapsed ? { padding: '20px 0' } : { padding: 18 }}
        gap={12}
      >
        <div
          style={{
            backgroundColor: '#165DFC',
            padding: 8,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            ...(collapsed && { width: '50%', margin: '0px auto' }),
          }}
        >
          <Sparkles color="white" size={18} />
        </div>
        {!collapsed && (
          <Flex vertical>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                lineHeight: 1.2,
                color: 'white',
              }}
            >
              Quizzly
            </Text>
            <Text style={{ fontSize: 14, lineHeight: 1.2, color: 'white' }}>
              Pro Platform
            </Text>
          </Flex>
        )}
      </Flex>

      {!collapsed && (
        <Text
          style={{
            fontSize: 14,
            lineHeight: 1.2,
            color: 'white',
            marginLeft: 20,
          }}
        >
          Platform
        </Text>
      )}

      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[selectedKey]}
        items={navItems}
        style={{ padding: collapsed ? '5px' : '0px 10px' }}
        onClick={({ key }) => onNavigate(key)}
      />
    </div>

    <div style={{ padding: '0px 12px' }}>
      <Button
        type="text"
        icon={<LogoutOutlined />}
        onClick={onLogout}
        style={{ backgroundColor: 'red', color: 'white', width: '100%' }}
      >
        {!collapsed && 'Logout'}
      </Button>
    </div>
  </Flex>
);

const DashboardLayout = () => {
  const { user, logout } = useAuthStore();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const isMobile = !screens.md; // breakpoint md = 768px
  const isPageActiveQuiz = location.pathname.includes('/active');
  const breadcrumbs = generateBreadcrumbs(location.pathname);

  const handleNavigate = (key: string) => {
    navigate(key);
    if (isMobile) setDrawerOpen(false); // tutup drawer setelah navigasi di mobile
  };

  const handleLogout = () => setLogoutModalOpen(true);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {!isPageActiveQuiz && <QuizResumeDialog />}

      <Modal
        title="Confirm Logout"
        open={logoutModalOpen}
        centered
        onCancel={() => setLogoutModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setLogoutModalOpen(false)}>
            Cancel
          </Button>,
          <Button
            key="logout"
            type="primary"
            danger
            onClick={() => {
              logout();
              setLogoutModalOpen(false);
              navigate('/');
            }}
          >
            Logout
          </Button>,
        ]}
      >
        <Text>Are you sure you want to logout?</Text>
      </Modal>

      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          width={270}
          collapsedWidth={75}
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <SidebarContent
            collapsed={collapsed}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            selectedKey={location.pathname}
          />
        </Sider>
      )}

      {isMobile && (
        <Drawer
          open={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          placement="left"
          width={270}
          styles={{
            body: { padding: 0, backgroundColor: '#001529' },
            header: { display: 'none' },
          }}
        >
          <SidebarContent
            collapsed={false}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            selectedKey={location.pathname}
          />
        </Drawer>
      )}

      <Layout>
        <Header
          style={{
            padding: 0,
            margin: 0,
            backgroundColor: '#fff',
            height: 48,
            lineHeight: '48px',
          }}
        >
          <Flex justify="space-between" align="center">
            <Flex align="center">
              <Button
                type="text"
                icon={
                  isMobile ? (
                    <MenuUnfoldOutlined />
                  ) : collapsed ? (
                    <MenuUnfoldOutlined />
                  ) : (
                    <MenuFoldOutlined />
                  )
                }
                onClick={() =>
                  isMobile ? setDrawerOpen(true) : setCollapsed(!collapsed)
                }
                style={{ fontSize: 12, width: 48, height: 48 }}
              />
              <div
                style={{
                  borderRight: '2px solid #e2e8f0',
                  alignSelf: 'stretch',
                  margin: '10px 10px 10px 0px',
                }}
              />
              <Breadcrumb
                style={{ marginBottom: 0, fontSize: 14 }}
                items={breadcrumbs.map(({ label, path }, index) => ({
                  title:
                    index === breadcrumbs.length - 1 ? (
                      label
                    ) : (
                      <span
                        style={{ cursor: 'pointer', color: '#165DFC' }}
                        onClick={() => navigate(path)}
                      >
                        {label}
                      </span>
                    ),
                }))}
              />
            </Flex>

            <div style={{ marginRight: 20 }}>
              <UserAvatar
                info={{
                  fullname: user?.name ?? 'User',
                  roles: [{ name: 'Admin' }],
                  src: 'https://cdn-icons-png.flaticon.com/512/149/149071.png',
                }}
              />
            </div>
          </Flex>
        </Header>

        <Content style={{ padding: 16 }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
